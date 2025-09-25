import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const FPSContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #00ff00;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  z-index: 20;
  min-width: 150px;
`;

const FPSValue = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'fps'
})<{ fps: number }>`
  color: ${props => 
    props.fps >= 100 ? '#00ff00' : 
    props.fps >= 60 ? '#ffff00' : 
    props.fps >= 30 ? '#ff8800' : '#ff0000'
  };
  font-weight: bold;
`;

export const FPSMonitor: React.FC = () => {
  const [appFPS, setAppFPS] = useState(0);
  const [averageFPS, setAverageFPS] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    let animationId: number;

    const updateFPS = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;
      
      frameCountRef.current++;

      // Calculate FPS every 250ms for more responsive updates
      if (deltaTime >= 250) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        setAppFPS(fps);

        // Keep history of last 20 FPS readings for average
        fpsHistoryRef.current.push(fps);
        if (fpsHistoryRef.current.length > 20) {
          fpsHistoryRef.current.shift();
        }

        // Calculate average FPS
        const avg = Math.round(
          fpsHistoryRef.current.reduce((sum, val) => sum + val, 0) / 
          fpsHistoryRef.current.length
        );
        setAverageFPS(avg);

        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <FPSContainer>
      <div>App Performance:</div>
      <FPSValue fps={appFPS}>
        Current: {appFPS} FPS
      </FPSValue>
      <FPSValue fps={averageFPS}>
        Average: {averageFPS} FPS
      </FPSValue>
      <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
        Target: 120 FPS
      </div>
    </FPSContainer>
  );
};