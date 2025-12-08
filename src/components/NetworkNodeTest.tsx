import React, { useEffect, useRef } from 'react';

interface NetworkNodeTestProps {
  width?: number;
  height?: number;
}

const NetworkNodeTest: React.FC<NetworkNodeTestProps> = ({ 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadP5 = async () => {
      const p5Instance = (await import('p5')).default;
      
      // Clean up previous instance
      if (p5Ref.current) {
        p5Ref.current.remove();
      }

      const sketch = (p: any) => {
        let nodes: Array<{
          x: number;
          y: number;
          size: number;
          id: number;
          built: boolean;
          building: boolean;
          buildTime: number;
          connections: number[];
          pulse: number;
        }> = [];

        let connections: Array<{
          from: number;
          to: number;
          active: boolean;
          building: boolean;
        }> = [];

        let dataParticles: Array<{
          x: number;
          y: number;
          targetX: number;
          targetY: number;
          speed: number;
          size: number;
          alpha: number;
        }> = [];

        let animationTime = 0;
        let buildSequence = 0;
        let nextNodeToBuild = 0;
        let buildTimer = 0;
        const buildDelay = 60; // frames between builds

        // Define node positions for organic growth
        const nodePositions = [
          {x: width * 0.5, y: height * 0.5}, // Start node - center
          {x: width * 0.3, y: height * 0.3}, // Branch up-left
          {x: width * 0.7, y: height * 0.3}, // Branch up-right
          {x: width * 0.2, y: height * 0.6}, // Branch left
          {x: width * 0.8, y: height * 0.6}, // Branch right
          {x: width * 0.4, y: height * 0.2}, // Branch up
          {x: width * 0.6, y: height * 0.2}, // Branch up
          {x: width * 0.1, y: height * 0.4}, // Far left
          {x: width * 0.9, y: height * 0.4}, // Far right
          {x: width * 0.5, y: height * 0.1}, // Top center
          {x: width * 0.3, y: height * 0.7}, // Bottom left
          {x: width * 0.7, y: height * 0.7}, // Bottom right
        ];

        // Initialize all nodes as not built
        for (let i = 0; i < nodePositions.length; i++) {
          nodes.push({
            x: nodePositions[i].x,
            y: nodePositions[i].y,
            size: 12 + p.random(8),
            id: i,
            built: false,
            building: false,
            buildTime: 0,
            connections: [],
            pulse: 0
          });
        }

        // Define connection rules for organic growth
        const connectionRules = [
          [1, 2], // 0 connects to 1,2
          [3, 5], // 1 connects to 3,5
          [4, 6], // 2 connects to 4,6
          [7, 10], // 3 connects to 7,10
          [8, 11], // 4 connects to 8,11
          [9], // 5 connects to 9
          [9], // 6 connects to 9
          [10], // 7 connects to 10
          [11], // 8 connects to 11
          [], // 9 is end node
          [], // 10 is end node
          []  // 11 is end node
        ];

        // Build initial node
        nodes[0].built = true;
        nodes[0].building = false;

        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          if (containerRef.current) {
            containerRef.current.appendChild(canvas.elt);
          }
        };

        p.draw = () => {
          p.background(248, 250, 252);
          animationTime += 0.02;
          buildTimer++;

          // Build next node in sequence
          if (buildTimer >= buildDelay && nextNodeToBuild < nodes.length) {
            // Find next node to build based on connection rules
            let nodeToBuild = -1;
            for (let i = 0; i < nodes.length; i++) {
              if (!nodes[i].built && !nodes[i].building) {
                // Check if any built node can connect to this one
                for (let j = 0; j < nodes.length; j++) {
                  if (nodes[j].built && connectionRules[j].includes(i)) {
                    nodeToBuild = i;
                    break;
                  }
                }
                if (nodeToBuild !== -1) break;
              }
            }

            if (nodeToBuild !== -1) {
              nodes[nodeToBuild].building = true;
              nodes[nodeToBuild].buildTime = 0;
              nextNodeToBuild++;
              buildTimer = 0;
            }
          }

          // Update building nodes
          for (let node of nodes) {
            if (node.building) {
              node.buildTime++;
              if (node.buildTime > 30) { // Build duration
                node.built = true;
                node.building = false;
                
                // Create connections to this node
                for (let i = 0; i < nodes.length; i++) {
                  if (nodes[i].built && connectionRules[i].includes(node.id)) {
                    connections.push({
                      from: i,
                      to: node.id,
                      active: true,
                      building: false
                    });
                    nodes[i].connections.push(node.id);
                    node.connections.push(i);
                  }
                }
              }
            }
            
            if (node.built) {
              node.pulse = p.sin(animationTime * 2 + node.id) * 2;
            }
          }

          // Draw connections
          p.stroke(200, 200, 200, 150);
          p.strokeWeight(1.5);
          for (let conn of connections) {
            if (conn.active) {
              let fromNode = nodes[conn.from];
              let toNode = nodes[conn.to];
              p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
            }
          }

          // Draw nodes
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            
            p.push();
            p.translate(node.x, node.y);
            
            if (node.built) {
              // Built node - full black
              p.fill(0);
              p.noStroke();
              p.circle(0, 0, node.size + node.pulse);
              
              // Inner white circle
              p.fill(255);
              p.circle(0, 0, node.size * 0.6);
              
              // Center dot
              p.fill(0);
              p.circle(0, 0, node.size * 0.2);
              
              // Create data particles from built nodes
              if (p.random() > 0.98 && node.connections.length > 0) {
                let targetNode = nodes[node.connections[p.floor(p.random(node.connections.length))]];
                dataParticles.push({
                  x: node.x,
                  y: node.y,
                  targetX: targetNode.x,
                  targetY: targetNode.y,
                  speed: 1 + p.random(1),
                  size: 2 + p.random(2),
                  alpha: 150
                });
              }
            } else if (node.building) {
              // Building node - pulsing gray
              let buildProgress = node.buildTime / 30;
              p.fill(100, 100, 100, 100 + buildProgress * 155);
              p.noStroke();
              p.circle(0, 0, node.size * buildProgress);
            } else {
              // Not built yet - very faint outline
              p.fill(0, 0, 0, 30);
              p.noStroke();
              p.circle(0, 0, node.size);
            }
            p.pop();
          }

          // Update and draw data particles
          for (let i = dataParticles.length - 1; i >= 0; i--) {
            let particle = dataParticles[i];
            
            particle.x += (particle.targetX - particle.x) * 0.1;
            particle.y += (particle.targetY - particle.y) * 0.1;
            particle.alpha -= 3;

            if (particle.alpha <= 0) {
              dataParticles.splice(i, 1);
            } else {
              p.fill(0, 0, 0, particle.alpha);
              p.noStroke();
              p.circle(particle.x, particle.y, particle.size);
            }
          }

          // Reset when all nodes are built
          if (nextNodeToBuild >= nodes.length && buildTimer > 300) {
            // Reset everything
            for (let node of nodes) {
              node.built = false;
              node.building = false;
              node.buildTime = 0;
              node.connections = [];
            }
            connections = [];
            dataParticles = [];
            nextNodeToBuild = 0;
            buildTimer = 0;
            nodes[0].built = true; // Start with first node
          }
        };
      };

      p5Ref.current = new p5Instance(sketch);
    };

    loadP5();

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
      }
    };
  }, [width, height]);

  return (
    <div className="w-full flex justify-center">
      <div ref={containerRef} className="overflow-hidden" />
    </div>
  );
};

export default NetworkNodeTest;
