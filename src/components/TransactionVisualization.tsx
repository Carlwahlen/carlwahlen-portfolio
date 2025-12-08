import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'account' | 'transaction' | 'merchant' | 'bank';
  color: string;
  connections: string[];
  lastActivity: number;
}

interface TransactionVisualizationProps {
  width?: number;
  height?: number;
}

const TransactionVisualization: React.FC<TransactionVisualizationProps> = ({ 
  width = 600, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);

  useEffect(() => {
    const loadP5 = async () => {
      const p5 = (await import('p5')).default;
      
      // Clean up existing instance
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }

      const nodes: Node[] = [];
      const transactions: Array<{
        from: string;
        to: string;
        amount: number;
        timestamp: number;
        color: string;
        active: boolean;
      }> = [];

      // Initialize nodes
      const createNodes = () => {
        nodes.length = 0;
        const nodeTypes = [
          { type: 'bank', color: '#1f2937', size: 20, shape: 'circle' },
          { type: 'merchant', color: '#4b5563', size: 16, shape: 'circle' },
          { type: 'account', color: '#6b7280', size: 12, shape: 'circle' },
          { type: 'transaction', color: '#9ca3af', size: 8, shape: 'circle' }
        ];

        // Create a more structured network like Qura.law
        for (let i = 0; i < 40; i++) {
          const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
          
            // Create more spread out positioning
            let x, y;
            if (i < 8) {
              // Central cluster - smaller and more spread
              const angle = (i / 8) * Math.PI * 2;
              const radius = 30 + Math.random() * 40;
              x = width / 2 + Math.cos(angle) * radius;
              y = height / 2 + Math.sin(angle) * radius;
            } else if (i < 20) {
              // Medium ring - wider spread
              const angle = ((i - 8) / 12) * Math.PI * 2;
              const radius = 80 + Math.random() * 50;
              x = width / 2 + Math.cos(angle) * radius;
              y = height / 2 + Math.sin(angle) * radius;
            } else {
              // Outer scattered nodes - use more of the available space
              x = Math.random() * (width - 40) + 20;
              y = Math.random() * (height - 40) + 20;
            }
          
          nodes.push({
            id: `node-${i}`,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            size: nodeType.size,
            type: nodeType.type,
            color: nodeType.color,
            connections: [],
            lastActivity: 0
          });
        }
      };

      const createTransaction = () => {
        if (nodes.length < 2) return;
        
        const from = nodes[Math.floor(Math.random() * nodes.length)];
        const to = nodes[Math.floor(Math.random() * nodes.length)];
        
        if (from.id !== to.id) {
        transactions.push({
          from: from.id,
          to: to.id,
          amount: Math.random() * 1000 + 10,
          timestamp: Date.now(),
          color: Math.random() > 0.8 ? '#1f2937' : '#6b7280',
          active: true
        });
          
          // Update node activity
          from.lastActivity = Date.now();
          to.lastActivity = Date.now();
        }
      };

      const sketch = (p: any) => {
        p.setup = () => {
          p.createCanvas(width, height);
          createNodes();
          
          // Create initial transactions
          for (let i = 0; i < 5; i++) {
            createTransaction();
          }
        };

        p.draw = () => {
          p.background(255);
          
          // Minimal node movement for stability
          nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Keep nodes in bounds
            node.x = p.constrain(node.x, node.size/2, width - node.size/2);
            node.y = p.constrain(node.y, node.size/2, height - node.size/2);
          });

              // Draw background connections - very thin gray lines
              p.stroke(240, 240, 240);
              p.strokeWeight(0.3);
              nodes.forEach((node, i) => {
                nodes.slice(i + 1).forEach(otherNode => {
                  const distance = p.dist(node.x, node.y, otherNode.x, otherNode.y);
                  if (distance < 150) { // Increased connection distance for more spread
                    p.line(node.x, node.y, otherNode.x, otherNode.y);
                  }
                });
              });

          // Draw active transactions with thin black lines
          transactions.forEach(transaction => {
            const fromNode = nodes.find(n => n.id === transaction.from);
            const toNode = nodes.find(n => n.id === transaction.to);
            
                if (fromNode && toNode && transaction.active) {
                  // Thin black line for active transactions
                  p.stroke('#1f2937');
                  p.strokeWeight(1.5);
                  p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
                  
                  // Very subtle pulsing
                  const pulse = p.sin(p.millis() * 0.008) * 0.1 + 0.9;
                  p.strokeWeight(0.8 + pulse * 0.4);
                  p.stroke('#1f2937', 120);
                  p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
                }
          });

          // Draw nodes - clean circles like Qura.law
          nodes.forEach(node => {
            // Activity highlight with white outline
            const timeSinceActivity = Date.now() - node.lastActivity;
            const isActive = timeSinceActivity < 2000;
            
            if (isActive) {
              // White outline for active nodes
              p.stroke(255, 255, 255);
              p.strokeWeight(2);
              p.noFill();
              p.ellipse(node.x, node.y, node.size + 4);
            }
            
            // Main node
            p.fill(node.color);
            p.noStroke();
            p.ellipse(node.x, node.y, node.size);
          });

          // Clean up old transactions
          for (let i = transactions.length - 1; i >= 0; i--) {
            const transaction = transactions[i];
            if (Date.now() - transaction.timestamp > 4000) {
              transaction.active = false;
            }
            if (Date.now() - transaction.timestamp > 8000) {
              transactions.splice(i, 1);
            }
          }

          // Create new transactions less frequently
          if (Math.random() < 0.008) {
            createTransaction();
          }
        };

        p.mousePressed = () => {
          // Create transaction on click
          createTransaction();
        };
      };

      if (canvasRef.current) {
        p5Ref.current = new p5(sketch, canvasRef.current);
      }
    };

    loadP5();

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [width, height]);

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default TransactionVisualization;
