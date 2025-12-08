import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const HellmanPartnersCasePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Hellman & Partners - Carl Wahlen</title>
        <meta name="description" content="Strategic Product & Market Foundation. Created the analytical and conceptual groundwork for a future digital platform." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* 1) HERO */}
        <section className="pt-4 pb-2 lg:pt-6 lg:pb-16">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6 font-medium">
                Hellman & Partners
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-normal">
                Strategic Product & Market Foundation. Created the analytical and conceptual groundwork for a future digital platform.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Contact me
                </Link>
                <Link 
                  to="/case" 
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  View other cases
                </Link>
              </div>
            </div>

            {/* Large mockup centered */}
            <div className="flex justify-center mt-16 lg:mt-20">
              <img
                src="/Payment_app_flow.png"
                alt="Hellman & Partners PropTech concept"
                className="w-full max-w-[80%] filter blur-sm"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 2) WHY THIS MATTERS */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto">
              <h2 className="text-3xl text-gray-900 mb-6 text-center font-medium">
                Why This Matters
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center font-normal">
                Strategic foundation work is critical before technical development begins. This project demonstrates the value of comprehensive planning, market analysis, and business modeling in creating a clear path forward.
              </p>
              
              {/* Icon list in two columns - 5-7 bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Fragmented market information creates decision paralysis</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Unclear value proposition prevents investor confidence</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Strategic foundation saves time and prevents misaligned development</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Market research and business modeling enable clarity and focus</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Platform architecture thinking informs technical decisions</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Organizational design supports team structure and growth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

       

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 4) CONCEPT + CORE SOLUTION */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-[680px] mx-auto mb-16 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Concept: My Approach
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                Worked on developing the strategic, analytical, and conceptual foundation that would enable future product development. Defined what the platform would solve, who it would help, and how the business would work.
              </p>
            </div>

            {/* 3-column grid with visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ gap: '48px' }}>
              {/* Card 1: Market Research */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">Market Research</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Market size and trends analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Customer problems and behaviors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Competitor landscape mapping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Market segmentation and targeting</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Business Modeling */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">Business Modeling</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Revenue model development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Value propositions per segment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Business case creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>TAM/SAM/SOM analysis</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Platform Architecture */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">Platform Architecture</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>System architecture concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Data flow and integration design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>User flow and interface concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Scalability and technical considerations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 5) CAPABILITIES / WHAT THIS ENABLES */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                What This Solution Enables
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ gap: '24px' }}>
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Market clarity</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Clear market insights</li>
                  <li>• Defined target segments</li>
                  <li>• Competitive positioning</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Business foundation</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Revenue models defined</li>
                  <li>• Value propositions clear</li>
                  <li>• Investment readiness</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Platform vision</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Architecture concepts</li>
                  <li>• Technical direction</li>
                  <li>• Scalability planning</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Team structure</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Organizational design</li>
                  <li>• Role definitions</li>
                  <li>• Growth planning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 6) PROCESS - HOW I APPROACHED */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                How I Approached the Problem
              </h2>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.99 10.99z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Research</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Market analysis and competitor research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>User needs and behavior understanding</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Strategy</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Business model and value proposition design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Platform architecture and flow concepts</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Communication</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Pitchdeck and investor materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Roadmap and project planning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 7) RESULTS / OUTCOME */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Results & Outcome
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-normal">
                Although development never began, the project resulted in a complete strategic foundation enabling future execution, investment discussion, and team alignment.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <p className="text-lg text-gray-900 font-medium">
                  <span className="font-semibold">Outcome:</span> Strong foundation enabling clarity before development, investment readiness, and team alignment for future execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 10) FINAL CTA */}
        <section className="py-32 lg:py-40">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Interested in learning more?
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal">
                Let's discuss how I can help build scalable, user-centric solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="btn-primary text-lg px-8 py-4"
                >
                  Contact me
                </Link>
                <Link 
                  to="/case" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  View other cases
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HellmanPartnersCasePage;