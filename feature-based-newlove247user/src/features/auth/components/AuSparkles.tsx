'use client';

export default function Sparkles() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute sparkle w-2 h-2 bg-white rounded-full opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  );
}
