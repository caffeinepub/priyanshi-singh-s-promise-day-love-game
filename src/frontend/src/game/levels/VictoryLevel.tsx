import { Button } from '@/components/ui/button';
import { ConfettiHearts } from '../components/ConfettiHearts';
import { KeepsakeCard } from '../components/KeepsakeCard';
import { DEFAULT_NAME } from '../types';

interface VictoryLevelProps {
  onPlayAgain: () => void;
  personalization: { name: string; dedication: string };
}

export function VictoryLevel({ onPlayAgain, personalization }: VictoryLevelProps) {
  return (
    <div className="game-level victory-level">
      <ConfettiHearts />
      <div className="fireworks-container">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>
      <div className="level-content">
        <h1 className="victory-title glow-text">
          Congratulations {DEFAULT_NAME},
          <br />
          You Won My Heart Forever ❤️
        </h1>

        <KeepsakeCard personalization={personalization} />

        <Button onClick={onPlayAgain} size="lg" className="play-again-button">
          Play Again 💌
        </Button>
      </div>
    </div>
  );
}
