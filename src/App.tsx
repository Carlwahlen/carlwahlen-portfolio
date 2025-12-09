import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import AINavigationDemoWidget from './components/AINavigationDemoWidget';
import Home from './pages/Home';
import Services from './pages/Services';
import Case from './pages/Case';
import FounderCasePage from './pages/FounderCasePage';
import StyleScandinaviaCasePage from './pages/StyleScandinaviaCasePage';
import HellmanPartnersCasePage from './pages/HellmanPartnersCasePage';
import PortfolioCasePage from './pages/PortfolioCasePage';
import AINavigationCasePage from './pages/AINavigationCasePage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Notes from './pages/Notes';
import KnowledgeArticlePage from './pages/KnowledgeArticlePage';
import KnowledgeOverviewPage from './pages/KnowledgeOverviewPage';
import { generateJSONLD } from './seo';
import { initializeTracking, analyticsEvents } from './utils/analytics';

// Component to track page views on route change
const PageViewTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const pagePath = location.pathname;
    analyticsEvents.pageView(pagePath);
    
    // Re-initialize tracking for new page (scroll heatmap resets per page)
    initializeTracking();
  }, [location]);

  return null;
};

// Component to handle scroll position based on navigation type
const ScrollManager: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positionsRef = useRef<Record<string, number>>({});
  const prevLocationRef = useRef(location);

  useEffect(() => {
    const prevLocation = prevLocationRef.current;
    const prevKey = prevLocation.key || prevLocation.pathname;
    positionsRef.current[prevKey] = window.scrollY;

    const currentKey = location.key || location.pathname;
    const storedPosition = positionsRef.current[currentKey];

    if (storedPosition !== undefined) {
      window.scrollTo({ top: storedPosition, left: 0, behavior: 'auto' });
    } else if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    prevLocationRef.current = location;
  }, [location, navigationType]);

  return null;
};

const App: React.FC = () => {
  // Initialize tracking on app load
  useEffect(() => {
    initializeTracking();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <PageViewTracker />
        <ScrollManager />
        <div className="min-h-screen bg-white pt-16">
          {/* JSON-LD Schema */}
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJSONLD()) }}
          />
          
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tjanster" element={<Services />} />
            <Route path="/case" element={<Case />} />
            <Route path="/case/payment-orchestration" element={<FounderCasePage />} />
            <Route path="/case/style-scandinavia" element={<StyleScandinaviaCasePage />} />
            <Route path="/case/hellman-partners" element={<HellmanPartnersCasePage />} />
            <Route path="/case/portfolio-website" element={<PortfolioCasePage />} />
            <Route path="/case/ai-navigation" element={<AINavigationCasePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            {/* Knowledge Hub routes */}
            <Route path="/knowledge" element={<KnowledgeOverviewPage />} />
            <Route path="/knowledge/:areaSlug/:pageSlug" element={<KnowledgeArticlePage />} />
            {/* Redirect old Swedish URLs to English */}
            <Route path="/om" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
          
          <Footer />
          <CookieConsent />
          <AINavigationDemoWidget />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
