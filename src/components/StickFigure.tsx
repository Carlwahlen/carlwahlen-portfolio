import React, { useEffect, useRef, useState } from 'react';

const StickFigure: React.FC = () => {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isWaving, setIsWaving] = useState(false);
  const [waveAngle, setWaveAngle] = useState(0);
  const [walkCycle, setWalkCycle] = useState(0);
  const [facingDirection, setFacingDirection] = useState<'right' | 'left' | 'down'>('right');
  const [animationPhase, setAnimationPhase] = useState<'walking' | 'climbing' | 'waving'>('walking');
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const GRID_SIZE = 80; // Match the grid pattern size

  // Animate waving arm
  useEffect(() => {
    if (!isWaving) return;

    let waveAnimationId: number;
    const waveStart = Date.now();

    const animateWave = () => {
      const elapsed = Date.now() - waveStart;
      const angle = Math.sin(elapsed / 200) * 35; // Wave between -35 and 35 degrees
      setWaveAngle(angle);
      waveAnimationId = requestAnimationFrame(animateWave);
    };

    waveAnimationId = requestAnimationFrame(animateWave);

    return () => {
      if (waveAnimationId) cancelAnimationFrame(waveAnimationId);
    };
  }, [isWaving]);

  // Animate walking cycle
  useEffect(() => {
    if (animationPhase !== 'walking' && animationPhase !== 'climbing') return;

    let walkAnimationId: number;
    const walkStart = Date.now();

    const animateWalk = () => {
      const elapsed = Date.now() - walkStart;
      const cycle = (elapsed / 300) % 1; // 300ms per step
      setWalkCycle(cycle);
      walkAnimationId = requestAnimationFrame(animateWalk);
    };

    walkAnimationId = requestAnimationFrame(animateWalk);

    return () => {
      if (walkAnimationId) cancelAnimationFrame(walkAnimationId);
    };
  }, [animationPhase]);

  useEffect(() => {
    // Find the buttons inside the page (prefer data attributes to avoid picking header links)
    const aboutMeButton = document.querySelector('[data-stick-target="about"]') as HTMLAnchorElement;
    const letsTalkButton = document.querySelector('[data-stick-target="cta"]') as HTMLAnchorElement;

    if (!aboutMeButton || !letsTalkButton) return;

    let animationId: number;
    let startTime: number | null = null;
    let currentPhase: 'walking' | 'climbing' | 'waving' = 'walking';
    let pathPoints: Array<{ x: number; y: number }> = [];
    let currentPathIndex = 0;

    const snapToGrid = (value: number) => {
      return Math.round(value / GRID_SIZE) * GRID_SIZE;
    };

    const updatePositions = () => {
      if (!aboutMeButton || !letsTalkButton || !containerRef.current) return;

      const aboutMeRect = aboutMeButton.getBoundingClientRect();
      const letsTalkRect = letsTalkButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Start position: center of About me button, snapped to grid
      const startX = aboutMeRect.left + aboutMeRect.width / 2 - containerRect.left;
      const startY = aboutMeRect.top + aboutMeRect.height / 2 - containerRect.top;
      const startXSnapped = snapToGrid(startX);
      const startYSnapped = snapToGrid(startY);

      // End position: center of Let's talk button, snapped to grid
      const endX = letsTalkRect.left + letsTalkRect.width / 2 - containerRect.left;
      const endY = letsTalkRect.top + letsTalkRect.height / 2 - containerRect.top;
      const endXSnapped = snapToGrid(endX);
      const endYSnapped = snapToGrid(endY);

      // Create path following grid lines (L-shaped path)
      pathPoints = [];
      
      // First: walk horizontally to align with endX
      if (Math.abs(startXSnapped - endXSnapped) > GRID_SIZE) {
        const stepsX = Math.abs(startXSnapped - endXSnapped) / GRID_SIZE;
        for (let i = 0; i <= stepsX; i++) {
          const x = startXSnapped + (endXSnapped > startXSnapped ? 1 : -1) * i * GRID_SIZE;
          pathPoints.push({ x, y: startYSnapped });
        }
      } else {
        pathPoints.push({ x: startXSnapped, y: startYSnapped });
      }

      // Then: walk/climb vertically to endY
      if (Math.abs(startYSnapped - endYSnapped) > GRID_SIZE) {
        const stepsY = Math.abs(startYSnapped - endYSnapped) / GRID_SIZE;
        const lastPoint = pathPoints[pathPoints.length - 1];
        for (let i = 1; i <= stepsY; i++) {
          const y = lastPoint.y + (endYSnapped > lastPoint.y ? 1 : -1) * i * GRID_SIZE;
          pathPoints.push({ x: lastPoint.x, y });
        }
      } else {
        const lastPoint = pathPoints[pathPoints.length - 1];
        pathPoints.push({ x: lastPoint.x, y: endYSnapped });
      }

      // Adjust final position to center of button
      pathPoints[pathPoints.length - 1] = { x: endX - 12, y: endY - 12 };

      const segmentDuration = 800; // 800ms per grid segment
      const climbDuration = 1200; // 1.2 seconds to climb down
      const waveDuration = 2500; // 2.5 seconds to wave

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (currentPhase === 'walking') {
          // Walk along grid path
          const totalDuration = pathPoints.length * segmentDuration;
          const progress = Math.min(elapsed / totalDuration, 1);
          
          if (progress >= 1) {
            // Reached end of path, start climbing
            currentPhase = 'climbing';
            setAnimationPhase('climbing');
            setFacingDirection('down');
            startTime = timestamp;
          } else {
            // Calculate which segment we're on
            const segmentProgress = (progress * pathPoints.length) % 1;
            const currentSegment = Math.floor(progress * pathPoints.length);
            
            if (currentSegment < pathPoints.length - 1) {
              const from = pathPoints[currentSegment];
              const to = pathPoints[currentSegment + 1];
              
              // Determine direction
              if (to.x > from.x) setFacingDirection('right');
              else if (to.x < from.x) setFacingDirection('left');
              else if (to.y > from.y) setFacingDirection('down');
              
              // Ease in/out for each segment
              const easeProgress = segmentProgress < 0.5 
                ? 2 * segmentProgress * segmentProgress 
                : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;
              
              setPosition({
                x: from.x - 12 + (to.x - from.x) * easeProgress,
                y: from.y - 12 + (to.y - from.y) * easeProgress,
              });
            } else {
              // Last segment - position at end
              const lastPoint = pathPoints[pathPoints.length - 1];
              setPosition({ x: lastPoint.x, y: lastPoint.y });
            }
          }
        } else if (currentPhase === 'climbing') {
          // Climb down to Let's talk button
          const progress = Math.min(elapsed / climbDuration, 1);
          const easeProgress = progress * progress; // Ease out
          
          const lastPoint = pathPoints[pathPoints.length - 1];
          const climbStartY = lastPoint.y;
          const climbEndY = endY - 12;
          
          setPosition({
            x: lastPoint.x,
            y: climbStartY + (climbEndY - climbStartY) * easeProgress,
          });

          if (progress >= 1) {
            currentPhase = 'waving';
            setAnimationPhase('waving');
            setIsWaving(true);
            startTime = timestamp;
          }
        } else if (currentPhase === 'waving') {
          // Wave for 2.5 seconds, then restart
          if (elapsed >= waveDuration) {
            currentPhase = 'walking';
            setAnimationPhase('walking');
            setIsWaving(false);
            setFacingDirection('right');
            startTime = null;
            currentPathIndex = 0;
            // Reset to start position
            setPosition({ x: startXSnapped - 12, y: startYSnapped - 12 });
            // Restart animation
            startTime = performance.now();
          }
        }

        animationId = requestAnimationFrame(animate);
      };

      // Initial position
      setPosition({ x: startXSnapped - 12, y: startYSnapped - 12 });
      setIsReady(true);
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
      setFacingDirection('right');
      currentPathIndex = 0;
      setTimeout(updatePositions, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // Calculate arm and leg angles based on walk cycle
  const leftArmAngle = facingDirection === 'right' 
    ? Math.sin(walkCycle * Math.PI * 2) * 25 
    : Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 25;
  const rightArmAngle = facingDirection === 'right'
    ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 25
    : Math.sin(walkCycle * Math.PI * 2) * 25;
  const leftLegAngle = facingDirection === 'right'
    ? Math.sin(walkCycle * Math.PI * 2) * 20
    : Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 20;
  const rightLegAngle = facingDirection === 'right'
    ? Math.sin(walkCycle * Math.PI * 2 + Math.PI) * 20
    : Math.sin(walkCycle * Math.PI * 2) * 20;

  // Body bob when walking
  const bodyBob = animationPhase === 'walking' 
    ? Math.abs(Math.sin(walkCycle * Math.PI * 2)) * 1.5 
    : 0;

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
          top: `${position.y - bodyBob}px`,
          transform: facingDirection === 'left' ? 'scaleX(-1)' : 'none',
          transition: animationPhase === 'waving' ? 'none' : 'left 0.05s linear, top 0.05s linear',
          opacity: isReady ? 1 : 0,
        }}
        className="pointer-events-none"
      >
        {/* Head */}
        <circle
          cx="12"
          cy={4 + bodyBob}
          r="3"
          fill="none"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Body */}
        <line
          x1="12"
          y1={7 + bodyBob}
          x2="12"
          y2={14 + bodyBob}
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arms */}
        {isWaving ? (
          <>
            {/* Waving arm */}
            <g transform={`rotate(${waveAngle}, 12, ${9 + bodyBob})`}>
              <line
                x1="12"
                y1={9 + bodyBob}
                x2="8"
                y2={7 + bodyBob}
                stroke="#1f2937"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            {/* Other arm */}
            <line
              x1="12"
              y1={9 + bodyBob}
              x2="16"
              y2={11 + bodyBob}
              stroke="#1f2937"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Left arm */}
            <g transform={`rotate(${leftArmAngle}, 12, ${9 + bodyBob})`}>
              <line
                x1="12"
                y1={9 + bodyBob}
                x2="8"
                y2={11 + bodyBob}
                stroke="#1f2937"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            {/* Right arm */}
            <g transform={`rotate(${rightArmAngle}, 12, ${9 + bodyBob})`}>
              <line
                x1="12"
                y1={9 + bodyBob}
                x2="16"
                y2={11 + bodyBob}
                stroke="#1f2937"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </>
        )}
        {/* Legs */}
        <g transform={`rotate(${leftLegAngle}, 12, ${14 + bodyBob})`}>
          <line
            x1="12"
            y1={14 + bodyBob}
            x2="9"
            y2={20 + bodyBob}
            stroke="#1f2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <g transform={`rotate(${rightLegAngle}, 12, ${14 + bodyBob})`}>
          <line
            x1="12"
            y1={14 + bodyBob}
            x2="15"
            y2={20 + bodyBob}
            stroke="#1f2937"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default StickFigure;
