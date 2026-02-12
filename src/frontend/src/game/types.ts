export type GameLevel = 'start' | 'catch' | 'promises' | 'bonus' | 'victory';

export interface GameState {
  currentLevel: GameLevel;
  score: number;
  unlockedCards: boolean[];
  isMusicPlaying: boolean;
  personalization: {
    name: string;
    dedication: string;
  };
  feedbackEnabled: boolean;
}

export const PROMISES = [
  'I promise to always make you smile ❤️',
  'I promise to annoy you forever 😌',
  'I promise to support your dreams 💕',
  'I promise to handle your mood swings like a pro 😂',
  'I promise to choose you every single day 💖',
  'I promise forever with you ❤️',
];

export const MAX_SCORE = 5;
export const TOTAL_CARDS = 6;
export const DEFAULT_NAME = 'Priyanshi';
