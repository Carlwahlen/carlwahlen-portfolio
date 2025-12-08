import React, { useEffect, useRef } from 'react';

interface HellmanPartnersVisualizationProps {
  width?: number;
  height?: number;
}

const HellmanPartnersVisualization: React.FC<HellmanPartnersVisualizationProps> = ({ 
  width = 800, 
  height = 500 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadP5 = async () => {
      const p5Instance = (await import('p5')).default;
      
      // Responsiv storlek baserat på container
      const getResponsiveSize = () => {
        if (!containerRef.current) return { width, height };
        
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        // Anpassa till container men behåll aspect ratio
        const aspectRatio = width / height;
        let responsiveWidth = Math.min(containerWidth, width);
        let responsiveHeight = responsiveWidth / aspectRatio;
        
        // Om höjden blir för stor, anpassa efter höjden istället
        if (responsiveHeight > containerHeight) {
          responsiveHeight = Math.min(containerHeight, height);
          responsiveWidth = responsiveHeight * aspectRatio;
        }
        
        // För mobiler, se till att vi har tillräckligt med utrymme
        const isMobile = window.innerWidth < 768;
        const minWidth = isMobile ? 280 : 300;
        const minHeight = isMobile ? 180 : 200;
        
        return { 
          width: Math.max(minWidth, responsiveWidth),
          height: Math.max(minHeight, responsiveHeight)
        };
      };
      
      const { width: responsiveWidth, height: responsiveHeight } = getResponsiveSize();
      
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }

      // Fiktiv data för Hellman & Partners - baserat på verkliga konceptet (mer utspridda och flyttade ner)
      const properties = [
        { 
          id: 1, 
          name: "Östermalm", 
          x: 120, 
          y: 170, 
          price: 12500000, 
          size: 85, 
          rooms: 3, 
          safetyIndex: 9.2, 
          status: "active",
          type: "lägenhet",
          area: "Östermalm"
        },
        { 
          id: 2, 
          name: "Södermalm", 
          x: 350, 
          y: 250, 
          price: 8500000, 
          size: 65, 
          rooms: 2, 
          safetyIndex: 8.7, 
          status: "active",
          type: "lägenhet",
          area: "Södermalm"
        },
        { 
          id: 3, 
          name: "Vasastan", 
          x: 580, 
          y: 190, 
          price: 11200000, 
          size: 78, 
          rooms: 3, 
          safetyIndex: 9.0, 
          status: "active",
          type: "lägenhet",
          area: "Vasastan"
        },
        { 
          id: 4, 
          name: "Kungsholmen", 
          x: 180, 
          y: 390, 
          price: 9500000, 
          size: 72, 
          rooms: 2, 
          safetyIndex: 8.5, 
          status: "pending",
          type: "lägenhet",
          area: "Kungsholmen"
        },
        { 
          id: 5, 
          name: "Stureplan", 
          x: 450, 
          y: 130, 
          price: 18500000, 
          size: 95, 
          rooms: 4, 
          safetyIndex: 9.5, 
          status: "active",
          type: "lägenhet",
          area: "Stureplan"
        },
        { 
          id: 6, 
          name: "Hötorget", 
          x: 650, 
          y: 350, 
          price: 7800000, 
          size: 68, 
          rooms: 2, 
          safetyIndex: 8.3, 
          status: "active",
          type: "lägenhet",
          area: "Hötorget"
        }
      ];

      // Hellman & Partners insights baserat på verkliga konceptet
      const hellmanPartnersInsights = {
        marketTrend: "+12%",
        safetyImportance: "74%",
        safetyIncrease: "+68%",
        decisionProcess: "5 steg vs 6 steg",
        costSavings: "8.5%",
        aiMatches: 23,
        areaAnalysis: "Aktiv"
      };

      // Premium färgpalett för Hellman & Partners
      const colors = {
        background: [248, 250, 252], // #F8FAFC
        primary: [11, 18, 32], // #0B1220
        secondary: [107, 114, 128], // #64748B
        accent: [16, 185, 129], // #10B981
        warning: [245, 158, 11], // #F59E0B
        danger: [239, 68, 68], // #EF4444
        success: [34, 197, 94], // #22C55E
        building: [255, 255, 255], // #FFFFFF
        shadow: [15, 23, 42, 0.08],
        grid: [226, 232, 240] // #E2E8F0
      };

      let animationTime = 0;
      let hoveredBuilding = -1;
      let selectedBuilding = -1;

      const sketch = (p: any) => {
        p.setup = () => {
          p.createCanvas(responsiveWidth, responsiveHeight).parent(canvasRef.current!);
          p.frameRate(30);
        };

        p.draw = () => {
          // Premium bakgrund
          p.background(colors.background);
          
          // Rita grid
          drawGrid(p);
          
          // Rita fastigheter
          drawProperties(p);
          
          // Rita data flows
          drawDataFlows(p);
          
          // Rita Hellman & Partners insights
          drawHellmanPartnersInsights(p);
          
          // Uppdatera animation timer
          animationTime += 0.02;
        };

        const drawGrid = (p: any) => {
          p.stroke(colors.grid);
          p.strokeWeight(0.5);
          
          // Responsiv grid-storlek
          const gridSize = Math.max(30, Math.min(50, responsiveWidth / 16));
          
          // Vertikala linjer
          for (let x = 0; x <= responsiveWidth; x += gridSize) {
            p.line(x, 0, x, responsiveHeight);
          }
          
          // Horisontella linjer
          for (let y = 0; y <= responsiveHeight; y += gridSize) {
            p.line(0, y, responsiveWidth, y);
          }
        };

        const drawProperties = (p: any) => {
          properties.forEach((property, index) => {
            const isHovered = hoveredBuilding === index;
            const isSelected = selectedBuilding === index;
            const animationProgress = Math.min((animationTime - index * 0.1) * 2, 1);
            
            if (animationProgress > 0) {
              drawProperty(p, property, isHovered, isSelected, animationProgress);
            }
          });
        };

        const drawProperty = (p: any, property: any, isHovered: boolean, isSelected: boolean, animationProgress: number) => {
          p.push();
          
          // Responsiv skalning av fastigheter
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          const responsivePropertyX = property.x * scaleFactor;
          const responsivePropertyY = property.y * scaleFactor;
          
          // Animation easing
          const easedProgress = 1 - Math.pow(1 - animationProgress, 3);
          
          // Hover/selection effects
          const scale = isHovered ? 1.05 : 1.0;
          const shadowIntensity = isHovered ? 0.15 : 0.08;
          const glowIntensity = isSelected ? 0.3 : 0.0;
          
          // Pulse effect för aktiva fastigheter
          const pulse = property.status === "active" ? Math.sin(animationTime * 2 + property.x * 0.01) * 0.02 : 0;
          const finalScale = scale + pulse;
          
          p.translate(responsivePropertyX, responsivePropertyY);
          p.scale(finalScale * easedProgress * scaleFactor);
          
          // Fastighetsskugga
          p.noStroke();
          p.fill(colors.shadow[0], colors.shadow[1], colors.shadow[2], shadowIntensity * 100);
          p.rect(-50, -70, 100, 140, 8, 1, 1, 1);
          
          // Huvudfastighet
          p.fill(colors.building);
          p.stroke(colors.grid);
          p.strokeWeight(0.5);
          p.rect(-48, -68, 96, 136, 6);
          
          // Glow effect för selected
          if (isSelected) {
            p.fill(colors.accent[0], colors.accent[1], colors.accent[2], glowIntensity * 80);
            p.rect(-48, -68, 96, 136, 6);
          }
          
          // Fastighetsnamn
          p.fill(colors.primary);
          p.textAlign(p.CENTER);
          p.textSize(11);
          p.textStyle(p.BOLD);
          p.text(property.name, 0, -50);
          
          // Status indicator
          const statusColor = property.status === "active" ? colors.success : colors.warning;
          p.fill(statusColor);
          p.noStroke();
          p.ellipse(-30, -35, 6, 6);
          
          // Pris data
          p.fill(colors.primary);
          p.textSize(9);
          p.textStyle(p.BOLD);
          p.text(`${(property.price / 1000000).toFixed(1)}M kr`, 0, -25);
          
          // Område data
          p.fill(colors.secondary);
          p.textSize(8);
          p.textStyle(p.NORMAL);
          p.text(`${property.size}m² • ${property.rooms} rum`, 0, -15);
          
          // Trygghetsindex (från bilderna) - bara för aktiva fastigheter
          if (property.status === "active") {
            p.fill(colors.accent);
            p.textSize(9);
            p.textStyle(p.BOLD);
            p.text(`Trygghet: ${property.safetyIndex}`, 0, -5);
          }
          
          // AI Match indicator (från Hellman & Partners-konceptet)
          if (property.status === "active") {
            p.fill(colors.accent[0], colors.accent[1], colors.accent[2], 100);
            p.rect(-35, 10, 70, 12, 6);
            
            // Animerad AI match
            const matchProgress = (animationTime * 2 + property.x * 0.01) % 1;
            p.fill(colors.building);
            p.rect(-35 + matchProgress * 70, 10, 12, 12, 6);
            
            p.fill(colors.accent);
            p.textSize(8);
            p.text("AI Match", 0, 20);
          }
          
          p.pop();
        };

        const drawDataFlows = (p: any) => {
          // Rita data flows mellan fastigheter (ingen linje, långsammare rörelse)
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          
          for (let i = 0; i < properties.length; i++) {
            for (let j = i + 1; j < properties.length; j++) {
              if (properties[i].status === "active" && properties[j].status === "active") {
                const x1 = properties[i].x * scaleFactor;
                const y1 = properties[i].y * scaleFactor;
                const x2 = properties[j].x * scaleFactor;
                const y2 = properties[j].y * scaleFactor;
                
                const distance = p.dist(x1, y1, x2, y2);
                if (distance < 200 * scaleFactor) {
                  // Animerad data flow fram och tillbaka (långsammare)
                  // Använd både i och j för mer varierad timing
                  const flowProgress = (animationTime * 0.5 + (i + j) * 0.15) % 1;
                  
                  // Beräkna position baserat på fram och tillbaka-rörelse
                  let flowX, flowY;
                  if (flowProgress < 0.5) {
                    // Framåt (från i till j)
                    const forwardProgress = flowProgress * 2;
                    flowX = p.lerp(x1, x2, forwardProgress);
                    flowY = p.lerp(y1, y2, forwardProgress);
                  } else {
                    // Tillbaka (från j till i)
                    const backwardProgress = (flowProgress - 0.5) * 2;
                    flowX = p.lerp(x2, x1, backwardProgress);
                    flowY = p.lerp(y2, y1, backwardProgress);
                  }
                  
                  p.fill(colors.accent);
                  p.noStroke();
                  p.ellipse(flowX, flowY, 4, 4);
                }
              }
            }
          }
          
          // Lägg till extra dataflöde mellan Södermalm (index 1) och Östermalm (index 0)
          const sodermalmIndex = 1;
          const ostermalmIndex = 0;
          if (properties[sodermalmIndex] && properties[sodermalmIndex].status === "active" && 
              properties[ostermalmIndex] && properties[ostermalmIndex].status === "active") {
            
            const x1 = properties[sodermalmIndex].x * scaleFactor;
            const y1 = properties[sodermalmIndex].y * scaleFactor;
            const x2 = properties[ostermalmIndex].x * scaleFactor;
            const y2 = properties[ostermalmIndex].y * scaleFactor;
            
            // Extra dataflöde mellan Södermalm och Östermalm (samma hastighet som andra)
            const extraFlowProgress = (animationTime * 0.5 + 0.5) % 1;
            
            let flowX, flowY;
            if (extraFlowProgress < 0.5) {
              // Framåt (från Södermalm till Östermalm)
              const forwardProgress = extraFlowProgress * 2;
              flowX = p.lerp(x1, x2, forwardProgress);
              flowY = p.lerp(y1, y2, forwardProgress);
            } else {
              // Tillbaka (från Östermalm till Södermalm)
              const backwardProgress = (extraFlowProgress - 0.5) * 2;
              flowX = p.lerp(x2, x1, backwardProgress);
              flowY = p.lerp(y2, y1, backwardProgress);
            }
            
            p.fill(colors.accent);
            p.noStroke();
            p.ellipse(flowX, flowY, 4, 4);
          }
        };

        const drawHellmanPartnersInsights = (p: any) => {
          const panelPadding = 10;
          const liveCircleDiameter = 6; // Diameter of the green circle
          
          // --- Measure "Hellman & Partners Insights" text ---
          p.textSize(12);
          p.textStyle(p.BOLD);
          const insightsTextWidth = p.textWidth("Hellman & Partners Insights");
          const insightsTextAscent = p.textAscent();
          const insightsTextDescent = p.textDescent();
          
          // --- Measure "LIVE" text ---
          p.textSize(8);
          p.textStyle(p.NORMAL);
          const liveTextWidth = p.textWidth("LIVE");
          const liveTextAscent = p.textAscent();
          const liveTextDescent = p.textDescent();
          
          // --- Define content positions (relative to canvas) ---
          // These are the desired positions for the content elements
          const insightsX = responsiveWidth - 210;
          const insightsY = 80; // Baseline for "Hellman & Partners Insights" (flyttad ner)
          
          const liveX = responsiveWidth - 50;
          const liveY = 80; // Baseline for "LIVE" (flyttad ner)
          
          const circleCenterX = responsiveWidth - 30;
          const circleCenterY = 75; // Center for green circle (flyttad ner)
          
          // --- Calculate bounding box of all content ---
          // X-coordinates
          const minContentX = insightsX;
          const maxContentX = circleCenterX + (liveCircleDiameter / 2); // Rightmost edge of the circle
          
          // Y-coordinates (top edge)
          const insightsTopY = insightsY - insightsTextAscent;
          const liveTopY = liveY - liveTextAscent;
          const circleTopY = circleCenterY - (liveCircleDiameter / 2);
          
          const minOverallContentY = Math.min(insightsTopY, liveTopY, circleTopY);
          
          // Y-coordinates (bottom edge)
          const insightsBottomY = insightsY + insightsTextDescent;
          const liveBottomY = liveY + liveTextDescent;
          const circleBottomY = circleCenterY + (liveCircleDiameter / 2);
          
          const maxOverallContentY = Math.max(insightsBottomY, liveBottomY, circleBottomY);
          
          // --- Calculate panel dimensions ---
          const contentWidth = maxContentX - minContentX;
          const contentHeight = maxOverallContentY - minOverallContentY;
          
          const panelWidth = contentWidth + panelPadding * 2;
          const panelHeight = contentHeight + panelPadding * 2;
          
          // --- Calculate panel position ---
          const panelX = minContentX - panelPadding;
          const panelY = minOverallContentY - panelPadding;
          
          // --- Draw Hellman & Partners insights panel (adapted size) ---
          p.fill(colors.building);
          p.stroke(colors.grid);
          p.strokeWeight(0.5);
          p.rect(panelX, panelY, panelWidth, panelHeight, 8); // Rounded corners with radius 8
          
          // --- Draw content (using original positions, which are now relative to the canvas) ---
          // Hellman & Partners insights text
          p.fill(colors.primary);
          p.textAlign(p.LEFT);
          p.textSize(12);
          p.textStyle(p.BOLD);
          p.text("Hellman & Partners Insights", insightsX, insightsY);
          
          // Real-time indicator
          p.fill(colors.secondary);
          p.textSize(8);
          p.text("LIVE", liveX, liveY);
          
          // Grön cirkel till höger, på höjd med toppen av LIVE-texten
          p.fill(colors.success);
          p.ellipse(circleCenterX, circleCenterY, liveCircleDiameter, liveCircleDiameter);
        };

        p.mouseMoved = () => {
          // Kontrollera hover på fastigheter
          let newHoveredBuilding = -1;
          
          properties.forEach((property, index) => {
            const distance = p.dist(p.mouseX, p.mouseY, property.x, property.y);
            if (distance < 60) {
              newHoveredBuilding = index;
            }
          });
          
          if (newHoveredBuilding !== hoveredBuilding) {
            hoveredBuilding = newHoveredBuilding;
          }
        };

        p.mousePressed = () => {
          // Kontrollera klick på fastigheter
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          properties.forEach((property, index) => {
            const responsivePropertyX = property.x * scaleFactor;
            const responsivePropertyY = property.y * scaleFactor;
            const distance = p.dist(p.mouseX, p.mouseY, responsivePropertyX, responsivePropertyY);
            if (distance < 60 * scaleFactor) {
              selectedBuilding = index;
              console.log(`Selected: ${property.name} - Pris: ${(property.price / 1000000).toFixed(1)}M kr - Trygghet: ${property.safetyIndex} - Område: ${property.area}`);
              
              // Navigera till case-sidan när man klickar på en fastighet
              window.location.href = '/#/case';
            }
          });
        };
      };

      p5Ref.current = new p5Instance(sketch, canvasRef.current!);
    };

    loadP5();

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [width, height]);

  // Lyssnar på resize-events för att uppdatera canvas-storleken dynamiskt
  useEffect(() => {
    const handleResize = () => {
      if (p5Ref.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        const aspectRatio = width / height;
        let responsiveWidth = Math.min(containerWidth, width);
        let responsiveHeight = responsiveWidth / aspectRatio;
        
        if (responsiveHeight > containerHeight) {
          responsiveHeight = Math.min(containerHeight, height);
          responsiveWidth = responsiveHeight * aspectRatio;
        }
        
        const isMobile = window.innerWidth < 768;
        const minWidth = isMobile ? 280 : 300;
        const minHeight = isMobile ? 180 : 200;
        
        const finalWidth = Math.max(minWidth, responsiveWidth);
        const finalHeight = Math.max(minHeight, responsiveHeight);
        
        p5Ref.current.resizeCanvas(finalWidth, finalHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-2xl shadow-elevation"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default HellmanPartnersVisualization;