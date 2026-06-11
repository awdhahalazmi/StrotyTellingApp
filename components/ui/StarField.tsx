'use client';

import { useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

export default function StarField({ starCount = 100, className = '' }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: starCount }, (_, i) => {
      // Deterministic-ish seed using index
      const seed = (i * 9301 + 49297) % 233280;
      const rand = (offset: number) => ((seed + offset * 1337) % 1000) / 1000;
      return {
        x: rand(0) * 100,
        y: rand(1) * 100,
        size: rand(2) * 2 + 0.5,
        delay: rand(3) * 4,
        duration: rand(4) * 3 + 1.5,
      };
    });
    setStars(generated);
  }, [starCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
