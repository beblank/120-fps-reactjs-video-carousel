import React from 'react';
import styled from 'styled-components';
import { VideoCarousel } from './components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.2rem;
  max-width: 800px;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <AppContainer>
      <Title>120 FPS Video Carousel</Title>
      <Subtitle>
        Experience ultra-smooth 120 FPS video playback with real-time performance monitoring.
        Navigate through videos and see both video FPS and application FPS in real-time.
      </Subtitle>
      <CarouselWrapper>
        <VideoCarousel />
      </CarouselWrapper>
    </AppContainer>
  );
}

export default App;
