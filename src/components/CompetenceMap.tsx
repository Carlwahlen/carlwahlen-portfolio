import React, { useEffect, useRef } from 'react';

interface CompetenceMapProps {
  width?: number;
  height?: number;
}

const CompetenceMap: React.FC<CompetenceMapProps> = ({ 
  width, 
  height 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadP5 = async () => {
      // Vänta lite för att säkerställa att DOM är redo
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const p5Instance = (await import('p5')).default;
      
      // Responsiv storlek baserat på container
  const getResponsiveSize = () => {
    // Vänta lite extra för att säkerställa att DOM är helt redo
    if (!containerRef.current) {
      // Fallback - vänta och försök igen
      return { 
        width: 0, 
        height: 0 
      };
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    // Säkerställ att vi har giltiga dimensioner
    if (containerWidth === 0 || containerHeight === 0) {
      return { 
        width: 0, 
        height: 0 
      };
    }
    
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // På mobil: begränsa till containerns faktiska storlek, men säkerställ att den inte överskrider viewport
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      // Använd den minsta av container-storleken och viewport minus padding
      const safeWidth = Math.min(containerWidth, Math.max(280, viewportWidth - 32));
      
      return { 
        width: safeWidth,
        height: containerHeight 
      };
    }
    
    // Desktop: använd container-storlek direkt
    return { 
      width: containerWidth, 
      height: containerHeight 
    };
  };
      
      const { width: responsiveWidth, height: responsiveHeight } = getResponsiveSize();
      
      // Säkerställ att vi har giltiga dimensioner, annars vänta och försök igen
      if (responsiveWidth === 0 || responsiveHeight === 0) {
        console.log('CompetenceMap: Väntar på container dimensions...');
        setTimeout(() => loadP5(), 200);
        return;
      }
      
      console.log('CompetenceMap: Container dimensions:', responsiveWidth, 'x', responsiveHeight);
      
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }

        // NOTE: competences är nu i sketchen som getCompetences() funktion
        // för dynamisk beräkning baserat på centerX/centerY

      const sketch = (p: any) => {
        let animationTime = 0;
        let hoveredCompetence = -1;
        let selectedCompetence = -1;
        let centerX = 0;
        let centerY = 0;
        
        // Funktion för att beräkna competences baserat på aktuell centerX/centerY
        const getCompetences = () => {
          const isMobile = p.width < 768;
          // På mobil: använd 70% av canvas-storleken för att säkerställa att figuren passar helt
          // Med radius1 * 0.42 kan punkterna hamna upp till 42% från centrum, så vi behöver extra marginal
          // 70% ger oss 15% marginal på varje sida, vilket är tillräckligt
          const networkWidth = isMobile 
            ? Math.min(p.width * 0.7, p.width - 48) // 70% av bredden med minst 24px padding på varje sida
            : Math.min(p.width * 0.6, 600);
          const networkHeight = isMobile 
            ? Math.min(p.height * 0.7, p.height - 48) // 70% av höjden med minst 24px padding på varje sida
            : Math.min(p.height * 0.8, 500);
          
          // Definiera 10 punkter (tar första 10 kompetenserna)
          const numDots = 10;
          const radius1 = Math.min(networkWidth, networkHeight) * 0.42; // Initial cirkulär formation (bild 1) - ökat från 0.35 till 0.42
          
          // Statisk formation - ingen animation
          // Alltid visa cirkulär formation
          
          // Skapa initial positions (bild 1 - cirkulär formation)
          const initialPositions: Array<{x: number, y: number}> = [];
          for (let i = 0; i < numDots; i++) {
            const angle = (i / numDots) * Math.PI * 2;
            initialPositions.push({
              x: centerX + Math.cos(angle) * radius1,
              y: centerY + Math.sin(angle) * radius1
            });
          }
          
          // Skapa final positions (bild 2 - tvådelad form: övre konkav kurva och nedre mustasch-form)
          const finalPositions: Array<{x: number, y: number}> = [];
          const figureWidth = Math.min(networkWidth, networkHeight) * 0.9;
          const verticalGap = Math.min(networkWidth, networkHeight) * 0.25; // Mellanrum mellan övre och nedre delen
          const upperCurveDepth = Math.min(networkWidth, networkHeight) * 0.1; // Hur djupt den övre kurvan går
          const lowerSpikeHeight = Math.min(networkWidth, networkHeight) * 0.12; // Hur högt den nedre spetsen går
          
          // Övre del: 5 punkter längs den konkava underkanten
          // Rak överkant (yttre punkter på samma höjd), konkav kurva i underkanten (mitten lägre)
          const upperBaseY = centerY - verticalGap;
          for (let i = 0; i < 5; i++) {
            const normalizedX = (i - 2) / 2; // -1, -0.5, 0, 0.5, 1
            const x = centerX + normalizedX * figureWidth * 0.45;
            // Konkav kurva: yttre punkter (normalizedX = ±1) är på samma höjd (rak överkant)
            // Mitten (normalizedX = 0) är lägre (konkav kurva)
            // Använd kvadratisk funktion för mjuk kurva
            const y = upperBaseY + (1 - normalizedX * normalizedX) * upperCurveDepth;
            finalPositions.push({ x, y });
          }
          
          // Nedre del: 5 punkter längs mustasch-formens överkant  
          // Rak underkant (yttre punkter på samma höjd), spets i mitten (högre)
          const lowerBaseY = centerY + verticalGap;
          for (let i = 0; i < 5; i++) {
            const normalizedX = (i - 2) / 2; // -1, -0.5, 0, 0.5, 1
            const x = centerX + normalizedX * figureWidth * 0.45;
            // Mustasch-form: yttre punkter (normalizedX = ±1) är på samma höjd (rak underkant)
            // Mitten (normalizedX = 0) är högre (spetsen går uppåt)
            // Använd absolutvärde för symmetrisk V-form
            const y = lowerBaseY - Math.abs(normalizedX) * lowerSpikeHeight;
            finalPositions.push({ x, y });
          }
          
          // Ball positions (alla i centrum med liten offset för visuell effekt)
          const ballPositions: Array<{x: number, y: number}> = [];
          const ballRadius = 8;
          for (let i = 0; i < numDots; i++) {
            const angle = (i / numDots) * Math.PI * 2;
            ballPositions.push({
              x: centerX + Math.cos(angle) * ballRadius,
              y: centerY + Math.sin(angle) * ballRadius
            });
          }
          
          // Statisk position - alltid använd initialPositions (cirkulär formation)
          const getInterpolatedPosition = (index: number): {x: number, y: number} => {
            return initialPositions[index];
          };
          
          // Använd första 10 kompetenserna för animationen
          const baseCompetences = [
            { 
              id: 1, 
              name: "Product Strategy", 
              x: centerX - networkWidth * 0.3, 
              y: centerY - networkHeight * 0.4, 
              type: "strategy",
              status: "active",
              connections: [2, 3, 4],
              color: [0, 0, 0],
              description: "Product strategy and roadmap development",
              details: "Development of product strategies, roadmap planning, market analysis and competitor analysis."
            },
            { 
              id: 2, 
              name: "API Design", 
              x: centerX + networkWidth * 0.1, 
              y: centerY - networkHeight * 0.3, 
              type: "technical",
              status: "active",
              connections: [1, 5, 6, 7],
              color: [0, 0, 0],
              description: "API-first design and integration",
              details: "Understands how APIs structure data and connect systems. Can design endpoint logic, collaborate on RESTful architecture, and ensure smooth communication between backend and frontend through clear structure and documentation."
            },
            { 
              id: 3, 
              name: "UX/UI Design", 
              x: centerX - networkWidth * 0.45, 
              y: centerY + networkHeight * 0.1, 
              type: "design",
              status: "active",
              connections: [1, 2, 8],
              color: [0, 0, 0],
              description: "User-centered design",
              details: "UX research, wireframing, prototyping, design systems. +20% traffic improvement for Style Scandinavia."
            },
            { 
              id: 4, 
              name: "SEO & Accessibility", 
              x: centerX - networkWidth * 0.2, 
              y: centerY + networkHeight * 0.35,
              type: "optimization",
              status: "active",
              connections: [1, 2, 9],
              color: [0, 0, 0],
              description: "SEO and performance optimization",
              details: "Technical SEO, performance optimization, WCAG compliance. +20% traffic first week for Style Scandinavia."
            },
            { 
              id: 5, 
              name: "Data Analysis", 
              x: centerX + networkWidth * 0.3, 
              y: centerY - networkHeight * 0.1, 
              type: "analytics",
              status: "active",
              connections: [2, 10],
              color: [0, 0, 0],
              description: "Data analysis and insights",
              details: "Data-driven decision making, KPI analysis, dashboard design."
            },
            { 
              id: 6, 
              name: "AI", 
              x: centerX + networkWidth * 0.4, 
              y: centerY + networkHeight * 0.1, 
              type: "technical",
              status: "active",
              connections: [2, 11],
              color: [0, 0, 0],
              description: "Applied AI concepts and data-driven logic",
              details: "Understands the fundamentals of machine learning and data modeling. Can define logical flows, interpret AI-driven insights, and apply data-driven thinking to enhance products and decision-making processes."
            },
            { 
              id: 7, 
              name: "Product Strategy", 
              x: centerX - networkWidth * 0.1, 
              y: centerY + networkHeight * 0.45, 
              type: "technical",
              status: "active",
              connections: [2, 12],
              color: [0, 0, 0],
              description: "System architecture and scalability",
              details: "Microservices, event-driven architecture, API Gateway. Scalable system design."
            },
            { 
              id: 8, 
              name: "Database Design", 
              x: centerX - networkWidth * 0.5, 
              y: centerY - networkHeight * 0.1, 
              type: "technical",
              status: "active",
              connections: [3, 5, 10],
              color: [0, 0, 0],
              description: "Data modeling and structured systems",
              details: "Understands how databases organize, store, and relate data. Can plan data models, identify relationships between entities, and contribute to efficient and scalable data structures for analytical or operational use."
            },
            { 
              id: 9, 
              name: "Frontend Development", 
              x: centerX + networkWidth * 0.1, 
              y: centerY + networkHeight * 0.4, 
              type: "technical",
              status: "active",
              connections: [4, 5, 6],
              color: [0, 0, 0],
              description: "Modern frontend development",
              details: "React, TypeScript, responsive design."
            },
            { 
              id: 10, 
              name: "Project Management", 
              x: centerX + networkWidth * 0.35, 
              y: centerY + networkHeight * 0.4, 
              type: "management",
              status: "active",
              connections: [5, 6, 7],
              color: [0, 0, 0],
              description: "Project management and coordination",
              details: "Agile methodology, stakeholder management, roadmap execution."
            },
            { 
              id: 11, 
              name: "Business Development", 
              x: centerX + networkWidth * 0.45, 
              y: centerY - networkHeight * 0.2, 
              type: "business",
              status: "active",
              connections: [1, 6],
              color: [0, 0, 0],
              description: "Business development and strategy",
              details: "Market analysis, business models, partnerships and B2B/B2C strategy."
            },
            { 
              id: 12, 
              name: "Technical Writing", 
              x: centerX - networkWidth * 0.35, 
              y: centerY + networkHeight * 0.5, 
              type: "communication",
              status: "active",
              connections: [7, 8, 9, 10],
              color: [0, 0, 0],
              description: "Technical communication and clarity",
              details: "Able to translate complex systems into clear and accessible documentation. Skilled in writing structured technical explanations, process overviews, and developer-oriented materials in a concise and readable form."
            }
          ];
          
          // Returnera första 10 kompetenserna med interpolerade positioner
          return baseCompetences.slice(0, numDots).map((competence, index) => {
            const interpolatedPos = getInterpolatedPosition(index);
            return {
              ...competence,
              x: interpolatedPos.x,
              y: interpolatedPos.y
            };
          });
        };

        p.setup = () => {
          // Använd exakt container-storlek för canvas
          const canvas = p.createCanvas(responsiveWidth, responsiveHeight);
          canvas.parent(canvasRef.current!);
          
          // Viktigt: Sätt explicit storlek och centrera canvas-elementet
          canvas.elt.style.width = responsiveWidth + 'px';
          canvas.elt.style.height = responsiveHeight + 'px';
          canvas.elt.style.display = 'block';
          canvas.elt.style.margin = '0 auto';
          canvas.elt.style.maxWidth = '100%';
          canvas.elt.style.boxSizing = 'border-box';
          canvas.elt.style.position = 'relative';
          
          // Allow touch events to pass through on mobile for scrolling
          if (window.innerWidth < 768) {
            canvas.elt.style.pointerEvents = 'none';
          }
          p.pixelDensity(2);
          p.textFont('Inter, sans-serif');
          p.frameRate(30);
          
          // Beräkna initial center position - centrera perfekt på alla skärmar
          centerX = Math.floor(p.width / 2); // Centrera horisontellt på alla skärmar
          centerY = Math.floor(p.height / 2); // Centrera vertikalt på alla skärmar
          
          // Debug logging (kan tas bort senare)
          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            console.log('CompetenceMap setup (mobile):', {
              canvasWidth: p.width,
              canvasHeight: p.height,
              centerX,
              centerY,
              viewportWidth: window.innerWidth,
              containerWidth: containerRef.current?.offsetWidth
            });
          }
          
          // Animation state är inte längre aktiv (statisk formation)
        };

        p.draw = () => {
          // Beräkna center dynamiskt vid resize - centrera perfekt på alla skärmar
          centerX = Math.floor(p.width / 2); // Centrera horisontellt på alla skärmar
          centerY = Math.floor(p.height / 2); // Centrera vertikalt på alla skärmar
          
          // Uppdatera animation timer
          animationTime += 0.016; // ~60fps (1/60 ≈ 0.016)
          
          // Sammanhållen system-bakgrund med subtil gradient
          p.background(252, 253, 255); // Mycket ljus blå-grå för sammanhållen känsla
          
          // Smart zoom: bara på mobil (skärmbredd < 768px)
          const isMobile = p.width < 768;
          
          if (isMobile) {
            // Mobil: zoom in på central del
            const baseWidth = 1200;
            const baseHeight = 800;
            const scaleX = responsiveWidth / baseWidth;
            const scaleY = responsiveHeight / baseHeight;
            const scale = Math.max(scaleX, scaleY);
            
            // Spara transformation state
            p.push();
            
            // Skala och positionera för zoom-effekt
            p.translate(responsiveWidth / 2, responsiveHeight / 2);
            p.scale(scale);
            p.translate(-baseWidth / 2, -baseHeight / 2);
            
            // Rita connections
            drawConnections(p);
            
            // Rita kompetenser
            drawCompetences(p);
            
            // Återställ transformation
            p.pop();
          } else {
            // Desktop: visa hela figuren som vanligt
            // Rita connections
            drawConnections(p);
            
            // Rita kompetenser
            drawCompetences(p);
          }
          
          
          // Rita popup för vald kompetens (EFTER allt annat för att vara framför)
          if (selectedCompetence !== -1) {
            const competences = getCompetences();
            const selectedComp = competences[selectedCompetence];
            if (selectedComp) {
              drawCompetencePopup(p, selectedComp);
            }
          }
        };

        // drawGrid funktionen är inte längre i bruk (grid är borttaget för renare design)

        const drawConnections = (p: any) => {
          // Visa connections alltid (statisk formation)
          
          const competences = getCompetences();
          competences.forEach(competence => {
            competence.connections.forEach(connectionId => {
              const targetCompetence = competences.find(c => c.id === connectionId);
              if (targetCompetence) {
                const x1 = competence.x;
                const y1 = competence.y;
                const x2 = targetCompetence.x;
                const y2 = targetCompetence.y;
                
                // Djup-baserad connection-stil
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const connectionStrength = Math.max(0.4, 1 - distance / 250);
                
                // Beräkna djup baserat på nodstorlek (större = närmare)
                const sourceDepth = competence.type === 'CORE' ? 1.0 : competence.type === 'STRATEGY' ? 0.7 : 0.4;
                const targetDepth = targetCompetence.type === 'CORE' ? 1.0 : targetCompetence.type === 'STRATEGY' ? 0.7 : 0.4;
                const avgDepth = (sourceDepth + targetDepth) / 2;
                
                // Djup-baserad färg och tjocklek - ökat tjocklek för bättre synlighet
                const depthColor = 120 + (avgDepth * 40); // Mörkare för närmare noder
                const depthAlpha = (connectionStrength * 80) + (avgDepth * 40); // Mer ifylld för närmare
                const depthWeight = (connectionStrength * 1.5) + (avgDepth * 1.0) + 0.3; // Ökat från 1.2/0.8/0.2
                
                p.stroke(depthColor, depthColor + 10, depthColor + 20, depthAlpha);
                p.strokeWeight(depthWeight);
                p.line(x1, y1, x2, y2);
                
                // Djup-baserad accent för nära, starka connections
                if (avgDepth > 0.6 && connectionStrength > 0.7) {
                  p.stroke(60, 70, 80, 25);
                  p.strokeWeight(depthWeight * 0.6);
                  p.line(x1, y1, x2, y2);
                }
              }
            });
          });
        };

        const drawCompetences = (p: any) => {
          const competences = getCompetences();
          competences.forEach((competence, index) => {
            const isHovered = hoveredCompetence === index;
            const isSelected = selectedCompetence === index;
            // Rita kompetens (statisk formation, ingen animation)
            drawCompetence(p, competence, isHovered, isSelected);
          });
        };

        const drawCompetence = (p: any, competence: any, isHovered: boolean, isSelected: boolean) => {
          p.push();
          
          // Statisk position - ingen floating
          const depth = competence.type === 'CORE' ? 1.0 : competence.type === 'STRATEGY' ? 0.7 : 0.4;
          const floatX = 0;
          const floatY = 0;
          
          p.translate(competence.x + floatX, competence.y + floatY);
          
          // Djup-baserad noddesign - ökat storlek för större synlighet
          const nodeSize = competence.type === 'CORE' ? 28 : competence.type === 'STRATEGY' ? 22 : 18;
          const depthColor = competence.type === 'CORE' ? [30, 40, 50] : 
                           competence.type === 'STRATEGY' ? [60, 70, 80] : [90, 100, 110];
          
          // Djup-baserad skugga för 3D-effekt
          p.fill(0, 0, 0, 20 * depth);
          p.noStroke();
          p.ellipse(2, 2, nodeSize * 0.8, nodeSize * 0.8);
          
          // Djup-baserad aura (starkare för närmare noder)
          if (competence.type === 'CORE' || competence.id === 1) {
            const auraSize = nodeSize + 8 + Math.sin(animationTime * 3) * 4;
            const auraAlpha = (15 + Math.sin(animationTime * 3) * 10) * depth;
            p.fill(depthColor[0], depthColor[1], depthColor[2], auraAlpha);
            p.noStroke();
            p.ellipse(0, 0, auraSize, auraSize);
          }
          
          // Djup-baserad navigation-puls
          if (competence.id === 1) {
            const navPulseSize = 24 + Math.sin(animationTime * 5) * 8;
            const navPulseAlpha = (40 + Math.sin(animationTime * 5) * 25) * depth;
            
            p.fill(20, 30, 40, navPulseAlpha);
            p.noStroke();
            p.ellipse(0, 0, navPulseSize, navPulseSize);
          }
          
          // Djup-baserad hover-effekt
          if (isHovered && competence.id !== 1) {
            const pulseSize = nodeSize + 6 + Math.sin(animationTime * 7) * 6;
            const pulseAlpha = (35 + Math.sin(animationTime * 7) * 20) * depth;
            
            p.fill(depthColor[0], depthColor[1], depthColor[2], pulseAlpha);
            p.noStroke();
            p.ellipse(0, 0, pulseSize, pulseSize);
          }
          
          // Djup-baserad huvudnod med gradient-effekt
          p.fill(depthColor[0], depthColor[1], depthColor[2]);
          p.noStroke();
          p.ellipse(0, 0, nodeSize, nodeSize);
          
          // Djup-baserad selection-ring
          if (isSelected) {
            p.stroke(40, 50, 60, 200 * depth);
            p.strokeWeight(2 * depth);
            p.noFill();
            p.ellipse(0, 0, nodeSize + 8, nodeSize + 8);
            
            // Djup-baserad accent-ring
            p.stroke(50, 60, 70, 40 * depth);
            p.strokeWeight(1);
            p.ellipse(0, 0, nodeSize + 16, nodeSize + 16);
          }
          
          // Djup-baserad status-indikator
          if (competence.status === 'ACTIVE') {
            p.fill(35, 115, 75, 200 * depth);
            p.noStroke();
            p.ellipse(nodeSize/2 - 1.5, -nodeSize/2 + 1.5, 5 * depth, 5 * depth);
          }
          
          p.pop();
        };

        const drawCompetencePopup = (p: any, competence: any) => {
          if (selectedCompetence === -1) return;
          
          const popupWidth = 300;
          const popupHeight = 180;
          const padding = 16;
          
          // Positionera popup nära kompetensen, men håll den inom skärmen
          let popupX = competence.x + 50;
          let popupY = competence.y - 90;
          
          // Justera position om popup går utanför skärmen
          if (popupX + popupWidth > responsiveWidth) {
            popupX = competence.x - popupWidth - 50;
          }
          if (popupY < 0) {
            popupY = competence.y + 50;
          }
          
          // Animerad popup med easing
          const popupProgress = Math.min((animationTime - selectedCompetence * 0.1) * 4, 1);
          const easedPopupProgress = 1 - Math.pow(1 - popupProgress, 3);
          
          p.push();
          p.translate(popupX, popupY);
          p.scale(easedPopupProgress);
          
          // Popup-skugga
          p.noStroke();
          p.fill(0, 0, 0, 8);
          p.rect(4, 4, popupWidth, popupHeight, 12);
          
          // Popup-bakgrund
          p.fill(255, 255, 255);
          p.stroke(220, 220, 220);
          p.strokeWeight(1);
          p.rect(0, 0, popupWidth, popupHeight, 12);
          
          // Kompetens-namn (vänsterställd)
          p.fill(0, 0, 0);
          p.textAlign(p.LEFT);
          p.textSize(16);
          p.textStyle(p.BOLD);
          p.text(competence.name, padding, padding + 16);
          
          // Typ-badge (vänsterställd)
          p.fill(100, 100, 100);
          p.textSize(9);
          p.textStyle(p.NORMAL);
          p.text(competence.type.toUpperCase(), padding, padding + 30);
          
          // Divider line
          p.stroke(240, 240, 240);
          p.strokeWeight(1);
          p.line(padding, padding + 40, popupWidth - padding, padding + 40);
          
          // Beskrivning (vänsterställd)
          p.fill(0, 0, 0);
          p.textSize(12);
          p.textStyle(p.NORMAL);
          p.text(competence.description, padding, padding + 60, popupWidth - (padding * 2));
          
          // Detaljer (vänsterställd, kompaktare)
          p.fill(80, 80, 80);
          p.textSize(10);
          const details = competence.details.length > 100 ? competence.details.substring(0, 100) + "..." : competence.details;
          p.text(details, padding, padding + 90, popupWidth - (padding * 2), 40);
          
          // Status section (vänsterställd, kompakt)
          p.fill(0, 0, 0);
          p.textSize(9);
          p.text(`Status: ${competence.status.toUpperCase()}`, padding, popupHeight - padding - 8);
          
          // Status indicator
          p.fill(34, 197, 94);
          p.noStroke();
          p.ellipse(padding - 6, popupHeight - padding - 8, 4, 4);
          
          // Experience indicator (högerställd)
          p.fill(100, 100, 100);
          p.textAlign(p.RIGHT);
          p.textSize(8);
          p.text("Experience", popupWidth - padding, popupHeight - padding - 8);
          
          p.pop();
        };


        p.mouseMoved = () => {
          let newHoveredCompetence = -1;
          const competences = getCompetences();
          
          competences.forEach((competence, index) => {
            const distance = p.dist(p.mouseX, p.mouseY, competence.x, competence.y);
            if (distance < 30) {
              newHoveredCompetence = index;
            }
          });
          
          if (newHoveredCompetence !== hoveredCompetence) {
            hoveredCompetence = newHoveredCompetence;
          }
        };

        p.mousePressed = () => {
          let clickedCompetence = -1;
          const competences = getCompetences();
          
          competences.forEach((competence, index) => {
            const distance = p.dist(p.mouseX, p.mouseY, competence.x, competence.y);
            if (distance < 30) {
              clickedCompetence = index;
            }
          });
          
          if (clickedCompetence !== -1) {
            // Om samma kompetens klickas igen, stäng popup
            if (selectedCompetence === clickedCompetence) {
              selectedCompetence = -1;
            } else {
              // Annars visa popup för ny kompetens
              selectedCompetence = clickedCompetence;
              const competence = competences[clickedCompetence];
              console.log(`Selected: ${competence.name} (${competence.type}) - ${competence.description}`);
            }
          } else {
            // Klicka utanför stänger popup
            selectedCompetence = -1;
          }
        };
      };

      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
      p5Ref.current = new p5Instance(sketch, canvasRef.current!);
      
      // Hantera resize för denna sektion
      const handleResize = () => {
        if (p5Ref.current && containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;
          
          if (containerWidth === 0 || containerHeight === 0) {
            return;
          }
          
          const isMobile = window.innerWidth < 768;
          
          let finalWidth = containerWidth;
          let finalHeight = containerHeight;
          
          if (isMobile) {
            // På mobil: begränsa till viewport minus padding
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            finalWidth = Math.min(containerWidth, Math.max(280, viewportWidth - 32));
          }
          
          p5Ref.current.resizeCanvas(finalWidth, finalHeight);
          // Uppdatera även CSS-storleken för att säkerställa att canvas-elementet matchar
          if (p5Ref.current.canvas) {
            p5Ref.current.canvas.style.width = finalWidth + 'px';
            p5Ref.current.canvas.style.height = finalHeight + 'px';
            p5Ref.current.canvas.style.display = 'block';
            p5Ref.current.canvas.style.margin = '0 auto';
            p5Ref.current.canvas.style.maxWidth = '100%';
          }
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    loadP5();

  }, [width, height]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    >
      <div 
        ref={canvasRef}
        className="flex justify-center items-center"
        style={{ 
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
};

export default CompetenceMap;
