import { AINavigationWidget } from '@/components/AINavigationWidget';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Carl Wahlen</h1>
      <p style={{ marginBottom: '2rem' }}>
        Product Strategy Consultant
      </p>
      
      {/* AI Navigation Demo Widget */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>AI Navigation Demo</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Try the AI navigation assistant. This is a demo integration of the AI navigation engine.
        </p>
        <AINavigationWidget />
      </div>
    </main>
  );
}

