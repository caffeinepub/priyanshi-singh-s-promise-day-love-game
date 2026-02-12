import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DEFAULT_NAME } from '../types';
import { useFeedback } from '../hooks/useFeedback';

interface BonusSurpriseLevelProps {
  onContinue: () => void;
  personalization: { name: string; dedication: string };
  feedbackEnabled: boolean;
}

export function BonusSurpriseLevel({
  onContinue,
  feedbackEnabled,
}: BonusSurpriseLevelProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState(0);
  const { playSuccess, vibrate } = useFeedback(feedbackEnabled);

  const compliments = [
    `${DEFAULT_NAME}, you light up my world ✨`,
    `Every moment with you is magical 🌟`,
    `You make my heart skip a beat 💓`,
    `Forever grateful for you 🙏`,
  ];

  useEffect(() => {
    if (isEnvelopeOpen && currentCompliment < compliments.length - 1) {
      const timer = setTimeout(() => {
        setCurrentCompliment((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen, currentCompliment, compliments.length]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    playSuccess();
    vibrate();
  };

  return (
    <div className="game-level bonus-level">
      <img
        src="/assets/generated/romantic-couple-illustration.dim_1200x1200.png"
        alt="Romantic couple"
        className="bonus-background-image"
      />
      <div className="level-content">
        <h2 className="text-3xl md:text-4xl font-bold text-white glow-text mb-8">
          A Special Surprise for You 🎁
        </h2>

        <div className={`envelope-container ${isEnvelopeOpen ? 'opened' : ''}`}>
          {!isEnvelopeOpen ? (
            <button
              onClick={handleOpenEnvelope}
              className="envelope"
              aria-label="Open the envelope"
            >
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <span className="envelope-text">Tap to Open 💌</span>
              </div>
            </button>
          ) : (
            <div className="letter-reveal">
              <div className="letter-content">
                <div className="sparkles">✨ ✨ ✨</div>
                <p className="compliment-text">{compliments[currentCompliment]}</p>
                <div className="sparkles">✨ ✨ ✨</div>
              </div>
            </div>
          )}
        </div>

        {isEnvelopeOpen && currentCompliment === compliments.length - 1 && (
          <div className="continue-section">
            <Button onClick={onContinue} size="lg" className="continue-button">
              Open the Final Surprise 🎉
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
