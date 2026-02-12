import { useCallback, useRef } from 'react';

export function useFeedback(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number) => {
      if (!enabled) return;

      try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      } catch (error) {
        // Silently fail if audio is not supported
      }
    },
    [enabled, getAudioContext]
  );

  const playSuccess = useCallback(() => {
    playTone(523.25, 0.1); // C5
    setTimeout(() => playTone(659.25, 0.15), 100); // E5
  }, [playTone]);

  const playUnlock = useCallback(() => {
    playTone(659.25, 0.1); // E5
    setTimeout(() => playTone(783.99, 0.15), 80); // G5
  }, [playTone]);

  const vibrate = useCallback(() => {
    if (!enabled) return;
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [enabled]);

  return {
    playSuccess,
    playUnlock,
    vibrate,
  };
}
