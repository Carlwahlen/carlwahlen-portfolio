import React, { useState, useEffect } from 'react';
import { analyticsEvents } from '../utils/analytics';

interface ProjectInputs {
  projectBudget: number;
  projectTimeline: number; // månader
  teamSize: number;
  currentConversion: number; // %
  monthlyRevenue: number; // SEK
  productComplexity: 'low' | 'medium' | 'high';
}

interface ROICalculation {
  withoutStrategy: {
    riskCost: number;
    timeOverrun: number; // månader
    costOverrun: number; // SEK
    missedRevenue: number; // SEK
    totalCost: number;
  };
  withStrategy: {
    riskReduction: number; // SEK
    timeSaved: number; // månader
    costSaved: number; // SEK
    revenueIncrease: number; // SEK
    consultantCost: number; // SEK
    totalCost: number;
    netBenefit: number; // SEK
  };
  roi: {
    percentage: number;
    paybackPeriod: number; // månader
    netValue: number; // SEK
  };
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ProjectInputs>({
    projectBudget: 2000000,
    projectTimeline: 12,
    teamSize: 5,
    currentConversion: 2,
    monthlyRevenue: 500000,
    productComplexity: 'medium'
  });

  const [results, setResults] = useState<ROICalculation | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate ROI based on inputs
  const calculateROI = (inputs: ProjectInputs): ROICalculation => {
    const budget = inputs.projectBudget;
    const timeline = inputs.projectTimeline;
    const teamSize = inputs.teamSize;
    const conversion = inputs.currentConversion;
    const revenue = inputs.monthlyRevenue;

    // Complexity multipliers (baserade på genomsnitt från liknande projekt)
    // Low complexity: Etablerade produkter med kända lösningar
    // Medium: Nya produkter med kända teknologier
    // High: Innovation/kombination av flera komplexa system
    const complexityMultipliers = {
      low: { risk: 0.08, time: 0.12, conversion: 1.15 },
      medium: { risk: 0.2, time: 0.25, conversion: 1.4 },
      high: { risk: 0.35, time: 0.4, conversion: 1.8 }
    };

    const multiplier = complexityMultipliers[inputs.productComplexity];

    // Team size affects coordination cost (larger teams = more coordination needed)
    // Based on Brooks' Law: communication overhead increases with team size
    const teamComplexity = Math.min(1.6, 1 + (teamSize - 1) * 0.08); // Max 60% increase, ~8% per person

    // Consultant cost (typically 8-15% of project budget for strategy, averaging 12%)
    const consultantCost = budget * 0.12;

    // WITHOUT STRATEGY calculations
    // Risk: Probability of major pivots/rewrites based on complexity
    const riskProbability = multiplier.risk * teamComplexity;
    const riskCost = budget * riskProbability; // Cost of failed pivots/mistakes
    
    // Time overrun: Extra months due to pivots, unclear requirements, rework
    const timeOverrun = timeline * multiplier.time * teamComplexity;
    
    // Cost overrun: ~25% cost increase per month delay (burn rate + opportunity cost)
    const costOverrun = budget * (multiplier.time * 0.25 * teamComplexity);
    
    // Missed revenue: Opportunity cost during delays (only if revenue exists)
    const missedRevenue = revenue > 0 ? revenue * timeOverrun : 0;

    const withoutStrategy = {
      riskCost,
      timeOverrun,
      costOverrun,
      missedRevenue,
      totalCost: budget + riskCost + costOverrun + missedRevenue
    };

    // WITH STRATEGY calculations (baserade på genomsnittliga resultat)
    // Risk reduction: 65-75% reduction based on complexity (better planning, validation)
    const riskReductionRate = inputs.productComplexity === 'high' ? 0.65 : 0.7;
    const riskReduction = riskCost * riskReductionRate;
    
    // Time savings: 50-65% time savings (clearer roadmap, faster decisions, less rework)
    // Higher complexity = more benefit from strategy
    const timeSavingsRate = inputs.productComplexity === 'high' ? 0.65 : 0.6;
    const timeSaved = timeOverrun * timeSavingsRate;
    
    // Cost savings: Proportional to time saved (60% of cost overrun)
    const costSaved = costOverrun * 0.6;
    
    // Conversion increase: Conservative estimates (20-80% improvement)
    // Higher current conversion = smaller % improvement (law of diminishing returns)
    const baseConversionMultiplier = multiplier.conversion - 1;
    const conversionAdjustment = conversion > 5 ? 0.5 : conversion > 3 ? 0.7 : 1.0; // Diminishing returns
    const conversionIncrease = conversion * (baseConversionMultiplier * conversionAdjustment);
    
    // Revenue increase: Only calculate if conversion and revenue exist
    // More conservative: revenue increase over remaining timeline after time saved
    const effectiveTimeline = timeline - timeSaved;
    const revenueIncrease = revenue > 0 && conversion > 0 
      ? (revenue * (conversionIncrease / 100)) * effectiveTimeline * 0.8 // 80% realization rate
      : 0;

    const withStrategy = {
      riskReduction,
      timeSaved,
      costSaved,
      revenueIncrease,
      consultantCost,
      totalCost: budget + consultantCost,
      netBenefit: riskReduction + costSaved + revenueIncrease - consultantCost
    };

    // ROI calculation
    const netValue = withStrategy.netBenefit;
    const roiPercentage = (netValue / consultantCost) * 100;
    const paybackPeriod = consultantCost / (revenueIncrease / (timeline - timeSaved) + (costSaved / timeline));

    return {
      withoutStrategy,
      withStrategy,
      roi: {
        percentage: Math.round(roiPercentage),
        paybackPeriod: Math.max(0.5, Math.round(paybackPeriod * 10) / 10),
        netValue: Math.round(netValue)
      }
    };
  };

