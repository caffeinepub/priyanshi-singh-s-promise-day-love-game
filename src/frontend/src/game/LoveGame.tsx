import { useLoveGameState } from './useLoveGameState';
import { StartLevel } from './levels/StartLevel';
import { CatchHeartLevel } from './levels/CatchHeartLevel';
import { PromiseRevealLevel } from './levels/PromiseRevealLevel';
import { BonusSurpriseLevel } from './levels/BonusSurpriseLevel';
import { VictoryLevel } from './levels/VictoryLevel';
import { LevelTransition } from './components/LevelTransition';

export function LoveGame() {
  const {
    gameState,
    advanceToLevel,
    incrementScore,
    unlockCard,
    toggleMusic,
    toggleFeedback,
    resetPersonalization,
    markGameCompleted,
    resetGame,
    progressLoading,
  } = useLoveGameState();

  return (
    <div className="relative min-h-screen w-full">
      <LevelTransition level={gameState.currentLevel}>
        {gameState.currentLevel === 'start' && (
          <StartLevel
            onStart={() => advanceToLevel('catch')}
            onResetPersonalization={resetPersonalization}
            isLoading={progressLoading}
          />
        )}
        {gameState.currentLevel === 'catch' && (
          <CatchHeartLevel
            score={gameState.score}
            onCatch={incrementScore}
            onComplete={() => advanceToLevel('promises')}
            feedbackEnabled={gameState.feedbackEnabled}
          />
        )}
        {gameState.currentLevel === 'promises' && (
          <PromiseRevealLevel
            unlockedCards={gameState.unlockedCards}
            isMusicPlaying={gameState.isMusicPlaying}
            onUnlockCard={unlockCard}
            onToggleMusic={toggleMusic}
            onComplete={() => advanceToLevel('bonus')}
            feedbackEnabled={gameState.feedbackEnabled}
          />
        )}
        {gameState.currentLevel === 'bonus' && (
          <BonusSurpriseLevel
            onContinue={() => {
              markGameCompleted();
              advanceToLevel('victory');
            }}
            personalization={gameState.personalization}
            feedbackEnabled={gameState.feedbackEnabled}
          />
        )}
        {gameState.currentLevel === 'victory' && (
          <VictoryLevel
            onPlayAgain={resetGame}
            personalization={gameState.personalization}
          />
        )}
      </LevelTransition>
    </div>
  );
}
