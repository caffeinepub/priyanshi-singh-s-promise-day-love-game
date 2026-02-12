import { useEffect, useState } from 'react';

interface HeartBurstProps {
  x: number;
  y: number;
  onComplete?: () => void;
}

export function HeartBurst({ x, y, onComplete }: HeartBurstProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  const hearts = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      className="heart-burst"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {hearts.map((i) => (
        <div
          key={i}
          className="burst-heart"
          style={{
            '--angle': `${(i * 360) / hearts.length}deg`,
          } as React.CSSProperties}
        >
          💖
        </div>
      ))}
    </div>
  );
}