  useEffect(() => {
    const calculated = calculateROI(inputs);
    setResults(calculated);
  }, [inputs]);

  const handleInputChange = (field: keyof ProjectInputs, value: number | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Track interaction
    analyticsEvents.ctaClick('roi_calculator', field);
  };

  const handleGetFullReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track conversion
    analyticsEvents.contactFormSubmit();
    
    // Here you would normally send to your backend/email service
    // For now, simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    alert('Full rapport skickad till din email! (Demo - implementera email integration)');
    setShowEmailCapture(false);
    setEmail('');
  };

  if (!results) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-gray-900 mb-4">
          ROI Calculator: Product Strategy
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Se hur mycket värde en produktstrategi-konsultation kan skapa för ditt projekt
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl text-gray-900 mb-6">Ditt projekt</h3>
          
          <div className="space-y-6">
            {/* Project Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projektbudget (SEK)
              </label>
              <input
                type="number"
                value={inputs.projectBudget}
                onChange={(e) => handleInputChange('projectBudget', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                min="100000"
                step="100000"
              />
            </div>

            {/* Project Timeline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projektlängd (månader)
              </label>
              <input
                type="number"
                value={inputs.projectTimeline}
                onChange={(e) => handleInputChange('projectTimeline', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                min="3"
                max="24"
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teamstorlek (personer)
              </label>
              <input
                type="number"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                min="1"
                max="20"
              />
            </div>

            {/* Current Conversion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nuvarande konverteringsgrad (%)
              </label>
              <input
                type="number"
                value={inputs.currentConversion}
                onChange={(e) => handleInputChange('currentConversion', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            {/* Monthly Revenue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Månadsintäkt (SEK)
              </label>
              <input
                type="number"
                value={inputs.monthlyRevenue}
                onChange={(e) => handleInputChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                min="0"
                step="10000"
              />
            </div>

            {/* Product Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mb-3">
                Produktkomplexitet
              </label>
              <div className="flex gap-3">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => handleInputChange('productComplexity', level)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      inputs.productComplexity === level
                        ? 'bg-lux-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'low' ? 'Låg' : level === 'medium' ? 'Medel' : 'Hög'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* ROI Summary Card */}
          <div className="bg-gradient-to-br from-lux-green-50 to-lux-green-100 rounded-2xl shadow-lg border border-lux-green-200 p-8">
            <div className="text-center mb-6">
              <div className="text-5xl text-lux-green-700 mb-2">
                {results.roi.percentage}%
              </div>
              <div className="text-xl text-lux-green-800">
                ROI
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl text-gray-900">
                  {results.roi.netValue.toLocaleString('sv-SE')} SEK
                </div>
                <div className="text-sm text-gray-600">Nettofördel</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">
                  {results.roi.paybackPeriod} mån
                </div>
                <div className="text-sm text-gray-600">Återbetalningstid</div>
              </div>
            </div>
          </div>

          {/* Comparison Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-xl text-gray-900 mb-6">Jämförelse</h3>
            
            <div className="space-y-6">
              {/* Without Strategy */}
              <div className="border-l-4 border-red-400 pl-4">
                <div className="font-semibold text-red-700 mb-2">Utan produktstrategi</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>Riskkostnad: <span className="font-semibold">{results.withoutStrategy.riskCost.toLocaleString('sv-SE')} SEK</span></div>
                  <div>Tidsöverskridning: <span className="font-semibold">+{results.withoutStrategy.timeOverrun.toFixed(1)} månader</span></div>
                  <div>Kostnadsöverskridning: <span className="font-semibold">{results.withoutStrategy.costOverrun.toLocaleString('sv-SE')} SEK</span></div>
                  <div>Mistad intäkt: <span className="font-semibold">{results.withoutStrategy.missedRevenue.toLocaleString('sv-SE')} SEK</span></div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="font-bold text-gray-900">
                      Totalkostnad: {results.withoutStrategy.totalCost.toLocaleString('sv-SE')} SEK
                    </div>
                  </div>
                </div>
              </div>

              {/* With Strategy */}
              <div className="border-l-4 border-lux-green-400 pl-4">
                <div className="font-semibold text-lux-green-700 mb-2">Med produktstrategi</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>Riskminskning: <span className="font-semibold text-lux-green-700">-{results.withStrategy.riskReduction.toLocaleString('sv-SE')} SEK</span></div>
                  <div>Tidssparande: <span className="font-semibold text-lux-green-700">-{results.withStrategy.timeSaved.toFixed(1)} månader</span></div>
                  <div>Kostnadsbesparing: <span className="font-semibold text-lux-green-700">-{results.withStrategy.costSaved.toLocaleString('sv-SE')} SEK</span></div>
                  <div>Intäktsökning: <span className="font-semibold text-lux-green-700">+{results.withStrategy.revenueIncrease.toLocaleString('sv-SE')} SEK</span></div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="font-bold text-gray-900">
                      Totalkostnad: {results.withStrategy.totalCost.toLocaleString('sv-SE')} SEK
                    </div>
                    <div className="text-lux-green-700 mt-1">
                      Nettofördel: +{results.withStrategy.netBenefit.toLocaleString('sv-SE')} SEK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Uppskattning:</strong> Beräkningarna baseras på genomsnittliga resultat från produktstrategi-projekt. 
              Individuella resultat kan variera baserat på projektkontext, team, och bransch.
            </p>
          </div>

          {/* CTA Button */}
          {!showEmailCapture ? (
            <button
              onClick={() => {
                setShowEmailCapture(true);
                analyticsEvents.ctaClick('get_full_report', 'roi_calculator');
              }}
              className="w-full bg-lux-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-lux-green-700 transition-colors shadow-lg"
            >
              Ladda ner full rapport
            </button>
          ) : (
            <form onSubmit={handleGetFullReport} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-lg text-gray-900 mb-4">
                Få full rapport på email
              </h4>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.com"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-lux-green-600 text-white px-6 py-3 rounded-lg hover:bg-lux-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
