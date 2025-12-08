import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ROICalculator from '../components/ROICalculator';
import Breadcrumbs from '../components/Breadcrumbs';
import CTABand from '../components/CTABand';

const ROICalculatorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>ROI Calculator - Product Strategy ROI - Carl Wahlen</title>
        <meta name="description" content="Calculate the ROI of product strategy consulting for your project. See potential savings, time reductions, and revenue increases with interactive ROI calculator." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/roi-calculator" />
        <meta property="og:title" content="ROI Calculator - Product Strategy ROI - Carl Wahlen" />
        <meta property="og:description" content="Calculate the ROI of product strategy consulting for your project. See potential savings, time reductions, and revenue increases." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-roi.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/roi-calculator" />
        <meta property="twitter:title" content="ROI Calculator - Product Strategy ROI" />
        <meta property="twitter:description" content="Calculate the ROI of product strategy consulting for your project." />
        
        <link rel="canonical" href="https://carlwahlen.com/roi-calculator" />
      </Helmet>
      
      <main>
        <Breadcrumbs />
        
        {/* ROI Calculator Section */}
        <section className="py-16 bg-gray-50">
          <ROICalculator />
        </section>

        {/* How it works */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-gray-900 mb-8 text-center">
              Hur kalkylatorn fungerar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-lux-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-lux-green-600">1</span>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Fyll i dina projektdata
                </h3>
                <p className="text-gray-600 text-sm">
                  Budget, tidsram, teamstorlek, konverteringsgrad och produktkomplexitet
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-lux-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-lux-green-600">2</span>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Se jämförelse i realtid
                </h3>
                <p className="text-gray-600 text-sm">
                  Få omedelbar insikt i potentiella besparingar och intäktsökningar
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-lux-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-lux-green-600">3</span>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Ladda ner full rapport
                </h3>
                <p className="text-gray-600 text-sm">
                  Få en detaljerad rapport med alla beräkningar och rekommendationer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-gray-900 mb-8 text-center">
              Beräkningsmetodik
            </h2>
            
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl text-gray-900 mb-3">
                    Riskminskning
                  </h3>
                  <p className="text-gray-700">
                    Produktstrategi minskar risken för projektfel och pivoteringar med upp till 70%. 
                    Detta beräknas baserat på produktkomplexitet och historiska data från liknande projekt.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl text-gray-900 mb-3">
                    Tidsbesparing
                  </h3>
                  <p className="text-gray-700">
                    Genom tydlig strategi och prioritering kan projekt levereras 30-60% snabbare. 
                    Snabbare beslut, mindre experimentering och fokus på rätt features.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl text-gray-900 mb-3">
                    Intäktsökning
                  </h3>
                  <p className="text-gray-700">
                    Bättre UX, tydligare value proposition och data-driven optimering kan öka konverteringsgraden 
                    med 20-100% beroende på nuvarande prestanda och produktkomplexitet.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    * Beräkningar baseras på genomsnittliga resultat från projekt inom MVP development, 
                    PropTech, FinTech och B2B SaaS. Individuella resultat kan variera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABand
          title="Redo att börja?"
          description="Låt oss diskutera hur produktstrategi kan skapa värde för ditt projekt."
          primaryCTA={{
            text: "Boka konsultation",
            link: "/contact"
          }}
          secondaryCTA={{
            text: "Visa case studies",
            link: "/case"
          }}
        />
      </main>
    </>
  );
};

export default ROICalculatorPage;
