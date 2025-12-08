// Analytics utility for tracking conversions and user behavior
// This will work with Google Analytics 4 when you get your tracking ID

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any; // Allow additional parameters for GA4
}

// Scroll heatmap data storage
interface ScrollHeatmapData {
  path: string;
  positions: Array<{ y: number; timestamp: number; duration: number }>;
}

let trackingInitialized = false;

// Check if user has consented to analytics
const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return false;
  
  try {
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch {
    return false;
  }
};

// Google Analytics 4 event tracking (GA4 format)
export const trackEvent = (event: AnalyticsEvent) => {
  // Only track if user has consented to analytics
  if (!hasAnalyticsConsent()) {
    // Log to console for development (doesn't require consent)
    // In production, this won't log anything
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log('Analytics Event (not tracked - no consent):', event);
    }
    return;
  }
  
  // GA4 uses different event format than Universal Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Build GA4 event parameters
    const ga4Params: Record<string, any> = {
      event_category: event.category,
      ...(event.label && { event_label: event.label }),
      ...(event.value !== undefined && { value: event.value }),
    };
    
    // Add any additional custom parameters
    Object.keys(event).forEach(key => {
      if (!['action', 'category', 'label', 'value'].includes(key)) {
        ga4Params[key] = event[key];
      }
    });
    
    (window as any).gtag('event', event.action, ga4Params);
  }
  
  // Also log to console for development
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Analytics Event:', event);
  }
};

// Predefined events for common actions
export const analyticsEvents = {
  // Contact form events
  contactFormStart: () => trackEvent({
    action: 'form_start',
    category: 'contact',
    label: 'contact_form'
  }),
  
  contactFormSubmit: () => trackEvent({
    action: 'form_submit',
    category: 'contact',
    label: 'contact_form'
  }),
  
  contactFormError: (error: string) => trackEvent({
    action: 'form_error',
    category: 'contact',
    label: error
  }),
  
  // Navigation events
  pageView: (page: string) => trackEvent({
    action: 'page_view',
    category: 'navigation',
    label: page
  }),
  
  // CTA events
  ctaClick: (cta: string, location: string) => trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: `${cta}_${location}`
  }),
  
  // Case study events
  caseStudyView: (caseName: string) => trackEvent({
    action: 'case_view',
    category: 'content',
    label: caseName
  }),
  
  // FAQ events
  faqExpand: (question: string) => trackEvent({
    action: 'faq_expand',
    category: 'engagement',
    label: question
  }),
  
  // Download events
  downloadStart: (file: string) => trackEvent({
    action: 'download_start',
    category: 'conversion',
    label: file
  }),
  
  // External link events
  externalLinkClick: (url: string) => trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: url
  }),
  
  // Scroll depth tracking
  scrollDepth: (depth: number) => trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth
  }),
  
  // Time on page tracking
  timeOnPage: (seconds: number) => trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: `${seconds}s`,
    value: seconds
  }),
  
  // Exit intent tracking
  exitIntent: () => trackEvent({
    action: 'exit_intent',
    category: 'engagement',
    label: 'user_attempting_to_leave'
  }),
  
  // Hover tracking on important links
  linkHover: (linkText: string, linkUrl: string) => trackEvent({
    action: 'link_hover',
    category: 'engagement',
    label: linkText,
    link_url: linkUrl
  }),
  
  // Video/Media interaction
  mediaPlay: (mediaType: string, mediaName: string) => trackEvent({
    action: 'media_play',
    category: 'engagement',
    label: mediaName,
    media_type: mediaType
  }),
  
  // Search events
  searchPerformed: (query: string, resultCount: number) => trackEvent({
    action: 'search',
    category: 'engagement',
    label: query,
    search_term: query,
    search_results: resultCount
  }),
  
  // Scroll heatmap data point
  scrollHeatmapPoint: (yPosition: number, pagePath: string) => trackEvent({
    action: 'scroll_position',
    category: 'heatmap',
    label: pagePath,
    scroll_y: yPosition,
    page_path: pagePath
  })
};

// Scroll depth tracking with improved logic
export const trackScrollDepth = () => {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const trackedMilestones = new Set<number>();
  
  const updateScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track milestones once
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          analyticsEvents.scrollDepth(milestone);
        }
      });
    }
  };
  
  // Throttle scroll events for performance
  let scrollTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollDepth, 100);
  }, { passive: true });
};

