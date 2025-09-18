'use client';

import { Heart } from "lucide-react";

interface Props {
  hearts: Array<{ left: string; top: string; delay: string; size: string }>;
  sparkles: Array<{ left: string; top: string; delay: string }>;
}

export default function AuthBackground({ hearts, sparkles }: Props) {
  return (
    <>
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-white opacity-20 floating-heart"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              fontSize: heart.size,
            }}
          >
            <Heart className="fill-current" />
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
