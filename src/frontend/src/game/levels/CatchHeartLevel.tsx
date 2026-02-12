import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MAX_SCORE } from '../types';
import { useFeedback } from '../hooks/useFeedback';

interface CatchHeartLevelProps {
  score: number;
  onCatch: () => void;
  onComplete: () => void;
  feedbackEnabled: boolean;
}

export function CatchHeartLevel({ score, onCatch, onComplete, feedbackEnabled }: CatchHeartLevelProps) {
  const [heartPosition, setHeartPosition] = useState({ x: 50, y: 50 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { playSuccess, vibrate } = useFeedback(feedbackEnabled);

  useEffect(() => {
    if (score >= MAX_SCORE) {
      setIsUnlocked(true);
    }
  }, [score]);

  const moveHeart = () => {
    if (score < MAX_SCORE) {
      onCatch();
      playSuccess();
      vibrate();
      // Move heart to random position within safe bounds
      const newX = 10 + Math.random() * 80;
      const newY = 15 + Math.random() * 70;
      setHeartPosition({ x: newX, y: newY });
    }
  };

  return (
    <div className="game-level catch-level">
      <div className="level-content">
        <div className="score-display">
          <h2 className="text-3xl md:text-4xl font-bold text-white glow-text">
            Love Points: {score}/{MAX_SCORE}
          </h2>
        </div>

        {!isUnlocked && (
          <div className="catch-area">
            <button
              onClick={moveHeart}
              className="catch-heart"
              style={{
                left: `${heartPosition.x}%`,
                top: `${heartPosition.y}%`,
              }}
              aria-label="Catch the heart"
            >
              ❤️
            </button>
          </div>
        )}

        {isUnlocked && (
          <div className="unlock-message">
            <p className="text-2xl md:text-3xl font-bold text-white glow-text mb-6">
              You unlocked my promises 💖
            </p>
            <Button onClick={onComplete} size="lg" className="reveal-button">
              Reveal Promises
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
