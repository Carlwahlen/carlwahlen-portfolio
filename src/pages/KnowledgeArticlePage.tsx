import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  getKnowledgePage, 
  getAreaDisplayName,
  KnowledgeAreaSlug,
  DEFAULT_SERVICES_PATH 
} from '../content/knowledgePages';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedKnowledgePages from '../components/knowledge/RelatedKnowledgePages';
import KnowledgeToServicesCTA from '../components/knowledge/KnowledgeToServicesCTA';

const KnowledgeArticlePage: React.FC = () => {
  const { areaSlug, pageSlug } = useParams<{ 
    areaSlug: string; 
    pageSlug: string;
  }>();

  // Validate and get page
  const area = areaSlug as KnowledgeAreaSlug;
  const page = areaSlug && pageSlug 
    ? getKnowledgePage(area, pageSlug)
    : undefined;

  // 404 handling
  if (!page || !areaSlug || !pageSlug) {
    return (
      <>
        <Helmet>
          <title>Page not found - Carl Wahlen</title>
        </Helmet>
        <main className="min-h-screen">
          <section className="section-padding">
            <div className="container-custom">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl text-gray-900 mb-4">Page not found</h1>
                <p className="text-gray-600 mb-8">
                  The knowledge article you're looking for doesn't exist.
                </p>
                <Link to="/knowledge" className="btn-primary">
                  Browse Knowledge Hub
                </Link>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  const areaDisplayName = getAreaDisplayName(page.areaSlug);
  const canonicalUrl = `https://carlwahlen.com/knowledge/${page.areaSlug}/${page.pageSlug}`;

  return (
    <>
      <Helmet>
        <title>{page.title} - Carl Wahlen</title>
        <meta name="description" content={page.description} />
        {page.keywords && (
          <meta name="keywords" content={page.keywords.join(", ")} />
        )}
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${page.title} - Carl Wahlen`} />
        <meta property="og:description" content={page.description} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={`${page.title} - Carl Wahlen`} />
        <meta property="twitter:description" content={page.description} />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-28 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumbs */}
              <Breadcrumbs />

              {/* Area Label */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {areaDisplayName}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6 font-medium leading-tight">
                {page.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                {page.readingTimeMinutes && (
                  <span>{page.readingTimeMinutes} min read</span>
                )}
              </div>

              {/* Description / Intro */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {page.description}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="container-custom">
            <article className="max-w-3xl mx-auto">
              {/* TL;DR Section */}
              {page.summaryBullets && page.summaryBullets.length > 0 && (
                <div className="card p-6 mb-12 bg-gray-50 border border-gray-200">
                  <h2 className="text-xl text-gray-900 mb-4">Quick summary</h2>
                  <ul className="space-y-2">
                    {page.summaryBullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-900 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Content Sections */}
              <div className="prose prose-lg max-w-none space-y-12">
                {page.pageSlug === "what-is-product-strategy" ? (
                  <>
                    {/* Why this topic matters */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Why this topic matters</h2>
                      <p className="text-gray-700 leading-relaxed">
                        Product strategy matters because it gives direction, alignment and purpose to what a team builds. Without it, development becomes reactive and feature-driven instead of solving real user problems. A strong strategy ensures prioritization is objective and connected to business outcomes.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Strategy prevents wasted time, reduces misalignment and gives teams a clear decision framework. It connects user needs, business goals and technical feasibility — enabling products to grow with intention and focus.
                      </p>
                    </section>

                    {/* How it works */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">How it works</h2>
                      <p className="text-gray-700 leading-relaxed">
                        A product strategy works by defining WHO you build for, WHY it matters and HOW success is measured. It guides decisions in design, engineering and roadmap prioritization.
                      </p>
                      <ul className="space-y-2 mt-4">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Define target users & JTBD</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Identify key user problems and pain points</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Create a clear value proposition</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Choose a strategic direction (growth, retention, efficiency, expansion)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Translate the direction into measurable outcomes (KPIs / North Star Metric)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Convert those outcomes into roadmap themes and prioritized initiatives</span>
                        </li>
                      </ul>
                    </section>

                    {/* Frameworks */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Frameworks</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>RICE</strong> — prioritize by reach, impact, confidence, effort</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>MoSCoW</strong> — must / should / could / won't</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Kano Model</strong> — balance expectations vs delight</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>North Star Metric</strong> — one metric representing delivered value</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>JTBD</strong> — understand context & motivation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>OKRs</strong> — align teams around objectives and key results</span>
                        </li>
                      </ul>
                    </section>

                    {/* Examples */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Examples</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Fintech → reduce checkout friction → KPI: transaction success %</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">PropTech → improve housing insight → KPI: session depth per visit</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">SaaS MVP → validate core idea → KPI: activation rate</span>
                        </li>
                      </ul>
                    </section>

                    {/* Common mistakes */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Common mistakes</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Building features without defined outcomes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Changing strategy every sprint → no compounding effect</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">No metrics → decisions based on opinions, not evidence</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">No user feedback loop → slow learning and wrong priorities</span>
                        </li>
                      </ul>
                    </section>
                  </>
                ) : page.pageSlug === "ux-vs-ui" ? (
                  <>
                    {/* Why this topic matters */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Why this topic matters</h2>
                      <p className="text-gray-700 leading-relaxed">
                        Understanding the difference between UX and UI matters because they address different problems and require different skills. Confusing them leads to hiring the wrong expertise, misaligned expectations and products that look good but fail to solve user problems.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        UX focuses on how users achieve their goals — the logic, flow and structure. UI focuses on how it looks and feels — colors, typography, spacing and visual hierarchy. Both are essential, but they operate at different stages of the design process.
                      </p>
                    </section>

                    {/* How it works */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">How it works</h2>
                      <p className="text-gray-700 leading-relaxed">
                        UX design starts with research and understanding user needs, then creates wireframes and user flows. UI design takes those wireframes and applies visual design, creating the interface that users interact with.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        <strong>UX process:</strong>
                      </p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">User research & interviews</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Information architecture & user flows</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Wireframing & low-fidelity prototypes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Usability testing & iteration</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-6">
                        <strong>UI process:</strong>
                      </p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Visual design system & brand identity</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Component design & style guide</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">High-fidelity mockups & interactive prototypes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Design handoff to development</span>
                        </li>
                      </ul>
                    </section>

                    {/* Frameworks */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Frameworks</h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>UX frameworks & methods:</strong>
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>User Journey Mapping</strong> — visualize user experience across touchpoints</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Jobs-to-be-Done (JTBD)</strong> — understand user motivations and context</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Card Sorting</strong> — organize information architecture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>User Personas</strong> — represent target user groups</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>UI principles:</strong>
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Visual Hierarchy</strong> — guide attention with size, color, contrast</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Design Systems</strong> — consistent components and patterns</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Accessibility (WCAG)</strong> — ensure usable by all users</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Gestalt Principles</strong> — proximity, similarity, continuity</span>
                        </li>
                      </ul>
                    </section>

                    {/* Examples */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Examples</h2>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>UX example:</strong> A fintech app with confusing checkout flow (UX problem) — solution: simplify steps, add progress indicator, reduce form fields
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>UI example:</strong> Same app with inconsistent button styles and poor contrast (UI problem) — solution: unified design system, improved color contrast, consistent spacing
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>When UX should be prioritized:</strong> New product, complex workflows, user confusion, high drop-off rates
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>When UI should be prioritized:</strong> Rebranding, improving visual consistency, accessibility updates, mobile responsiveness
                          </div>
                        </li>
                      </ul>
                    </section>

                    {/* Common mistakes */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Common mistakes</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Designing UI before understanding UX → beautiful but unusable</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Hiring UI designers for UX problems → wrong skillset for the job</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Treating UX and UI as the same discipline → missing critical steps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Skipping UX research to save time → building wrong features</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Focusing only on aesthetics → ignoring usability and accessibility</span>
                        </li>
                      </ul>
                    </section>
                  </>
                ) : page.pageSlug === "kpi-north-star-metrics" ? (
                  <>
                    {/* Why this topic matters */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Why this topic matters</h2>
                      <p className="text-gray-700 leading-relaxed">
                        KPIs and North Star Metrics matter because they transform product decisions from opinions into data-driven actions. Without clear metrics, teams build features based on assumptions, struggle to measure impact and can't prioritize effectively.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        A well-chosen North Star Metric aligns the entire team around one goal, while KPIs track progress toward specific outcomes. Together, they create a measurement framework that guides roadmap decisions and validates product strategy.
                      </p>
                    </section>

                    {/* How it works */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">How it works</h2>
                      <p className="text-gray-700 leading-relaxed">
                        The North Star Metric represents the core value your product delivers to users. It's the single metric that, when it improves, indicates your product is moving in the right direction. KPIs are supporting metrics that track progress toward specific goals.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        <strong>How to choose a North Star Metric:</strong>
                      </p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Represents value delivered to users (not just business value)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Measurable and actionable (you can influence it directly)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Leads to business outcomes (when it improves, revenue/retention improves)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Easy to understand and communicate across teams</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-6">
                        <strong>KPI selection process:</strong>
                      </p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Define product goals and success criteria</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Choose 3–5 KPIs that directly support the North Star</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Set baseline measurements and target thresholds</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Review and adjust based on learnings</span>
                        </li>
                      </ul>
                    </section>

                    {/* Frameworks */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Frameworks</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>North Star Framework</strong> — one metric that represents product value</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Pirate Metrics (AARRR)</strong> — Acquisition, Activation, Retention, Revenue, Referral</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>HEART Framework</strong> — Happiness, Engagement, Adoption, Retention, Task Success</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>Leading vs Lagging Indicators</strong> — predictive metrics vs outcome metrics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700"><strong>ICE Scoring</strong> — Impact, Confidence, Ease for metric prioritization</span>
                        </li>
                      </ul>
                    </section>

                    {/* Examples */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Examples</h2>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>Spotify:</strong> North Star = "Time spent listening" → KPIs: Daily Active Users, Session length, Songs per session
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>SaaS Product:</strong> North Star = "Weekly active teams" → KPIs: Activation rate, Feature adoption, NPS, Churn rate
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>E-commerce:</strong> North Star = "Monthly active buyers" → KPIs: Conversion rate, Average order value, Repeat purchase rate
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <div className="text-gray-700">
                            <strong>Social Platform:</strong> North Star = "Messages sent per week" → KPIs: New connections, Response rate, Engagement depth
                          </div>
                        </li>
                      </ul>
                    </section>

                    {/* Common mistakes */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Common mistakes</h2>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Tracking too many metrics → analysis paralysis and unclear priorities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Choosing vanity metrics → metrics that look good but don't drive decisions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">North Star = business metric → should represent user value, not revenue</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Not connecting metrics to roadmap → metrics exist but don't influence priorities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Ignoring qualitative data → metrics tell you what, not why</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-900 mr-3 mt-1">•</span>
                          <span className="text-gray-700">Changing metrics too frequently → no baseline to measure progress against</span>
                        </li>
                      </ul>
                    </section>
                  </>
                ) : (
                  <>
                    {/* Fallback placeholder content for other articles */}
                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Why this topic matters</h2>
                      <p className="text-gray-700 leading-relaxed">
                        Understanding {page.title.toLowerCase()} is essential for building successful products. 
                        This knowledge helps teams make better decisions, avoid common pitfalls, and create more value for both users and the business.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        [Content placeholder: Replace with your detailed explanation about why this topic matters in product development and strategy.]
                      </p>
                    </section>

                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">How it works</h2>
                      <p className="text-gray-700 leading-relaxed">
                        [Content placeholder: Explain the core concepts, methodologies, or processes related to this topic. 
                        Include practical examples, frameworks, or step-by-step guides where relevant.]
                      </p>
                    </section>

                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Common mistakes</h2>
                      <p className="text-gray-700 leading-relaxed">
                        [Content placeholder: List and explain common mistakes teams make when working with this topic. 
                        Help readers avoid these pitfalls by sharing real-world examples and lessons learned.]
                      </p>
                    </section>

                    <section className="space-y-4">
                      <h2 className="text-2xl text-gray-900 font-medium">Best practices</h2>
                      <p className="text-gray-700 leading-relaxed">
                        [Content placeholder: Share actionable best practices and recommendations. 
                        Include tips, checklists, or guidelines that readers can apply immediately in their work.]
                      </p>
                    </section>
                  </>
                )}
              </div>

              {/* Related Pages */}
              <RelatedKnowledgePages page={page} />

              {/* CTA to Services */}
              <div className="mt-12">
                <KnowledgeToServicesCTA page={page} />
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default KnowledgeArticlePage;

