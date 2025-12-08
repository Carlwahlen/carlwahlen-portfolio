'use client';

/**
 * AI Navigation Widget
 * 
 * Demo widget that integrates with the AI Navigation API.
 * 
 * EXTRACTION NOTE: This component treats the AI Navigation API as an external service.
 * When the AI engine is moved to a separate SaaS, just update the API_URL constant
 * or environment variable.
 */

import { useState } from 'react';
import type { NavigateRequest, NavigateResponse } from '@carlwahlen/shared-types';

const API_URL = process.env.NEXT_PUBLIC_AI_NAVIGATION_API_URL || 'http://localhost:3001';

export function AINavigationWidget() {
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
        tenantId: 'demo-tax-agency', // Demo tenant
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
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        maxWidth: '600px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help navigating..."
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.6 : 1,
          }}
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fee',
            color: '#c00',
            borderRadius: '4px',
          }}
        >
          Error: {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          >
            <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
              Assistant:
            </p>
            <p>{response.assistantMessage}</p>
          </div>

          {response.nextStep && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                Next Step: {response.nextStep.title}
              </p>
              {response.nextStep.description && (
                <p style={{ fontSize: '0.85rem', color: '#888' }}>
                  {response.nextStep.description}
                </p>
              )}
            </div>
          )}

          {response.targetUrl && (
            <div style={{ marginTop: '1rem' }}>
              <a
                href={response.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  marginRight: '0.5rem',
                }}
              >
                Go to Page
              </a>
              <button
                onClick={handleContinue}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {response.intent && (
            <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
              Detected intent: {response.intent}
              {response.confidence && ` (${Math.round(response.confidence * 100)}% confidence)`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

