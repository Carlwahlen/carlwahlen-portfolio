import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AI Navigation Widget
 * 
 * Demo widget som integrerar med AI Navigation API.
 * Konsumerar API:et via HTTP - ingen direkt import av affärslogik.
 */

const API_URL = import.meta.env.VITE_AI_NAVIGATION_API_URL || 'http://localhost:3010';

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

export const AINavigationWidget: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NavigateResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const request: NavigateRequest = {
        tenantId: 'demo-tax-agency',
        sessionId: sessionId || undefined,
        input: input,
        language: 'en',
        userContext: {
          loggedIn: false,
          device: 'desktop',
        },
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
      setResponse(data);
      setSessionId(data.sessionId);
      setInput('');
      
      // Navigate immediately if targetUrl is provided
      if (data.targetUrl) {
        // Handle routing (support both old /#/ paths and new / paths)
        const url = data.targetUrl.startsWith('/#') 
          ? data.targetUrl.substring(2) // Remove /# prefix for React Router compatibility
          : data.targetUrl.startsWith('/')
          ? data.targetUrl
          : `/${data.targetUrl}`;
        
        // Small delay to show the response message briefly
        setTimeout(() => {
          navigate(url);
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/v1/navigate/continue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          event: 'STEP_COMPLETED',
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help navigating... (e.g., 'Show me your case studies')"
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
          <p className="text-sm mt-2 text-red-600">
            Make sure the AI Navigation API is running on {API_URL}
          </p>
        </div>
      )}

      {response && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-2">Assistant:</p>
            <p className="text-gray-700">{response.assistantMessage}</p>
          </div>

          {response.nextStep && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Next Step: {response.nextStep.title}
              </p>
              {response.nextStep.description && (
                <p className="text-sm text-blue-700">{response.nextStep.description}</p>
              )}
            </div>
          )}

          {response.targetUrl && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 mb-2">
                <strong>Navigating...</strong> Taking you to the right page now.
              </p>
            </div>
          )}

          {response.intent && (
            <p className="text-xs text-gray-500 mt-2">
              Detected intent: <strong>{response.intent}</strong>
              {response.confidence && ` (${Math.round(response.confidence * 100)}% confidence)`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

