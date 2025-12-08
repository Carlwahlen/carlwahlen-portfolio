import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cases } from '../data/cases';

interface CarouselCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  url: string;
  isOverview?: boolean;
}

const CaseCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1920);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Check if mobile on mount and resize, and update viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create cards: overview card + all case cards (sorted alphabetically by title)
  const sortedCases = [...cases].sort((a, b) => a.title.localeCompare(b.title));
  const cards: CarouselCard[] = [
    {
      id: 'overview',
      title: 'All Case Studies',
      description: 'Explore all projects and case studies',
      image: '/Payment_app_flow.png',
      category: 'Overview',
      url: '/case',
      isOverview: true,
    },
    ...sortedCases.map(caseItem => ({
      id: caseItem.id,
      title: caseItem.title,
      description: caseItem.teaser || caseItem.description,
      image: caseItem.image || '/Payment_app_flow.png',
      category: caseItem.category,
      url: caseItem.id === 'payment-orchestration' ? '/case/payment-orchestration' :
           caseItem.id === 'style-scandinavia' ? '/case/style-scandinavia' :
           caseItem.id === 'hellman-partners' ? '/case/hellman-partners' :
           caseItem.id === 'portfolio-website' ? '/case/portfolio-website' :
           caseItem.id === 'ai-navigation' ? '/case/ai-navigation' :
           '/contact',
      isOverview: false,
    })),
  ];

  // Update image paths based on case ID
  const getImageForCase = (caseId: string): string => {
    switch (caseId) {
      case 'style-scandinavia':
        return '/Style_Scandinavia_web_mockup.png';
      case 'ai-navigation':
        return '/Ai-navigation-bot.png';
      default:
        return '/Payment_app_flow.png';
    }
  };

  // Update cards with correct images
  const cardsWithImages = cards.map(card => ({
    ...card,
    image: card.isOverview ? card.image : getImageForCase(card.id),
  }));

  const totalCards = cardsWithImages.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isTransitioning) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalCards);
      }, 5000); // Change card every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalCards, isTransitioning]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleCardClick = (url: string, cardIndex: number, e: React.MouseEvent) => {
    // Prevent navigation if clicking on navigation controls
    if ((e.target as HTMLElement).closest('button, svg, path')) {
      return;
    }
    
    // If clicking on a card that's not in the center, move it to center
    if (cardIndex !== currentIndex) {
      goToIndex(cardIndex);
      return;
    }
    
    // Only navigate if clicking on the center card
    navigate(url);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Calculate visible cards (show 3 cards: 1 on left, 1 center, 1 on right)
  const getVisibleCards = () => {
    const visible: Array<{ card: CarouselCard; index: number; position: 'left' | 'center' | 'right'; offset: number }> = [];
    
    // Show 3 cards total: -1 to +1 to show all three cards fully
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      const position = i === 0 ? 'center' : i < 0 ? 'left' : 'right';
      visible.push({ card: cardsWithImages[index], index, position, offset: i });
    }
    
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      className="relative w-full pt-8 pb-16 overflow-hidden"
      style={{ backgroundColor: 'rgba(248, 248, 248, 0.95)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background pattern comes from parent Hero section - semi-transparent background allows pattern to show through */}
      <div className="w-full overflow-hidden relative z-10">
        {/* Carousel Container */}
        {/* Calculate card dimensions first to set container height */}
        {(() => {
          // Responsive padding that scales with viewport
          const containerPadding = isMobile 
            ? Math.max(16, viewportWidth * 0.04) 
            : Math.max(40, viewportWidth * 0.05);
          const availableWidth = viewportWidth - (containerPadding * 2);
          
          // Calculate card width to fit 3 cards with consistent spacing
          // Spacing scales proportionally with viewport
          const gapBetweenCards = isMobile 
            ? Math.max(16, viewportWidth * 0.03) 
            : Math.max(32, viewportWidth * 0.04);
          const totalGaps = gapBetweenCards * 2; // gaps between 3 cards
          const baseCardWidth = Math.floor((availableWidth - totalGaps) / 3);
          
          // Card width: use 90% of calculated size to ensure cards are visible and fill space
          // Apply minimum sizes to prevent cards from becoming too small
          const minCardWidth = isMobile ? 260 : 300;
          const maxCardWidth = isMobile ? 340 : 450;
          const calculatedCardWidth = Math.floor(baseCardWidth * 0.9);
          const cardWidth = Math.max(minCardWidth, Math.min(maxCardWidth, calculatedCardWidth));
          
          // Maintain 3:4 aspect ratio (0.75)
          const cardAspectRatio = 0.75;
          const cardHeight = Math.floor(cardWidth / cardAspectRatio);
          
          // Spacing for carousel movement - proportional to card size
          const cardSpacing = cardWidth + gapBetweenCards + (cardWidth * 0.15);
          
          return (
            <div 
              className="relative flex items-center justify-center overflow-hidden" 
              style={{ height: `${cardHeight + 40}px` }}
            >
              {/* Cards Container with perspective for 3D effect */}
              <div 
                className="relative w-full mx-auto h-full flex items-center justify-center"
                style={{ 
                  perspective: '1200px', 
                  maxWidth: '100vw',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                {visibleCards.map(({ card, index, position, offset }) => {
                  const isCenter = position === 'center';
                  const absOffset = Math.abs(offset);
                  
                  // All cards same size
                  // Subtle scale difference for side cards
                  const scale = isCenter 
                    ? 1.0 
                    : 0.95;
                  
                  // Progressive opacity fade
                  const opacity = isCenter 
                    ? 1 
                    : 0.8;
                  
                  // Z-index for proper layering
                  const zIndex = isCenter ? 20 : 15 - absOffset;
                  
                  // Transform with rotation for depth
                  const translateX = offset * cardSpacing;
                  const rotateY = isCenter ? 0 : offset > 0 ? -3 : 3;
                  const translateZ = isCenter ? 0 : -absOffset * 20;

              return (
                <div
                  key={`${card.id}-${index}`}
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    transform: `translate3d(${translateX}px, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    left: '50%',
                    marginLeft: `-${cardWidth / 2}px`,
                    width: `${cardWidth}px`,
                    pointerEvents: 'auto',
                    maxWidth: `${cardWidth}px`,
                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  onClick={(e) => handleCardClick(card.url, index, e)}
                >
                  <div 
                    className={`
                      bg-white rounded-3xl overflow-hidden shadow-xl
                      group hover:shadow-2xl transition-all duration-500
                      ${isCenter ? 'ring-2 ring-gray-200' : ''}
                    `}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                    }}
                  >
                    {/* Image */}
                    <div 
                      className="relative overflow-hidden bg-gray-100"
                      style={{ height: `${Math.floor(cardHeight * 0.6)}px` }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isCenter ? 'group-hover:scale-110' : 'group-hover:scale-105'
                        }`}
                        style={card.id === 'hellman-partners' ? { filter: 'blur(4.8px)' } : {}}
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <div 
                        className="absolute left-4 md:left-5 bg-gray-900/90 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg"
                        style={{ 
                          top: `${Math.max(12, Math.floor(cardHeight * 0.03))}px`,
                          padding: `${Math.max(6, Math.floor(cardHeight * 0.015))}px ${Math.max(12, Math.floor(cardWidth * 0.06))}px`,
                          fontSize: `${Math.max(11, Math.floor(cardWidth * 0.028))}px`
                        }}
                      >
                        {card.category}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div 
                      className="flex flex-col"
                      style={{ 
                        height: `${Math.floor(cardHeight * 0.4)}px`,
                        padding: `${Math.max(16, Math.floor(cardHeight * 0.035))}px ${Math.max(16, Math.floor(cardWidth * 0.05))}px`
                      }}
                    >
                      <h3 
                        className={`font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors ${
                          isCenter ? '' : 'line-clamp-2'
                        }`}
                        style={{ 
                          fontSize: `${Math.max(16, Math.floor(cardWidth * 0.05))}px`,
                          lineHeight: '1.3'
                        }}
                      >
                        {card.title}
                      </h3>
                      <p 
                        className="text-gray-600 leading-relaxed line-clamp-3 flex-grow"
                        style={{ 
                          fontSize: `${Math.max(13, Math.floor(cardWidth * 0.038))}px`,
                          lineHeight: '1.5'
                        }}
                      >
                        {card.description}
                      </p>
                      
                      {/* CTA */}
                      <div 
                        className="mt-3 flex items-center font-semibold text-gray-900 group-hover:text-gray-700 transition-colors"
                        style={{ fontSize: `${Math.max(13, Math.floor(cardWidth * 0.035))}px` }}
                      >
                        <span>{card.isOverview ? 'View all cases' : 'Read case study'}</span>
                        <svg 
                          className="ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ width: `${Math.max(14, Math.floor(cardWidth * 0.035))}px`, height: `${Math.max(14, Math.floor(cardWidth * 0.035))}px` }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
              </div>
            </div>
          );
        })()}
      </div>

      <div className="container-custom">
        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Previous card"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Auto-play button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ${
              isAutoPlaying
                ? 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800'
                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
            }`}
            aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isAutoPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Next card"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {cardsWithImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              disabled={isTransitioning}
              className={`rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'bg-gray-900 w-10 h-2.5'
                  : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseCarousel;
