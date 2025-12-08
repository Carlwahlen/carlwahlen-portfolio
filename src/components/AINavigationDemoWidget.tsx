import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Check if user has consented to analytics cookies (GDPR compliance)
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

/**
 * AI Navigation Widget
 * 
 * Global floating widget that integrates with the AI Navigation Engine API.
 * Consumes the API via HTTP - no direct import of business logic.
 */

const API_URL = import.meta.env.VITE_AI_NAVIGATION_API_URL || 'http://localhost:3010';

type Role = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
  targetUrl?: string;
  intent?: string;
  confidence?: number;
}

interface NavigateRequest {
  tenantId: string;
  sessionId?: string;
  input: string;
  language?: string;
  userContext?: {
    loggedIn?: boolean;
    device?: 'mobile' | 'tablet' | 'desktop';
  };
  currentUrl?: string;
  trackQuery?: boolean; // GDPR: Only track if user has consented to analytics cookies
}

interface NavigateResponse {
  sessionId: string;
  intent?: string;
  nextStep?: {
    stepId: string;
    flowId: string;
    type: 'content' | 'login' | 'form' | 'summary';
    title?: string;
    description?: string;
  };
  targetUrl?: string;
  assistantMessage: string;
  confidence?: number;
}

const EXAMPLE_PROMPTS = [
  'Show me your case studies',
  'I want to contact you',
  'What services do you offer',
  'Tell me about yourself',
];

const AINavigationDemoWidget: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: 'Hi! This is a demo of my AI navigation system, currently in development.\n\nIt\'s designed for organisations with large and complex digital services, such as government agencies and banks.\n\nJust type what you want to do, and the demo will guide you to the relevant page.\n\nWant to learn more? Read the full case study.',
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect device type
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Close widget immediately when message is sent
    setIsOpen(false);

    try {
      // GDPR: Only track queries if user has consented to analytics cookies
      const shouldTrackQuery = hasAnalyticsConsent();
      
      const request: NavigateRequest = {
        tenantId: 'demo-tax-agency',
        sessionId: sessionId || undefined,
        input: messageText,
        language: 'en',
        userContext: {
          loggedIn: false,
          device: getDeviceType(),
        },
        currentUrl: window.location.pathname + window.location.hash,
        trackQuery: shouldTrackQuery, // GDPR compliance: only track with consent
      };

      const res = await fetch(`${API_URL}/v1/navigate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data: NavigateResponse = await res.json();
      setSessionId(data.sessionId);

      // Format assistant response
      let assistantContent = data.assistantMessage;
      
      if (data.nextStep) {
        assistantContent += `\n\nNext step: ${data.nextStep.title}`;
        if (data.nextStep.description) {
          assistantContent += `\n${data.nextStep.description}`;
        }
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: assistantContent,
        createdAt: new Date(),
        targetUrl: data.targetUrl,
        intent: data.intent,
        confidence: data.confidence,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Navigate immediately if targetUrl is provided
      if (data.targetUrl) {
        // Handle hash-based routing (/#/case) or regular paths
        const url = data.targetUrl.startsWith('/#')
          ? data.targetUrl.substring(2) // Remove /# prefix for React Router
          : data.targetUrl.startsWith('/')
          ? data.targetUrl
          : `/${data.targetUrl}`;

        // Small delay before navigation to ensure widget is closed
        setTimeout(() => {
          navigate(url);
        }, 300);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // For demo purposes: Show friendly message explaining this is a demonstration
      const errorChatMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `This is a demonstration of the AI Navigation principle using rule-based intent detection.\n\nThe system uses keyword matching and pattern recognition to understand user goals - no LLM required!\n\nIn a production environment, this would connect to a backend API. For now, you can explore the case study to learn more about how it works.`,
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleExampleClick = (example: string) => {
    handleSendMessage(example);
  };

  return (
    <>
      {/* Floating Button - Responsive */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-40 bg-blue-600 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm touch-manipulation"
          aria-label="Open AI Navigation"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className="hidden sm:inline">AI Navigation</span>
          <span className="sm:hidden">AI</span>
        </button>
      )}

      {/* Widget Panel - Responsive */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[600px] max-h-[700px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200 sm:border-t-0">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl flex-shrink-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-2">
                  <h3 className="text-base sm:text-lg text-gray-900">AI Navigation</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Demo version of AI navigation system for complex digital services.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors flex-shrink-0 p-1 touch-manipulation"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Link
                to="/case/ai-navigation"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-blue-600 hover:text-blue-700 active:text-blue-800 transition-colors touch-manipulation"
              >
                <span>Read the full case study</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          {/* Messages Area - Responsive */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="text-sm sm:text-sm whitespace-pre-line leading-relaxed break-words">{message.content}</div>
                </div>
              </div>
            ))}

            {/* Example Prompts (only show if no user messages yet) */}
            {messages.length === 1 && (
              <div className="space-y-2 sm:space-y-2 mt-3 sm:mt-4">
                <p className="text-xs text-gray-500 font-medium px-1">Try these examples:</p>
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(prompt)}
                    disabled={isLoading}
                    className="w-full text-left px-3 py-2.5 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Show navigation indicator if targetUrl is present */}
            {messages.some(m => m.targetUrl) && (
              <div className="flex justify-start">
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 max-w-[90%] sm:max-w-[85%]">
                  <p className="text-sm text-green-800">
                    <strong>Navigating...</strong> Taking you to the right page now.
                  </p>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Responsive */}
          <div className="border-t border-gray-200 p-3 sm:p-4 bg-white rounded-b-2xl flex-shrink-0 safe-area-bottom">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-sm touch-manipulation"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-3 py-2.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation min-w-[44px] sm:min-w-[auto]"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default AINavigationDemoWidget;

