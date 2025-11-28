'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'accent';
  size?: 'default' | 'lg';
  onClick?: () => void;
  href?: string; // NEW: navigate to a page
  ripple?: boolean; // NEW: enable ripple press effect
}

export function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  size = 'default',
  onClick,
  href,
  ripple = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const router = useRouter();

  // Pressed state (scale down)
  const [isPressed, setIsPressed] = useState(false);

  // Ripple state
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(
    null
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    positionRef.current = { x: x * 0.15, y: y * 0.15 };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) scale(${isPressed ? 0.95 : 1})`;
      }
    });
  };

  const handleMouseLeave = () => {
    positionRef.current = { x: 0, y: 0 };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
      }
    });
  };

  const handlePressDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);

    if (ripple && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      setRippleStyle({
        top: y,
        left: x,
        width: size,
        height: size,
      });

      setTimeout(() => setRippleStyle(null), 450);
    }
  };

  const handlePressUp = () => setIsPressed(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (href) router.push(href);
  };

  const variants = {
    primary:
      'bg-secondary text-accent hover:bg-background backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-ring/5 text-foreground hover:bg-foreground/10 backdrop-blur-xl border border-foreground/10 hover:border-foreground/20',
    ghost:
      'bg-foreground/1 border-1 border-foreground/5 text-foreground hover:bg-foreground/10 backdrop-blur-sm',
    white: 'bg-foreground text-background hover:bg-accent/80 backdrop-blur-sm',
    accent:
      'bg-accent border-secondary/80 text-background border-2 hover:bg-background/80 hover:text-foreground backdrop-blur-sm',
  };

  const sizes = {
    default: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handlePressDown}
      onMouseUp={handlePressUp}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-3xl font-medium transition-all duration-300 ease-out will-change-transform ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        transform: 'translate3d(0px, 0px, 0)',
        contain: 'layout style paint',
      }}
    >
      {/* Ripple Layer */}
      {ripple && rippleStyle && (
        <span
          className='animate-ripple pointer-events-none absolute z-0 rounded-full bg-white/30'
          style={{
            position: 'absolute',
            transform: 'scale(0)',
            animation: 'ripple 0.45s ease-out',
            ...rippleStyle,
          }}
        />
      )}

      <span className='relative z-10'>{children}</span>

      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
