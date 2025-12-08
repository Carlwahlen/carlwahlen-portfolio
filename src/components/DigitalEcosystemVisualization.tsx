import React, { useEffect, useRef } from 'react';

interface DigitalEcosystemVisualizationProps {
  width?: number;
  height?: number;
}

const DigitalEcosystemVisualization: React.FC<DigitalEcosystemVisualizationProps> = ({ 
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

      // Digitalt ekosystem - komponenter och deras relationer
      const ecosystemComponents = [
        { 
          id: 1, 
          name: "Frontend", 
          x: 150, 
          y: 100, 
          type: "client",
          status: "active",
          connections: [2, 3, 4],
          color: [59, 130, 246], // blue
          description: "React/Next.js"
        },
        { 
          id: 2, 
          name: "API Gateway", 
          x: 400, 
          y: 120, 
          type: "gateway",
          status: "active",
          connections: [1, 5, 6, 7],
          color: [168, 85, 247], // purple
          description: "Kong/AWS"
        },
        { 
          id: 3, 
          name: "Auth Service", 
          x: 100, 
          y: 250, 
          type: "service",
          status: "active",
          connections: [1, 2, 8],
          color: [34, 197, 94], // green
          description: "OAuth/JWT"
        },
        { 
          id: 4, 
          name: "Payment API", 
          x: 300, 
          y: 300, 
          type: "service",
          status: "active",
          connections: [1, 2, 9],
          color: [239, 68, 68], // red
          description: "Stripe/Klarna"
        },
        { 
          id: 5, 
          name: "User Service", 
          x: 500, 
          y: 200, 
          type: "service",
          status: "active",
          connections: [2, 10],
          color: [16, 185, 129], // emerald
          description: "Node.js/Express"
        },
        { 
          id: 6, 
          name: "Analytics", 
          x: 600, 
          y: 350, 
          type: "service",
          status: "active",
          connections: [2, 11],
          color: [245, 158, 11], // orange
          description: "Mixpanel/GA4"
        },
        { 
          id: 7, 
          name: "Notification", 
          x: 200, 
          y: 400, 
          type: "service",
          status: "active",
          connections: [2, 12],
          color: [139, 69, 19], // brown
          description: "SendGrid/Twilio"
        },
        { 
          id: 8, 
          name: "Database", 
          x: 50, 
          y: 350, 
          type: "database",
          status: "active",
          connections: [3, 5, 10],
          color: [75, 85, 99], // gray
          description: "PostgreSQL"
        },
        { 
          id: 9, 
          name: "Cache", 
          x: 350, 
          y: 450, 
          type: "database",
          status: "active",
          connections: [4, 5, 6],
          color: [236, 72, 153], // pink
          description: "Redis"
        },
        { 
          id: 10, 
          name: "Queue", 
          x: 500, 
          y: 450, 
          type: "infrastructure",
          status: "active",
          connections: [5, 6, 7],
          color: [99, 102, 241], // indigo
          description: "RabbitMQ"
        },
        { 
          id: 11, 
          name: "CDN", 
          x: 650, 
          y: 150, 
          type: "infrastructure",
          status: "active",
          connections: [1, 6],
          color: [20, 184, 166], // teal
          description: "CloudFlare"
        },
        { 
          id: 12, 
          name: "Monitoring", 
          x: 100, 
          y: 500, 
          type: "infrastructure",
          status: "active",
          connections: [7, 8, 9, 10],
          color: [220, 38, 127], // rose
          description: "DataDog/NewRelic"
        }
      ];

      // Premium färgpalett för digitalt ekosystem
      const colors = {
        background: [248, 250, 252], // #F8FAFC
        primary: [11, 18, 32], // #0B1220
        secondary: [100, 116, 139], // #64748B
        accent: [37, 99, 235], // #2563EB (blue)
        grid: [226, 232, 240], // #E2E8F0
        card: [255, 255, 255], // #FFFFFF
        shadow: [15, 23, 42], // #0F172A
        success: [34, 197, 94], // #22C55E (green)
        warning: [250, 204, 21], // #FACF15 (yellow)
        connection: [59, 130, 246], // blue
        dataFlow: [34, 197, 94], // green
      };

      const sketch = (p: p5) => {
        let animationTime = 0;
        let hoveredComponent = -1;
        let selectedComponent = -1;

        p.setup = () => {
          p.createCanvas(responsiveWidth, responsiveHeight).parent(canvasRef.current!);
          p.pixelDensity(2);
          p.textFont('Inter, sans-serif');
          p.frameRate(30);
        };

        p.draw = () => {
          p.background(colors.background);
          
          // Rita grid
          drawGrid(p);
          
          // Rita connections
          drawConnections(p);
          
          // Rita komponenter
          drawComponents(p);
          
          // Rita data flows - REMOVED
          // drawDataFlows(p);
          
          // Rita Ecosystem insights
          drawEcosystemInsights(p);
          
          // Rita popup för vald komponent
          if (selectedComponent !== -1) {
            const selectedComp = ecosystemComponents[selectedComponent];
            if (selectedComp) {
              drawComponentPopup(p, selectedComp);
            }
          }
          
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

        const drawConnections = (p: any) => {
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          
          ecosystemComponents.forEach(component => {
            component.connections.forEach(connectionId => {
              const targetComponent = ecosystemComponents.find(c => c.id === connectionId);
              if (targetComponent) {
                const x1 = component.x * scaleFactor;
                const y1 = component.y * scaleFactor;
                const x2 = targetComponent.x * scaleFactor;
                const y2 = targetComponent.y * scaleFactor;
                
                // Animerad connection
                const connectionProgress = (animationTime * 0.3 + component.id * 0.1) % 1;
                const pulseIntensity = Math.sin(connectionProgress * Math.PI * 2) * 0.3 + 0.7;
                
                p.stroke(colors.connection[0], colors.connection[1], colors.connection[2], pulseIntensity * 100);
                p.strokeWeight(1.5 * scaleFactor);
                p.line(x1, y1, x2, y2);
              }
            });
          });
        };

        const drawComponents = (p: any) => {
          ecosystemComponents.forEach((component, index) => {
            const isHovered = hoveredComponent === index;
            const isSelected = selectedComponent === index;
            const animationProgress = Math.min((animationTime - index * 0.05) * 3, 1);
            
            if (animationProgress > 0) {
              drawComponent(p, component, isHovered, isSelected, animationProgress);
            }
          });
        };

        const drawComponent = (p: any, component: any, isHovered: boolean, isSelected: boolean, animationProgress: number) => {
          p.push();
          
          // Responsiv skalning av komponenter
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          const responsiveComponentX = component.x * scaleFactor;
          const responsiveComponentY = component.y * scaleFactor;
          
          // Animation easing
          const easedProgress = 1 - Math.pow(1 - animationProgress, 3);
          
          // Hover/selection effects
          const scale = isHovered ? 1.2 : 1.0;
          const shadowIntensity = isHovered ? 0.3 : 0.1;
          const glowIntensity = isSelected ? 0.5 : 0.0;
          
          // Pulse effect för aktiva komponenter
          const pulse = Math.sin(animationTime * 2 + component.x * 0.01) * 0.05;
          const finalScale = scale + pulse;
          
          p.translate(responsiveComponentX, responsiveComponentY);
          p.scale(finalScale * easedProgress * scaleFactor);
          
          // Bolla-skugga
          p.noStroke();
          p.fill(colors.shadow[0], colors.shadow[1], colors.shadow[2], shadowIntensity * 100);
          p.ellipse(0, 0, 25, 25);
          
          // Huvudbolla
          p.fill(component.color[0], component.color[1], component.color[2]);
          p.stroke(colors.grid);
          p.strokeWeight(0.5);
          p.ellipse(0, 0, 20, 20);
          
          // Glow effect för selected
          if (isSelected) {
            p.fill(component.color[0], component.color[1], component.color[2], glowIntensity * 100);
            p.ellipse(0, 0, 20, 20);
          }
          
          // Status indicator (liten prick)
          const statusColor = component.status === "active" ? colors.success : colors.warning;
          p.fill(statusColor);
          p.noStroke();
          p.ellipse(-6, -6, 3, 3);
          
          p.pop();
        };

        const drawDataFlows = (p: any) => {
          // Rita data flows mellan komponenter
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          
          ecosystemComponents.forEach(component => {
            component.connections.forEach(connectionId => {
              const targetComponent = ecosystemComponents.find(c => c.id === connectionId);
              if (targetComponent) {
                const x1 = component.x * scaleFactor;
                const y1 = component.y * scaleFactor;
                const x2 = targetComponent.x * scaleFactor;
                const y2 = targetComponent.y * scaleFactor;
                
                // Animerad data flow
                const flowProgress = (animationTime * 0.8 + component.id * 0.15) % 1;
                
                // Beräkna position baserat på fram och tillbaka-rörelse
                let flowX, flowY;
                if (flowProgress < 0.5) {
                  // Framåt (från component till target)
                  const forwardProgress = flowProgress * 2;
                  flowX = p.lerp(x1, x2, forwardProgress);
                  flowY = p.lerp(y1, y2, forwardProgress);
                } else {
                  // Tillbaka (från target till component)
                  const backwardProgress = (flowProgress - 0.5) * 2;
                  flowX = p.lerp(x2, x1, backwardProgress);
                  flowY = p.lerp(y2, y1, backwardProgress);
                }
                
                p.fill(colors.dataFlow);
                p.noStroke();
                p.ellipse(flowX, flowY, 4, 4);
              }
            });
          });
        };

        const drawEcosystemInsights = (p: any) => {
          const panelPadding = 10;
          const liveCircleDiameter = 6;
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);

          // Mät textstorlekar
          p.textSize(12 * scaleFactor);
          p.textStyle(p.BOLD);
          const insightsTextWidth = p.textWidth("Digital Ecosystem Insights");
          const insightsTextAscent = p.textAscent();
          const insightsTextDescent = p.textDescent();

          p.textSize(8 * scaleFactor);
          p.textStyle(p.NORMAL);
          const liveTextWidth = p.textWidth("LIVE");
          const liveTextAscent = p.textAscent();
          const liveTextDescent = p.textDescent();

          // Definiera positioner
          const insightsX = responsiveWidth - 280;
          const insightsY = 80;

          const liveX = responsiveWidth - 50;
          const liveY = 80;

          const circleCenterX = responsiveWidth - 30;
          const circleCenterY = 75;

          // Beräkna bounding box
          const minContentX = insightsX;
          const maxContentX = circleCenterX + (liveCircleDiameter / 2);

          const insightsTopY = insightsY - insightsTextAscent;
          const liveTopY = liveY - liveTextAscent;
          const circleTopY = circleCenterY - (liveCircleDiameter / 2);

          const minOverallContentY = Math.min(insightsTopY, liveTopY, circleTopY);

          const insightsBottomY = insightsY + insightsTextDescent;
          const liveBottomY = liveY + liveTextDescent;
          const circleBottomY = circleCenterY + (liveCircleDiameter / 2);

          const maxOverallContentY = Math.max(insightsBottomY, liveBottomY, circleBottomY);

          // Beräkna panel-dimensioner
          const contentWidth = maxContentX - minContentX;
          const contentHeight = maxOverallContentY - minOverallContentY;

          const panelWidth = contentWidth + panelPadding * 2 * scaleFactor;
          const panelHeight = contentHeight + panelPadding * 2 * scaleFactor;

          const panelX = minContentX - panelPadding * scaleFactor;
          const panelY = minOverallContentY - panelPadding * scaleFactor;

          // Rita Digital Ecosystem insights panel
          p.fill(colors.card);
          p.stroke(colors.grid);
          p.strokeWeight(0.5 * scaleFactor);
          p.rect(panelX, panelY, panelWidth, panelHeight, 8 * scaleFactor);

          // Rita innehåll
          p.fill(colors.primary);
          p.textAlign(p.LEFT);
          p.textSize(12 * scaleFactor);
          p.textStyle(p.BOLD);
          p.text("Digital Ecosystem Insights", insightsX, insightsY);

          p.fill(colors.secondary);
          p.textSize(8 * scaleFactor);
          p.text("LIVE", liveX, liveY);

          p.fill(colors.success);
          p.ellipse(circleCenterX, circleCenterY, liveCircleDiameter * scaleFactor, liveCircleDiameter * scaleFactor);
        };

        const drawComponentPopup = (p: any, component: any) => {
          if (selectedComponent === -1) return;
          
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          const popupWidth = 200 * scaleFactor;
          const popupHeight = 120 * scaleFactor;
          
          // Positionera popup nära bollen
          const popupX = component.x * scaleFactor + 30;
          const popupY = component.y * scaleFactor - 60;
          
          // Animerad popup
          const popupProgress = Math.min((animationTime - selectedComponent * 0.1) * 4, 1);
          const easedPopupProgress = 1 - Math.pow(1 - popupProgress, 3);
          
          p.push();
          p.translate(popupX, popupY);
          p.scale(easedPopupProgress);
          
          // Popup-skugga
          p.noStroke();
          p.fill(colors.shadow[0], colors.shadow[1], colors.shadow[2], 0.2 * 100);
          p.rect(-popupWidth/2 + 3, -popupHeight/2 + 3, popupWidth, popupHeight, 8);
          
          // Popup-bakgrund
          p.fill(colors.card);
          p.stroke(colors.grid);
          p.strokeWeight(1);
          p.rect(-popupWidth/2, -popupHeight/2, popupWidth, popupHeight, 8);
          
          // Komponent-namn
          p.fill(colors.primary);
          p.textAlign(p.CENTER);
          p.textSize(12 * scaleFactor);
          p.textStyle(p.BOLD);
          p.text(component.name, 0, -40);
          
          // Typ
          p.fill(colors.secondary);
          p.textSize(8 * scaleFactor);
          p.textStyle(p.NORMAL);
          p.text(component.type.toUpperCase(), 0, -25);
          
          // Beskrivning
          p.fill(colors.primary);
          p.textSize(9 * scaleFactor);
          p.text(component.description, 0, -5);
          
          // Status
          const statusColor = component.status === "active" ? colors.success : colors.warning;
          p.fill(statusColor);
          p.textSize(8 * scaleFactor);
          p.text(`Status: ${component.status.toUpperCase()}`, 0, 15);
          
          // Animerad aktivitetsindikator
          const activityProgress = (animationTime * 2 + component.id * 0.2) % 1;
          p.fill(component.color[0], component.color[1], component.color[2], 100);
          p.rect(-60, 25, 120, 6, 3);
          
          p.fill(colors.card);
          p.rect(-60 + activityProgress * 120, 25, 6, 6, 3);
          
          p.fill(component.color);
          p.textSize(6 * scaleFactor);
          p.text("ACTIVE", 0, 40);
          
          p.pop();
        };

        p.mouseMoved = () => {
          let newHoveredComponent = -1;
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          
          ecosystemComponents.forEach((component, index) => {
            const responsiveComponentX = component.x * scaleFactor;
            const responsiveComponentY = component.y * scaleFactor;
            const distance = p.dist(p.mouseX, p.mouseY, responsiveComponentX, responsiveComponentY);
            if (distance < 60 * scaleFactor) {
              newHoveredComponent = index;
            }
          });
          
          if (newHoveredComponent !== hoveredComponent) {
            hoveredComponent = newHoveredComponent;
          }
        };

        p.mousePressed = () => {
          const scaleFactor = Math.min(responsiveWidth / width, responsiveHeight / height);
          let clickedComponent = -1;
          
          ecosystemComponents.forEach((component, index) => {
            const responsiveComponentX = component.x * scaleFactor;
            const responsiveComponentY = component.y * scaleFactor;
            const distance = p.dist(p.mouseX, p.mouseY, responsiveComponentX, responsiveComponentY);
            if (distance < 30 * scaleFactor) {
              clickedComponent = index;
            }
          });
          
          if (clickedComponent !== -1) {
            // Om samma komponent klickas igen, stäng popup
            if (selectedComponent === clickedComponent) {
              selectedComponent = -1;
            } else {
              // Annars visa popup för ny komponent
              selectedComponent = clickedComponent;
              const component = ecosystemComponents[clickedComponent];
              console.log(`Selected: ${component.name} (${component.type}) - ${component.description}`);
            }
          } else {
            // Klicka utanför stänger popup
            selectedComponent = -1;
          }
        };
      };

      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
      p5Ref.current = new p5Instance(sketch, canvasRef.current!);
    };

    loadP5();

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

export default DigitalEcosystemVisualization;
