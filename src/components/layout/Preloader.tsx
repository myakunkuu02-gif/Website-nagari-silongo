'use client';

import { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => setVisible(false), 200);
      }
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a1628',
        transition: 'opacity 0.4s ease-out',
      }}
    >
      {/* Logo */}
      <div
        style={{
          position: 'relative',
          marginBottom: '2rem',
          animation: 'preloader-scale-in 0.5s ease-out',
        }}
      >
        {/* Spinning ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-1rem',
            borderRadius: '50%',
            border: '1px dashed rgba(212, 168, 67, 0.3)',
            animation: 'preloader-spin 3s linear infinite',
          }}
        />
        {/* Pulse ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-0.5rem',
            borderRadius: '50%',
            border: '1px solid rgba(212, 168, 67, 0.2)',
            animation: 'preloader-pulse 2s ease-in-out infinite',
          }}
        />
        {/* Logo box */}
        <div
          style={{
            width: '5rem',
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #d4a843, #e8c96a)',
            boxShadow: '0 10px 30px rgba(212, 168, 67, 0.3)',
            fontSize: '1.875rem',
            fontWeight: 900,
            color: '#0a1628',
            lineHeight: 1,
          }}
        >
          NS
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          animation: 'preloader-fade-up 0.5s ease-out 0.2s both',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: '#d4a843',
            margin: 0,
          }}
        >
          NAGARI SILONGO
        </h2>
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          Kecamatan Lubuk Tarok &bull; Kabupaten Sijunjung
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: '2.5rem',
          width: '16rem',
          animation: 'preloader-fade-up 0.4s ease-out 0.4s both',
        }}
      >
        <div
          style={{
            height: '2px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #d4a843, #e8c96a, #d4a843)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.3)' }}>
            Memuat...
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(212, 168, 67, 0.6)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes preloader-scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes preloader-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        @keyframes preloader-fade-up {
          from { transform: translateY(1.25rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}