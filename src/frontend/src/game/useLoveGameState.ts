import { useState, useCallback, useEffect } from 'react';
import { GameLevel, GameState, MAX_SCORE, TOTAL_CARDS, DEFAULT_NAME } from './types';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveUserProgress, useGetUserProgress } from '../hooks/useUserProgress';

export function useLoveGameState() {
  const { identity } = useInternetIdentity();
  const { data: savedProgress, isLoading: progressLoading } = useGetUserProgress();
  const saveProgress = useSaveUserProgress();

  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 'start',
    score: 0,
    unlockedCards: Array(TOTAL_CARDS).fill(false),
    isMusicPlaying: false,
    personalization: {
      name: DEFAULT_NAME,
      dedication: '',
    },
    feedbackEnabled: true,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from backend when logged in, but always enforce DEFAULT_NAME
  useEffect(() => {
    if (savedProgress && !isHydrated && identity) {
      setGameState((prev) => ({
        ...prev,
        personalization: {
          name: DEFAULT_NAME, // Always use DEFAULT_NAME, ignore saved name
          dedication: savedProgress.dedication || '',
        },
      }));
      setIsHydrated(true);
    }
  }, [savedProgress, isHydrated, identity]);

  const advanceToLevel = useCallback((level: GameLevel) => {
    setGameState((prev) => ({ ...prev, currentLevel: level }));
  }, []);

  const incrementScore = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      score: Math.min(prev.score + 1, MAX_SCORE),
    }));
  }, []);

  const unlockCard = useCallback((index: number) => {
    setGameState((prev) => {
      const newUnlockedCards = [...prev.unlockedCards];
      newUnlockedCards[index] = true;
      return { ...prev, unlockedCards: newUnlockedCards };
    });
  }, []);

  const toggleMusic = useCallback(() => {
    setGameState((prev) => ({ ...prev, isMusicPlaying: !prev.isMusicPlaying }));
  }, []);

  const toggleFeedback = useCallback(() => {
    setGameState((prev) => ({ ...prev, feedbackEnabled: !prev.feedbackEnabled }));
  }, []);

  const setPersonalization = useCallback(
    (name: string, dedication: string) => {
      setGameState((prev) => ({
        ...prev,
        personalization: { name: DEFAULT_NAME, dedication }, // Always use DEFAULT_NAME
      }));

      // Persist to backend if logged in, always with DEFAULT_NAME
      if (identity) {
        saveProgress.mutate({ name: DEFAULT_NAME, dedication, gameCompleted: false });
      }
    },
    [identity, saveProgress]
  );

  const resetPersonalization = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      personalization: { name: DEFAULT_NAME, dedication: '' }, // Reset to DEFAULT_NAME
    }));
  }, []);

  const markGameCompleted = useCallback(() => {
    if (identity) {
      const { dedication } = gameState.personalization;
      // Always save with DEFAULT_NAME
      saveProgress.mutate({ name: DEFAULT_NAME, dedication, gameCompleted: true });
    }
  }, [identity, gameState.personalization, saveProgress]);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      currentLevel: 'start',
      score: 0,
      unlockedCards: Array(TOTAL_CARDS).fill(false),
      isMusicPlaying: false,
      personalization: { name: DEFAULT_NAME, dedication: prev.personalization.dedication }, // Keep dedication, enforce DEFAULT_NAME
      feedbackEnabled: prev.feedbackEnabled,
    }));
  }, []);

  return {
    gameState,
    advanceToLevel,
    incrementScore,
    unlockCard,
    toggleMusic,
    toggleFeedback,
    setPersonalization,
    resetPersonalization,
    markGameCompleted,
    resetGame,
    progressLoading,
  };
}
