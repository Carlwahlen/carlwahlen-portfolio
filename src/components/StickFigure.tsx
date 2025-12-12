import React, { useEffect, useRef, useState } from 'react';

const StickFigure: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [waveAngle, setWaveAngle] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'walking' | 'climbing' | 'waving'>('walking');
  const aboutMeRef = useRef<HTMLAnchorElement | null>(null);
  const letsTalkRef = useRef<HTMLAnchorElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate waving arm
  useEffect(() => {
    if (!isWaving) return;

    let waveAnimationId: number;
    const waveStart = Date.now();

    const animateWave = () => {
      const elapsed = Date.now() - waveStart;
      const angle = Math.sin(elapsed / 200) * 30; // Wave between -30 and 30 degrees
      setWaveAngle(angle);
      waveAnimationId = requestAnimationFrame(animateWave);
    };

    waveAnimationId = requestAnimationFrame(animateWave);

    return () => {
      if (waveAnimationId) cancelAnimationFrame(waveAnimationId);
    };
  }, [isWaving]);

  useEffect(() => {
    // Find the buttons
    const aboutMeButton = document.querySelector('a[href="/about"]') as HTMLAnchorElement;
    const letsTalkButton = document.querySelector('a[href="/kontakt"]') as HTMLAnchorElement;

    if (!aboutMeButton || !letsTalkButton) return;

    aboutMeRef.current = aboutMeButton;
    letsTalkRef.current = letsTalkButton;

    let animationId: number;
    let startTime: number | null = null;
    let currentPhase: 'walking' | 'climbing' | 'waving' = 'walking';

    const updatePositions = () => {
      if (!aboutMeRef.current || !letsTalkRef.current || !containerRef.current) return;

      const aboutMeRect = aboutMeRef.current.getBoundingClientRect();
      const letsTalkRect = letsTalkRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Start position: center of About me button
      const startX = aboutMeRect.left + aboutMeRect.width / 2 - containerRect.left - 12;
      const startY = aboutMeRect.top + aboutMeRect.height / 2 - containerRect.top - 12;

      // End position: center of Let's talk button
      const endX = letsTalkRect.left + letsTalkRect.width / 2 - containerRect.left - 12;
      const endY = letsTalkRect.top + letsTalkRect.height / 2 - containerRect.top - 12;

      const duration = 3000; // 3 seconds to walk
      const climbDuration = 1500; // 1.5 seconds to climb
      const waveDuration = 2000; // 2 seconds to wave

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (currentPhase === 'walking') {
          // Walk from About me to above Let's talk
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          setPosition({
            x: startX + (endX - startX) * easeProgress,
            y: startY + (endY - 40) * easeProgress, // Stop 40px above Let's talk
          });

          if (progress >= 1) {
            currentPhase = 'climbing';
            setAnimationPhase('climbing');
            startTime = timestamp;
          }
        } else if (currentPhase === 'climbing') {
          // Climb down to Let's talk button
          const progress = Math.min((elapsed) / climbDuration, 1);
          
          const climbStartY = startY + (endY - 40) - 12;
          setPosition({
            x: endX,
            y: climbStartY + (endY - climbStartY) * progress,
          });

          if (progress >= 1) {
            currentPhase = 'waving';
            setAnimationPhase('waving');
            setIsWaving(true);
            startTime = timestamp;
          }
        } else if (currentPhase === 'waving') {
          // Wave for 2 seconds, then restart
          if (elapsed >= waveDuration) {
            currentPhase = 'walking';
            setAnimationPhase('walking');
            setIsWaving(false);
            startTime = null;
            // Reset to start position
            setPosition({ x: startX, y: startY });
            // Restart animation
            startTime = performance.now();
          }
        }

        animationId = requestAnimationFrame(animate);
      };

      // Initial position
      setPosition({ x: startX, y: startY });
      startTime = performance.now();

      // Start animation
      animationId = requestAnimationFrame(animate);

      return () => {
        if (animationId) cancelAnimationFrame(animationId);
      };
    };

    // Wait for layout
    const timeoutId = setTimeout(updatePositions, 500);
    
    const handleResize = () => {
      if (animationId) cancelAnimationFrame(animationId);
      startTime = null;
      currentPhase = 'walking';
      setAnimationPhase('walking');
      setIsWaving(false);
      setTimeout(updatePositions, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ overflow: 'visible' }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isWaving ? 'scaleX(-1)' : 'none',
          transition: animationPhase === 'waving' ? 'none' : 'left 0.1s linear, top 0.1s linear',
        }}
        className="pointer-events-none"
      >
        {/* Head */}
        <circle
          cx="12"
          cy="4"
          r="3"
          fill="none"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Body */}
        <line
          x1="12"
          y1="7"
          x2="12"
          y2="14"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arms */}
        {isWaving ? (
          <>
            {/* Waving arm */}
            <g transform={`rotate(${waveAngle}, 12, 9)`}>
              <line
                x1="12"
                y1="9"
                x2="8"
                y2="7"
                stroke="#1f2937"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            {/* Other arm */}
            <line
              x1="12"
              y1="9"
              x2="16"
              y2="11"
              stroke="#1f2937"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <line
              x1="12"
              y1="9"
              x2="8"
              y2="11"
              stroke="#1f2937"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="9"
              x2="16"
              y2="11"
              stroke="#1f2937"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
        {/* Legs */}
        <line
          x1="12"
          y1="14"
          x2="9"
          y2="20"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transformOrigin: '12px 14px',
            animation: animationPhase === 'walking' ? 'walkLeft 0.6s ease-in-out infinite' : 'none',
          }}
        />
        <line
          x1="12"
          y1="14"
          x2="15"
          y2="20"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transformOrigin: '12px 14px',
            animation: animationPhase === 'walking' ? 'walkRight 0.6s ease-in-out infinite' : 'none',
          }}
        />
      </svg>
      <style>{`
        @keyframes walkLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes walkRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default StickFigure;

