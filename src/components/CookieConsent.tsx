import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeTracking } from '../utils/analytics';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Use the same GA ID as in index.html
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-7LZ1KF8WBT';
let gaScriptInjected = false;

const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined' || gaScriptInjected) {
    return;
  }

  // Check if Google tag is already loaded from index.html
  if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    gaScriptInjected = true;
    // Ensure gtag is available
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer?.push(arguments);
      };
    return;
  }

  if (document.querySelector(`script[data-gtag-id="${GA_MEASUREMENT_ID}"]`)) {
    gaScriptInjected = true;
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.setAttribute('data-gtag-id', GA_MEASUREMENT_ID);
  document.head.appendChild(script);

  window.gtag('js', new Date());
  gaScriptInjected = true;
};

const updateGtagConsent = (analyticsConsent: boolean, marketingConsent: boolean) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: analyticsConsent ? 'granted' : 'denied',
    ad_storage: marketingConsent ? 'granted' : 'denied',
  });
};

const configureGA = () => {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    page_path: window.location.pathname,
    send_page_view: false,
  });
};

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      // No consent saved, show banner
      setShowBanner(true);
    } else {
      // Load saved preferences
      const saved = JSON.parse(savedConsent);
      setPreferences(saved);
      
      // Initialize tracking based on preferences
      if (saved.analytics) {
        initializeAnalytics(saved.marketing);
      }
      if (saved.marketing) {
        initializeMarketing(saved.analytics);
      }
    }
  }, []);

  // Initialize analytics tracking (Google Analytics, Clarity, etc.)
  const initializeAnalytics = (marketingConsent?: boolean) => {
    loadGoogleAnalytics();
    configureGA();
    updateGtagConsent(true, marketingConsent ?? preferences.marketing);
    initializeTracking();
  };

  // Initialize marketing tracking
  const initializeMarketing = (analyticsConsent?: boolean) => {
    updateGtagConsent(analyticsConsent ?? preferences.analytics, true);
  };

  // Accept all cookies
  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  // Accept necessary only
  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    savePreferences(necessaryOnly);
    setShowBanner(false);
  };

  // Save preferences to localStorage
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(prefs);
    updateGtagConsent(prefs.analytics, prefs.marketing);
    
    // Initialize tracking based on new preferences
    if (prefs.analytics) {
      initializeAnalytics(prefs.marketing);
    }
    if (prefs.marketing) {
      initializeMarketing(prefs.analytics);
    }
  };

  // Save custom preferences
  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  // Withdraw consent (delete all tracking)
  const handleWithdrawConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    
    setShowSettings(false);
    // Reload page to clear all tracking
    window.location.reload();
  };

  if (!showBanner && !showSettings) {
    // Show small settings button in corner
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg hover:bg-gray-800 transition-colors font-medium"
        aria-label="Cookie settings"
      >
        🍪 Cookie Settings
      </button>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-2">
                  Carl Wahlén uses cookies
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  We use cookies to improve your experience, analyze traffic, and understand how visitors use the website. 
                  Some cookies are necessary for the website to function correctly.
                </p>
                <p className="text-xs text-gray-500">
                  By clicking "Accept all", you consent to our use of cookies. 
                  You can change your settings at any time. 
                  <Link to="/privacy" className="text-lux-green-600 hover:underline ml-1">
                    Read more in our privacy policy
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Necessary only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl text-gray-900">
                    Cookie Settings
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Carl Wahlén</p>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6 mb-6">
                {/* Necessary Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg text-gray-900">
                        Necessary cookies
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        These cookies are necessary for the website to function. They cannot be disabled.
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        Always active
                      </span>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Session management</li>
                    <li>• Security features</li>
                    <li>• Form data</li>
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900">
                        Analytics cookies
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Helps us understand how visitors interact with the website by collecting anonymized information.
                      </p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lux-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lux-green-600"></div>
                      </label>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Google Analytics 4 (anonymized data)</li>
                    <li>• Microsoft Clarity (heatmaps and session recordings)</li>
                    <li>• Page views and user flow</li>
                    <li>• Conversion tracking (form submissions, CTA clicks)</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900">
                        Marketing cookies
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Used to show relevant ads and track campaign effectiveness.
                      </p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lux-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lux-green-600"></div>
                      </label>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Retargeting pixels</li>
                    <li>• Social media tracking</li>
                    <li>• Ad optimization</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWithdrawConsent}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Withdraw consent
                </button>
                <div className="flex-1"></div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Save settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

