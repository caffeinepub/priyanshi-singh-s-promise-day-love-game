export function ConfettiHearts() {
  const confetti = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="confetti-hearts-container">
      {confetti.map((i) => (
        <div
          key={i}
          className="confetti-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            fontSize: `${0.8 + Math.random() * 1}rem`,
          }}
        >
          {['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );
}