// Enhanced scroll heatmap tracking
// Tracks scroll positions over time to create heatmap data
let scrollHeatmapData: ScrollHeatmapData = {
  path: window.location.pathname,
  positions: []
};

let scrollTrackingInterval: ReturnType<typeof setInterval> | null = null;
let lastScrollY = 0;
let lastScrollTime = Date.now();

export const trackScrollHeatmap = () => {
  if (!hasAnalyticsConsent()) return;
  
  const currentPath = window.location.pathname;
  
  // Reset data if page changed
  if (scrollHeatmapData.path !== currentPath) {
    scrollHeatmapData = {
      path: currentPath,
      positions: []
    };
  }
  
  // Track scroll position every 500ms while scrolling
  const trackScrollPosition = () => {
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const currentTime = Date.now();
    const duration = currentTime - lastScrollTime;
    
    // Only track if position changed significantly (more than 50px)
    if (Math.abs(currentY - lastScrollY) > 50 || duration > 1000) {
      const scrollPercent = Math.round(
        (currentY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Store heatmap data point
      scrollHeatmapData.positions.push({
        y: scrollPercent,
        timestamp: currentTime,
        duration: duration
      });
      
      // Send to GA4 (sample: every 5th position to avoid too many events)
      if (scrollHeatmapData.positions.length % 5 === 0) {
        analyticsEvents.scrollHeatmapPoint(scrollPercent, currentPath);
      }
      
      lastScrollY = currentY;
      lastScrollTime = currentTime;
    }
  };
  
  // Clear existing interval if any
  if (scrollTrackingInterval) {
    clearInterval(scrollTrackingInterval);
  }
  
  // Track on scroll with throttling
  let scrollThrottle: ReturnType<typeof setTimeout>;
  window.addEventListener('scroll', () => {
    if (scrollThrottle) clearTimeout(scrollThrottle);
    scrollThrottle = setTimeout(trackScrollPosition, 500);
  }, { passive: true });
  
  // Also track periodically while on page
  scrollTrackingInterval = setInterval(trackScrollPosition, 2000);
  
  // Save heatmap data when leaving page
  window.addEventListener('beforeunload', () => {
    if (scrollTrackingInterval) {
      clearInterval(scrollTrackingInterval);
    }
    
    // Send aggregated heatmap data
    const avgScrollPercent = scrollHeatmapData.positions.length > 0
      ? Math.round(
          scrollHeatmapData.positions.reduce((sum, pos) => sum + pos.y, 0) / 
          scrollHeatmapData.positions.length
        )
      : 0;
    
    if (avgScrollPercent > 0) {
      trackEvent({
        action: 'scroll_heatmap_summary',
        category: 'heatmap',
        label: currentPath,
        average_scroll_position: avgScrollPercent,
        total_data_points: scrollHeatmapData.positions.length
      });
    }
  });
};

// Exit intent detection
export const trackExitIntent = () => {
  if (!hasAnalyticsConsent()) return;
  
  // Detect when user is about to leave (mouse moves to top of screen)
  document.addEventListener('mouseout', (e: MouseEvent) => {
    // Check if mouse is leaving the viewport from the top
    if (!e.relatedTarget && e.clientY <= 0) {
      analyticsEvents.exitIntent();
    }
  });
  
  // Also track before page unload
  window.addEventListener('beforeunload', () => {
    analyticsEvents.exitIntent();
  });
};

// Time on page tracking
export const trackTimeOnPage = () => {
  if (!hasAnalyticsConsent()) return;
  
  const startTime = Date.now();
  let timeTracked = 0;
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Only track if time has increased
    if (timeSpent > timeTracked) {
      timeTracked = timeSpent;
      
      // Track at key intervals: 10s, 30s, 1min, 2min, 5min
      if ([10, 30, 60, 120, 300].includes(timeSpent)) {
        analyticsEvents.timeOnPage(timeSpent);
      }
    }
  };
  
  // Track time when user leaves page
  window.addEventListener('beforeunload', () => {
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    if (finalTime > timeTracked) {
      analyticsEvents.timeOnPage(finalTime);
    }
  });
  
  // Track every 30 seconds
  setInterval(trackTime, 30000);
};

// Initialize all tracking
export const initializeTracking = () => {
  if (trackingInitialized || !hasAnalyticsConsent()) return;
  
  trackingInitialized = true;
  
  trackScrollDepth();
  trackScrollHeatmap();
  trackExitIntent();
  trackTimeOnPage();
};
