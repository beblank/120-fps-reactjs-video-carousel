import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface CanvasVideoProps {
  isPlaying: boolean;
  onFPSUpdate: (fps: number) => void;
  pattern: 'gradient' | 'checkerboard' | 'wave' | 'particles';
}

export const CanvasVideo: React.FC<CanvasVideoProps> = ({ 
  isPlaying, 
  onFPSUpdate, 
  pattern
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const startTimeRef = useRef(performance.now());

  const handleFPSUpdate = useCallback((fps: number) => {
    onFPSUpdate(fps);
  }, [onFPSUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string }> = [];
    
    // Initialize particles for particle pattern
    if (pattern === 'particles') {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
      }
    }

    const animate = (currentTime: number) => {
      if (!isPlaying) return;

      const deltaTime = currentTime - lastTimeRef.current;
      frameCountRef.current++;

      // Calculate FPS every 500ms
      if (deltaTime >= 500) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        handleFPSUpdate(fps);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      const time = (currentTime - startTimeRef.current) / 1000;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      switch (pattern) {
        case 'gradient': {
          const gradient = ctx.createLinearGradient(0, 0, width, height);
          const hue1 = (time * 30) % 360;
          const hue2 = (time * 30 + 180) % 360;
          gradient.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
          gradient.addColorStop(0.5, `hsl(${(hue1 + hue2) / 2}, 70%, 40%)`);
          gradient.addColorStop(1, `hsl(${hue2}, 70%, 30%)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case 'checkerboard': {
          const squareSize = 40;
          const timeOffset = Math.floor(time * 4);
          for (let x = 0; x < width; x += squareSize) {
            for (let y = 0; y < height; y += squareSize) {
              const isColored = ((x / squareSize + y / squareSize + timeOffset) % 2) === 0;
              if (isColored) {
                const hue = (time * 60 + x + y) % 360;
                ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
                ctx.fillRect(x, y, squareSize, squareSize);
              }
            }
          }
          break;
        }

        case 'wave': {
          const imageData = ctx.createImageData(width, height);
          for (let x = 0; x < width; x += 2) {
            for (let y = 0; y < height; y += 2) {
              const wave1 = Math.sin(x * 0.02 + time * 2) * 0.5 + 0.5;
              const wave2 = Math.sin(y * 0.02 + time * 1.5) * 0.5 + 0.5;
              const wave3 = Math.sin((x + y) * 0.01 + time * 3) * 0.5 + 0.5;
              
              const r = Math.floor(wave1 * 255);
              const g = Math.floor(wave2 * 255);
              const b = Math.floor(wave3 * 255);
              
              const index = (y * width + x) * 4;
              if (index < imageData.data.length) {
                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = 255;
              }
            }
          }
          ctx.putImageData(imageData, 0, 0);
          break;
        }

        case 'particles': {
          // Update particles
          particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

            // Keep in bounds
            particle.x = Math.max(0, Math.min(width, particle.x));
            particle.y = Math.max(0, Math.min(height, particle.y));

            // Draw particle
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
            ctx.fill();
          });
          break;
        }
      }

      // Add frame info overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 300, 80);
      
      ctx.fillStyle = 'white';
      ctx.font = '14px monospace';
      ctx.fillText(`Pattern: ${pattern}`, 20, 30);
      ctx.fillText(`Frame: ${Math.floor(time * 60)}`, 20, 50); // Assume target 60 FPS
      ctx.fillText(`Time: ${time.toFixed(1)}s`, 20, 70);

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      startTimeRef.current = performance.now();
      lastTimeRef.current = performance.now();
      frameCountRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPlaying, pattern, handleFPSUpdate]);

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
};