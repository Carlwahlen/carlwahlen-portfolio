import React, { useState, useEffect, useRef } from 'react';

// Types
interface CaseFeedbackPromptProps {
  caseId: string;
}

interface FeedbackPayload {
  caseId: string;
  rating: number | null;
  comment: string;
  timeOnPage: number; // seconds
  scrollDepth: number; // 0–1 float
  createdAt: string; // ISO timestamp
}

// LocalStorage keys
const getCaseKey = (caseId: string) => `portfolio_feedback_case_${caseId}`;
const GLOBAL_COOLDOWN_KEY = 'portfolio_feedback_last_shown';
const COOLDOWN_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const MIN_TIME_ON_PAGE = 30 * 1000; // 30 seconds in milliseconds
const MIN_SCROLL_DEPTH = 0.7; // 70%

// Custom hook for feedback prompt logic
function useCaseFeedbackPrompt(caseId: string) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const timeOnPageRef = useRef(0);
  const scrollDepthRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldShowRef = useRef(false);
  const isVisibleRef = useRef(false);

  // Check if localStorage is available
  const isLocalStorageAvailable = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  // Check if popup should be shown based on localStorage flags
  const shouldShowPopup = (): boolean => {
    if (!isLocalStorageAvailable()) return false;

    // Check per-case flag
    const caseKey = getCaseKey(caseId);
    const caseFlag = localStorage.getItem(caseKey);
    if (caseFlag === 'shown' || caseFlag === 'dismissed') {
      return false;
    }

    // Check global cooldown
    const lastShown = localStorage.getItem(GLOBAL_COOLDOWN_KEY);
    if (lastShown) {
      const lastShownTime = parseInt(lastShown, 10);
      const now = Date.now();
      if (now - lastShownTime < COOLDOWN_DURATION) {
        return false;
      }
    }

    return true;
  };

  // Calculate scroll depth (0-1)
  const calculateScrollDepth = (): number => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = documentHeight - viewportHeight;
    
    if (totalScrollable <= 0) return 1; // Already at bottom
    
    const depth = scrollTop / totalScrollable;
    return Math.min(1, Math.max(0, depth)); // Clamp between 0 and 1
  };

  // Check if scroll threshold is met
  const isScrollThresholdMet = (): boolean => {
    const depth = calculateScrollDepth();
    return depth >= MIN_SCROLL_DEPTH || depth >= 1; // 70% or at bottom
  };

  // Update scroll depth on scroll
  const handleScroll = () => {
    const depth = calculateScrollDepth();
    scrollDepthRef.current = depth;
    setScrollDepth(depth);
    
    // Check if we should show the popup
    if (shouldShowRef.current && !isVisibleRef.current && isScrollThresholdMet() && timeOnPageRef.current >= MIN_TIME_ON_PAGE) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  };

  // Set localStorage flags
  const setCaseFlag = (value: 'shown' | 'dismissed') => {
    if (!isLocalStorageAvailable()) return;
    localStorage.setItem(getCaseKey(caseId), value);
    localStorage.setItem(GLOBAL_COOLDOWN_KEY, Date.now().toString());
  };

  // Initialize tracking
  useEffect(() => {
    if (!shouldShowPopup()) return;
    
    shouldShowRef.current = true;
    setShouldShow(true);
    startTimeRef.current = Date.now();

    // Start 30-second timer
    timeoutRef.current = setTimeout(() => {
      timeOnPageRef.current = MIN_TIME_ON_PAGE;
      setTimeOnPage(MIN_TIME_ON_PAGE);
      
      // Check if scroll threshold is also met
      if (isScrollThresholdMet()) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    }, MIN_TIME_ON_PAGE);

    // Track scroll depth
    const updateScrollDepth = () => {
      const depth = calculateScrollDepth();
      scrollDepthRef.current = depth;
      setScrollDepth(depth);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', updateScrollDepth, { passive: true });

    // Update time on page periodically
    const timeInterval = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        timeOnPageRef.current = elapsed;
        setTimeOnPage(elapsed);
      }
    }, 1000);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateScrollDepth);
      clearInterval(timeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  // Handle submit
  const handleSubmit = () => {
    const payload: FeedbackPayload = {
      caseId,
      rating,
      comment: comment.trim(),
      timeOnPage: Math.round(timeOnPageRef.current / 1000), // Convert to seconds
      scrollDepth: scrollDepthRef.current,
      createdAt: new Date().toISOString(),
    };

    // TODO: Replace this console.log with an API call
    // Example: await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(payload) })
    console.log('Feedback submitted:', payload);

    setCaseFlag('shown');
    isVisibleRef.current = false;
    shouldShowRef.current = false;
    setIsVisible(false);
    setShouldShow(false);
  };

  // Handle dismiss/close
  const handleDismiss = () => {
    setCaseFlag('dismissed');
    isVisibleRef.current = false;
    shouldShowRef.current = false;
    setIsVisible(false);
    setShouldShow(false);
  };

  return {
    isVisible,
    rating,
    setRating,
    comment,
    setComment,
    handleSubmit,
    handleDismiss,
  };
}

// Star rating component
const StarRating: React.FC<{
  rating: number | null;
  onRatingChange: (rating: number) => void;
}> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded transition-colors"
          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
        >
          <svg
            className={`w-8 h-8 transition-colors ${
              rating && star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 fill-none'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

// Main component
export const CaseFeedbackPrompt: React.FC<CaseFeedbackPromptProps> = ({ caseId }) => {
  const {
    isVisible,
    rating,
    setRating,
    comment,
    setComment,
    handleSubmit,
    handleDismiss,
  } = useCaseFeedbackPrompt(caseId);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Popup - Desktop: centered modal, Mobile: bottom sheet */}
      <div
        className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-x-auto md:max-w-md w-full bg-white rounded-xl shadow-2xl z-50 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        style={{
          animation: 'fadeIn 0.3s ease-out, slideUp 0.3s ease-out',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close feedback popup"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center">
            <h2
              id="feedback-title"
              className="text-2xl font-medium text-gray-900 mb-2"
            >
              Was this case helpful?
            </h2>
            <p className="text-gray-600 text-sm">
              Your feedback helps me improve future work and case presentations.
            </p>
          </div>

          {/* Star rating */}
          <div className="py-4">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          {/* Optional comment */}
          <div>
            <label
              htmlFor="feedback-comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Optional feedback
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell me what you think..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSubmit}
              disabled={!rating}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Submit feedback
            </button>
            <button
              onClick={handleDismiss}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

