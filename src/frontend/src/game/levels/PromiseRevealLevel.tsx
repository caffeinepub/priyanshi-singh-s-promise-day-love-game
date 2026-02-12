import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { PROMISES } from '../types';
import { HeartBurst } from '../components/HeartBurst';
import { useFeedback } from '../hooks/useFeedback';

interface PromiseRevealLevelProps {
  unlockedCards: boolean[];
  isMusicPlaying: boolean;
  onUnlockCard: (index: number) => void;
  onToggleMusic: () => void;
  onComplete: () => void;
  feedbackEnabled: boolean;
}

export function PromiseRevealLevel({
  unlockedCards,
  isMusicPlaying,
  onUnlockCard,
  onToggleMusic,
  onComplete,
  feedbackEnabled,
}: PromiseRevealLevelProps) {
  const [burstPosition, setBurstPosition] = useState<{ x: number; y: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const allUnlocked = unlockedCards.every((unlocked) => unlocked);
  const { playUnlock, vibrate } = useFeedback(feedbackEnabled);

  useEffect(() => {
    // Create audio element for background music
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/audio/romantic.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isMusicPlaying) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMusicPlaying]);

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    if (!unlockedCards[index]) {
      onUnlockCard(index);
      playUnlock();
      vibrate();
      const rect = event.currentTarget.getBoundingClientRect();
      setBurstPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const handleComplete = () => {
    playUnlock();
    onComplete();
  };

  return (
    <div className="game-level promises-level">
      <div className="level-content">
        <h2 className="text-3xl md:text-4xl font-bold text-white glow-text mb-8">
          My Promises to You 💝
        </h2>

        <div className="promises-grid">
          {PROMISES.map((promise, index) => (
            <div
              key={index}
              className={`promise-card ${unlockedCards[index] ? 'unlocked' : 'locked'}`}
              onClick={(e) => handleCardClick(index, e)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="lock-icon">🔒</div>
                  <p className="text-sm">Click to unlock</p>
                </div>
                <div className="card-back">
                  <p className="promise-text">{promise}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allUnlocked && (
          <div className="completion-section">
            <Button onClick={handleComplete} size="lg" className="complete-button">
              Continue to Surprise 🎁
            </Button>
          </div>
        )}

        <div className="music-controls">
          <Button
            onClick={onToggleMusic}
            variant="outline"
            size="icon"
            className="music-button"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            {isMusicPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {burstPosition && (
        <HeartBurst
          x={burstPosition.x}
          y={burstPosition.y}
          onComplete={() => setBurstPosition(null)}
        />
      )}
    </div>
  );
}
