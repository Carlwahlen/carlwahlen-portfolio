import React, { useEffect, useRef } from 'react';

/*
  Concept:
  Dispersed capabilities (Strategy, Architecture, Compliance, UX, Data)
  gradually converge into a single, living system.
  This visual represents my role as Technical Product Strategist:
  aligning business, technology, and design into one scalable product.
*/

interface HeroNetworkProps {
  width?: number;
  height?: number;
}

class NodeModule {
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  isLocked: boolean;
  lockedIndex: number;

  constructor(label: string, x: number, y: number) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.radius = 6;
    this.noiseOffsetX = Math.random() * 1000;
    this.noiseOffsetY = Math.random() * 1000;
    this.isLocked = false;
    this.lockedIndex = -1;
  }

  update(state: string, centerX: number, centerY: number, p: any) {
    if (state === "dispersed") {
      // Gentle floating movement with Perlin noise
      this.noiseOffsetX += 0.003;
      this.noiseOffsetY += 0.003;
      this.x += (p.noise(this.noiseOffsetX) - 0.5) * 0.3;
      this.y += (p.noise(this.noiseOffsetY) - 0.5) * 0.3;
      
      // Constrain to canvas
      this.x = p.constrain(this.x, this.radius, p.width - this.radius);
      this.y = p.constrain(this.y, this.radius, p.height - this.radius);
    } else if (state === "assembly" && !this.isLocked) {
      // Smooth easing toward center
      this.x = p.lerp(this.x, centerX, 0.03);
      this.y = p.lerp(this.y, centerY, 0.03);
      
      // Check if reached center
      const distToCenter = p.dist(this.x, this.y, centerX, centerY);
      if (distToCenter < 2) {
        this.isLocked = true;
        this.x = centerX;
        this.y = centerY;
      }
    }
  }

  draw(p: any) {
    if (this.isLocked) return; // Don't draw individual locked nodes
    
    p.fill('#1A1F27');
    p.noStroke();
    p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  drawTooltip(mx: number, my: number, p: any) {
    const distToMouse = p.dist(mx, my, this.x, this.y);
    if (distToMouse < 20) {
      p.push();
      
      // Tooltip container
      p.fill(255);
      p.stroke(210, 215, 220, 120);
      p.strokeWeight(1);
      
      p.textSize(14);
      p.textStyle(p.BOLD);
      const tw = p.textWidth(this.label);
      const th = 20;
      const padding = 12;
      
      let tx = this.x - tw/2 - padding;
      let ty = this.y - this.radius - 10 - th - padding;
      
      // Adjust if too close to edges
      if (tx < 10) tx = 10;
      if (tx + tw + padding*2 > p.width - 10) tx = p.width - tw - padding*2 - 10;
      if (ty < 10) ty = this.y + this.radius + 10;
      
      p.rect(tx, ty, tw + padding*2, th + padding*2, 8);
      
      // Tooltip text
      p.fill('#0F172A');
      p.textAlign(p.LEFT, p.TOP);
      p.text(this.label, tx + padding, ty + padding);
      
      p.pop();
    }
  }
}

