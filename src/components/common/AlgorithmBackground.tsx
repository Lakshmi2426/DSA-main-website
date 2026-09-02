import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AlgorithmBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Nodes for connected graph simulation
    const nodeCount = Math.min(Math.floor(width / 28), 54);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label?: string;
      colorType: 'blue' | 'violet';
    }[] = [];

    const symbols = [
      '{ }',
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(V+E)',
      '[ 0..N ]',
      'root->left',
      'root->right',
      'push()',
      'pop()',
      'enqueue()',
      'dequeue()',
      'mid=(L+R)/2',
      'swap(a,b)',
      'visited[v]',
      'dp[i][w]',
      'hash(key)',
      'nullptr',
      'minHeap',
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 1.6,
        label: Math.random() > 0.52 ? symbols[Math.floor(Math.random() * symbols.length)] : undefined,
        colorType: i % 3 === 0 ? 'violet' : 'blue',
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const isDark = theme === 'dark';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light mode subtle ambient gradient mesh
      if (!isDark) {
        // Soft blue radial gradient in top right
        const grad1 = ctx.createRadialGradient(width * 0.85, height * 0.15, 20, width * 0.85, height * 0.15, width * 0.45);
        grad1.addColorStop(0, 'rgba(37, 99, 235, 0.045)');
        grad1.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Soft violet radial gradient in bottom left
        const grad2 = ctx.createRadialGradient(width * 0.15, height * 0.80, 20, width * 0.15, height * 0.80, width * 0.4);
        grad2.addColorStop(0, 'rgba(124, 58, 237, 0.04)');
        grad2.addColorStop(1, 'rgba(124, 58, 237, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const factor = 1 - dist / 135;
            if (isDark) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${factor * 0.15})`;
            } else {
              // 75% Royal Blue, 25% Violet stroke
              ctx.strokeStyle =
                nodes[i].colorType === 'violet'
                  ? `rgba(124, 58, 237, ${factor * 0.20})`
                  : `rgba(37, 99, 235, ${factor * 0.22})`;
            }
            ctx.lineWidth = isDark ? 0.8 : 0.95;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes & symbols
      for (const node of nodes) {
        // Move with slow velocity
        node.x += node.vx;
        node.y += node.vy;

        // Mouse slight interaction
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          node.x -= (mdx / mdist) * 0.25;
          node.y -= (mdy / mdist) * 0.25;
        }

        // Screen boundaries bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Render point
        if (isDark) {
          ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
        } else {
          ctx.fillStyle =
            node.colorType === 'violet'
              ? 'rgba(124, 58, 237, 0.55)'
              : 'rgba(37, 99, 235, 0.55)';
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Render symbol if present
        if (node.label) {
          ctx.font = '10.5px "JetBrains Mono", monospace';
          if (isDark) {
            ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
          } else {
            ctx.fillStyle =
              node.colorType === 'violet'
                ? 'rgba(109, 40, 217, 0.50)'
                : 'rgba(29, 78, 216, 0.52)';
          }
          ctx.fillText(node.label, node.x + 8, node.y + 4);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
      aria-hidden="true"
    />
  );
};
