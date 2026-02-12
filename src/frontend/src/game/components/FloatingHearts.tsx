export function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="floating-hearts-container">
      {hearts.map((i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