const HeroNetwork: React.FC<HeroNetworkProps> = ({ 
  width, 
  height 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadP5 = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const p5Instance = (await import('p5')).default;
      
      const getResponsiveSize = () => {
        if (!containerRef.current) {
          return { 
            width: window.innerWidth, 
            height: window.innerHeight * 0.6 
          };
        }
        
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        if (containerWidth === 0 || containerHeight === 0) {
          return { 
            width: window.innerWidth, 
            height: window.innerHeight * 0.6 
          };
        }
        
        return { 
          width: containerWidth, 
          height: containerHeight 
        };
      };
      
      const { width: responsiveWidth, height: responsiveHeight } = getResponsiveSize();
      
      if (responsiveWidth === 0 || responsiveHeight === 0) {
        console.log('HeroNetwork: Väntar på container dimensions...');
        setTimeout(() => loadP5(), 200);
        return;
      }
      
      console.log('HeroNetwork: Container dimensions:', responsiveWidth, 'x', responsiveHeight);
      
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }

      const sketch = (p: any) => {
        let nodes: NodeModule[] = [];
        let centerX = 0;
        let centerY = 0;
        let currentState = "dispersed";
        let lockedNodes: NodeModule[] = [];
        let pulseSize = 0;
        let pulseAlpha = 0;
        let frameCount = 0;

        p.setup = () => {
          const canvas = p.createCanvas(responsiveWidth, responsiveHeight);
          canvas.parent(canvasRef.current!);
          canvas.style('display', 'block');
          canvas.style('margin', '0 auto');
          p.pixelDensity(2);
          p.textFont('Inter, sans-serif');
          p.frameRate(30);
          
          centerX = p.width / 2;
          centerY = p.height / 2;
          
          // Create nodes
          const labels = [
            "Product Strategy",
            "Business Development",
            "UX Design",
            "UI & Visual Design",
            "UX / UI Design",
            "Technical Architecture",
            "Data & Metrics",
            "SEO & Accessibility",
            "Collaboration",
            "Innovation"
          ];
          
          for (let i = 0; i < labels.length; i++) {
            const angle = (p.TWO_PI / labels.length) * i;
            const radius = p.min(p.width, p.height) * 0.3;
            const x = centerX + p.cos(angle) * radius;
            const y = centerY + p.sin(angle) * radius;
            nodes.push(new NodeModule(labels[i], x, y));
          }
        };

        p.windowResized = () => {
          if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight;
            
            // Only resize if dimensions are valid
            if (containerWidth > 0 && containerHeight > 0) {
              p.resizeCanvas(containerWidth, containerHeight);
              
              // Update center position
              centerX = containerWidth / 2;
              centerY = containerHeight / 2;
              
              // Smoothly scale existing node positions instead of jumping to new positions
              const scaleX = containerWidth / p.width;
              const scaleY = containerHeight / p.height;
              
              for (let node of nodes) {
                // Scale current positions smoothly
                node.x = node.x * scaleX;
                node.y = node.y * scaleY;
                node.targetX = node.targetX * scaleX;
                node.targetY = node.targetY * scaleY;
              }
            }
          }
        };

        p.draw = () => {
          frameCount++;
          p.background('#f8f8f8');
          
          // Update state machine
          if (currentState === "dispersed") {
            // After 3 seconds, start assembly
            if (frameCount > 180) {
              currentState = "assembly";
            }
          } else if (currentState === "assembly") {
            // When all nodes are locked, switch to cohesion
            if (lockedNodes.length === nodes.length) {
              currentState = "cohesion";
              pulseSize = 20;
              pulseAlpha = 0;
            }
          } else if (currentState === "cohesion") {
            // Breathing pulse effect
            pulseSize = 20 + p.sin(frameCount * 0.05) * 15;
            pulseAlpha = 80 + p.sin(frameCount * 0.05) * 60;
          }
          
          // Draw connections between locked nodes
          if (lockedNodes.length > 1) {
            p.stroke(210, 215, 220, 60);
            p.strokeWeight(0.7);
            p.noFill();
            
            for (let i = 0; i < lockedNodes.length; i++) {
              for (let j = i + 1; j < lockedNodes.length; j++) {
                const nodeA = lockedNodes[i];
                const nodeB = lockedNodes[j];
                p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
              }
            }
          }
          
          // Draw pulse in cohesion state
          if (currentState === "cohesion") {
            p.fill(26, 31, 39, pulseAlpha);
            p.noStroke();
            p.ellipse(centerX, centerY, pulseSize * 2, pulseSize * 2);
          }
          
          // Update and draw all nodes
          for (let node of nodes) {
            const isNowLocked = node.isLocked && !lockedNodes.includes(node);
            if (isNowLocked) {
              node.lockedIndex = lockedNodes.length;
              lockedNodes.push(node);
            }
            
            node.update(currentState, centerX, centerY, p);
            node.draw(p);
            node.drawTooltip(p.mouseX, p.mouseY, p);
          }
          
          // Draw locked nodes in the center
          if (lockedNodes.length > 0) {
            p.fill('#1A1F27');
            p.noStroke();
            const clusterSize = p.map(lockedNodes.length, 0, nodes.length, 0, 20);
            p.ellipse(centerX, centerY, 14 + clusterSize, 14 + clusterSize);
          }
        };
      };

      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
      p5Ref.current = new p5Instance(sketch, canvasRef.current!);
      
      // Handle resize
      const handleResize = () => {
        if (p5Ref.current && containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;
          
          // Only resize if dimensions are valid
          if (containerWidth > 0 && containerHeight > 0) {
            p5Ref.current.resizeCanvas(containerWidth, containerHeight);
          }
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        if (p5Ref.current) {
          p5Ref.current.remove();
        }
        window.removeEventListener('resize', handleResize);
      };
    };

    loadP5();

  }, [width, height]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex justify-center items-center"
    >
      <div 
        ref={canvasRef}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
};

export default HeroNetwork;

