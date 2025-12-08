import React from 'react';
import { Helmet } from 'react-helmet-async';

const Notes: React.FC = () => {
  const notes = [
    {
      id: 'payment-orchestration-trends',
      title: 'Payment Orchestration Trends 2024',
      excerpt: 'Hur AI och machine learning förändrar PSP-routing och risk management.',
      date: '2024-01-15',
      readTime: '5 min läsning'
    },
    {
      id: 'api-first-payments',
      title: 'API-First Approach i Payments',
      excerpt: 'Varför unified payment APIs blir standarden och hur man bygger dem rätt.',
      date: '2024-01-10',
      readTime: '7 min läsning'
    },
    {
      id: 'fintech-ux-patterns',
      title: 'UX Patterns för Fintech',
      excerpt: 'Designmönster som fungerar för komplexa finansiella produkter.',
      date: '2024-01-05',
      readTime: '6 min läsning'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Insikter - payment</title>
        <meta name="description" content="Korta inlägg och insikter om payments, AI, produktstrategi och UX. Tankar från fältet." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
                Insikter
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Korta inlägg och tankar om payments, AI, produktstrategi och UX.
              </p>
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notes.map((note) => (
                  <article key={note.id} className="card p-6 hover:bg-neutral-800/50 transition-all duration-300 glow-hover group">
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                        <time dateTime={note.date}>
                          {new Date(note.date).toLocaleDateString('sv-SE')}
                        </time>
                        <span>{note.readTime}</span>
                      </div>
                      <h2 className="text-lg text-gray-900 group-hover:text-lux-green-500 transition-colors mb-3">
                        {note.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {note.excerpt}
                      </p>
                    </div>
                    
                    <button className="text-lux-green-500 hover:text-lux-green-600 text-sm font-medium transition-colors group-hover:underline">
                      Läs mer →
                    </button>
                  </article>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-500 text-sm">
                  Fler inlägg kommer snart. Följ mig på{' '}
                  <a 
                    href="https://github.com/payment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lux-green-500 hover:text-lux-green-600 transition-colors"
                  >
                    GitHub
                  </a>{' '}
                  för uppdateringar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Notes;
