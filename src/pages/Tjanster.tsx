import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import CTABand from '../components/CTABand';
import { services, pricing } from '../data/services';

const Tjanster: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Tjänster - payment</title>
        <meta name="description" content="Produktstrategi, teknisk PM, payments & compliance, och UX för komplexa system. Erfarenhet från PayLink360, Hellman & Partners och Style Scandinavia." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
                Tjänster & erbjudande
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Jag hjälper dig att bygga produkter som skapar värde genom kombinationen av 
                strategi, teknik och design.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding section-light">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                Vad jag kan hjälpa dig med
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Från strategi till implementation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <CTABand
          title="Be om förslag"
          description="Låt oss diskutera ditt specifika behov och skapa en skräddarsydd lösning."
          primaryCTA={{
            text: "Kontakta mig",
            link: "/kontakt"
          }}
        />
      </main>
    </>
  );
};

export default Tjanster;
