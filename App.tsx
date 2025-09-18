import React, { useState, useEffect, useCallback } from 'react';
import type { Emoji, Drink } from './types';

const MAX_EMOJIS = 500;
const EMOJI_GENERATION_INTERVAL = 50; // ms
const EMOJIS = ['🍌', '🍪', '🐵', '🧱', '🟫', '🟩', '🍁'];

// --- Icon Components ---
const CocktailIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13C15.866 13 19 9.86599 19 6H5C5 9.86599 8.13401 13 12 13Z" />
        <path d="M12 13V22" />
        <path d="M8 22H16" />
        <path d="M16.5 6.5L19 4" />
        <path d="M19 6C19 4.34315 17.6569 3 16 3C14.3431 3 13 4.34315 13 6C13 7.65685 14.3431 9 16 9" />
    </svg>
);

const MartiniIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 22h8" />
        <path d="M12 11v11" />
        <path d="M19 3l-7 8-7-8h14z" />
        <path d="M15 8a3 3 0 10-6 0 3 3 0 006 0z" />
    </svg>
);

const BeerIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3.25a.75.75 0 01.75.75v16a.75.75 0 01-.75.75H7.25a.75.75 0 01-.75-.75V4a.75.75 0 01.75-.75h6.5zM14 6H7.25" />
        <path d="M14 9.5h2.25a.75.75 0 01.75.75v3a.75.75 0 01-.75.75H14" />
    </svg>
);

const WhiskeyIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 5.25h15v13.5H4.5V5.25z" />
        <path d="M4.5 10.5h15" />
        <path d="M10.5 10.5v9" />
    </svg>
);

const PriceIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
);

const MojitoIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3h12v18H6z" />
        <path d="M12 8s-2 1-2 3s2 3 2 3" />
        <path d="M10 5s1-2 3-2" />
        <path d="M16 3l-4 4" />
    </svg>
);

const PinaColadaIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5z" />
        <path d="M12 13v9" />
        <path d="M8 22h8" />
        <path d="M17 8c0-2-1-3-1-3" />
        <path d="M19 5a2.5 2.5 0 00-4 1" />
    </svg>
);

const MargaritaIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11h18" />
        <path d="M12 11v11" />
        <path d="M8 22h8" />
        <path d="M5 11l-2-7h18l-2 7" />
        <path d="M21 4H3" />
    </svg>
);


const drinks: Drink[] = [
    { name: 'Cosmic Martini', price: '$15', icon: MartiniIcon },
    { name: 'Nebula Nectar', price: '$12', icon: CocktailIcon },
    { name: 'Galaxy IPA', price: '$9', icon: BeerIcon },
    { name: 'Black Hole Old Fashioned', price: '$18', icon: WhiskeyIcon },
    { name: 'Classic Mojito', price: '$14', icon: MojitoIcon },
    { name: 'Piña Colada Paradise', price: '$13', icon: PinaColadaIcon },
    { name: 'Electric Margarita', price: '$16', icon: MargaritaIcon },
];

export default function App() {
  const [isSpamming, setIsSpamming] = useState<boolean>(false);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [view, setView] = useState<'main' | 'menu'>('main');

  const handleStartSpam = useCallback(() => {
    setIsSpamming(true);
  }, []);

  const handleStopSpam = useCallback(() => {
    setIsSpamming(false);
    setEmojis([]);
    setView('main');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleStopSpam();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleStopSpam]);

  useEffect(() => {
    if (!isSpamming) {
      return;
    }

    const intervalId = setInterval(() => {
      const newEmoji: Emoji = {
        id: Date.now() + Math.random(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        size: Math.random() * 40 + 20, // size between 20px and 60px
        rotation: Math.random() * 360 - 180, // rotation between -180 and 180 deg
      };

      setEmojis(prevEmojis => [...prevEmojis.slice(-MAX_EMOJIS), newEmoji]);
    }, EMOJI_GENERATION_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isSpamming]);

  return (
    <main className={`bg-gray-900 h-screen w-screen overflow-hidden relative select-none font-sans ${isSpamming ? 'lsd-effect' : ''}`}>
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute"
          style={{
            top: `${e.top}px`,
            left: `${e.left}px`,
            fontSize: `${e.size}px`,
            transform: `translate(-50%, -50%) rotate(${e.rotation}deg)`,
            textShadow: '0 0 8px rgba(0,0,0,0.5)'
          }}
        >
          {e.emoji}
        </span>
      ))}
      
      {!isSpamming && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-opacity duration-500 lsd-effect p-4">
          {view === 'main' && (
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider" style={{textShadow: '0 0 15px rgba(255,255,255,0.3)'}}>
                Joe's Garage
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Click the drink to start. Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Space</kbd> to stop.
              </p>
              <button
                onClick={handleStartSpam}
                className="group p-4 bg-fuchsia-500 rounded-full shadow-lg hover:bg-fuchsia-400 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 transition-all duration-300 transform hover:scale-110"
                aria-label="Start the rave"
              >
                <CocktailIcon className="w-16 h-16 text-white group-hover:text-fuchsia-900 transition-colors duration-300" />
              </button>
              <button 
                onClick={() => setView('menu')} 
                className="mt-8 px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-500 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 flex items-center gap-2 mx-auto"
              >
                <PriceIcon className="w-5 h-5" />
                <span>View Drink Menu</span>
              </button>
            </div>
          )}

          {view === 'menu' && (
            <div className="text-center w-full max-w-md mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{textShadow: '0 0 15px rgba(255,255,255,0.3)'}}>Menu</h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {drinks.map((drink) => (
                  <div key={drink.name} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      <drink.icon className="w-8 h-8 text-fuchsia-400" />
                      <span className="text-lg text-white">{drink.name}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-300">{drink.price}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setView('main')} 
                className="mt-8 px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-500 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400"
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}