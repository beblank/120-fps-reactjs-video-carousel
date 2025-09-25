import React, { useState } from 'react';
import styled from 'styled-components';
import { FPSMonitor } from './FPSMonitor';
import { CanvasVideo } from './CanvasVideo';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoElement = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PlayPauseButton = styled.button`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translate(-50%, 50%) scale(1.1);
  }
`;

const NavigationButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'direction'
})<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction}: 20px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 20px;
  z-index: 10;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const VideoInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: monospace;
`;

const VideoCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: monospace;
`;

interface Video {
  pattern: 'gradient' | 'checkerboard' | 'wave' | 'particles';
  title: string;
}

// Sample high-FPS video patterns for demonstration
const sampleVideos: Video[] = [
  {
    pattern: 'gradient',
    title: '120 FPS Animated Gradient'
  },
  {
    pattern: 'checkerboard', 
    title: '120 FPS Moving Checkerboard'
  },
  {
    pattern: 'wave',
    title: '120 FPS Wave Pattern'
  },
  {
    pattern: 'particles',
    title: '120 FPS Particle System'
  }
];

export const VideoCarousel: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoFPS, setVideoFPS] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleFPSUpdate = (fps: number) => {
    setVideoFPS(fps);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % sampleVideos.length;
    setCurrentVideoIndex(nextIndex);
    setVideoFPS(0);
  };

  const previousVideo = () => {
    const prevIndex = currentVideoIndex === 0 ? sampleVideos.length - 1 : currentVideoIndex - 1;
    setCurrentVideoIndex(prevIndex);
    setVideoFPS(0);
  };

  const currentVideo = sampleVideos[currentVideoIndex];

  return (
    <CarouselContainer>
      <VideoElement>
        <CanvasVideo
          isPlaying={isPlaying}
          onFPSUpdate={handleFPSUpdate}
          pattern={currentVideo.pattern}
        />
      </VideoElement>
      
      <PlayPauseButton onClick={togglePlayPause}>
        {isPlaying ? '⏸️' : '▶️'}
      </PlayPauseButton>
      
      <NavigationButton direction="left" onClick={previousVideo}>
        ‹
      </NavigationButton>
      
      <NavigationButton direction="right" onClick={nextVideo}>
        ›
      </NavigationButton>

      <VideoCounter>
        {currentVideoIndex + 1} / {sampleVideos.length}
      </VideoCounter>

      <VideoInfo>
        <div>Pattern: {currentVideo.title}</div>
        <div>Render FPS: {videoFPS}</div>
        <div>Status: {isPlaying ? 'Playing' : 'Paused'}</div>
      </VideoInfo>

      <FPSMonitor />
    </CarouselContainer>
  );
};