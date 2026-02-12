import { ReactNode } from 'react';
import { GameLevel } from '../types';

interface LevelTransitionProps {
  level: GameLevel;
  children: ReactNode;
}

export function LevelTransition({ level, children }: LevelTransitionProps) {
  return (
    <div key={level} className="level-transition">
      {children}
    </div>
  );
}
