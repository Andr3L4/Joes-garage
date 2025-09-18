import type React from 'react';

export interface Emoji {
  id: number;
  emoji: string;
  top: number;
  left: number;
  size: number;
  rotation: number;
}

export interface Drink {
  name: string;
  price: string;
  icon: React.FC<{ className?: string }>;
}
