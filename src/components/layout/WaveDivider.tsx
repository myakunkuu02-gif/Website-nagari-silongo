'use client';

interface WaveDividerProps {
  variant?: 'navy-gold' | 'gold-light' | 'light-gold' | 'simple';
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ variant = 'navy-gold', flip = false, className = '' }: WaveDividerProps) {
  const getColors = () => {
    switch (variant) {
      case 'navy-gold':
        return { fill1: 'var(--gold)', fill2: 'var(--navy)', opacity: '0.06' };
      case 'gold-light':
        return { fill1: 'var(--gold)', fill2: 'var(--background)', opacity: '0.08' };
      case 'light-gold':
        return { fill1: 'var(--navy)', fill2: 'var(--background)', opacity: '0.04' };
      case 'simple':
        return { fill1: 'var(--gold)', fill2: 'transparent', opacity: '0.04' };
      default:
        return { fill1: 'var(--gold)', fill2: 'var(--navy)', opacity: '0.06' };
    }
  };

  const colors = getColors();

  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="relative block h-[40px] w-full sm:h-[50px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={colors.fill1}
          opacity={colors.opacity}
        />
        <path
          d="M0,50 C240,20 480,70 720,45 C960,20 1200,60 1440,40 L1440,80 L0,80 Z"
          fill={colors.fill1}
          opacity="0.03"
        />
      </svg>
      {/* Thin gold line on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
    </div>
  );
}