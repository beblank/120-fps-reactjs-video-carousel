# 120 FPS ReactJS Video Carousel

A high-performance React.js video carousel application designed to showcase ultra-smooth 120 FPS video playback with real-time performance monitoring.

## Features

✨ **High-Performance Rendering**: Optimized for 120 FPS display with smooth animations
🎥 **Video Carousel**: Navigate through multiple video patterns with intuitive controls
📊 **Real-Time FPS Monitoring**: Live display of both render FPS and application FPS
🎮 **Interactive Controls**: Play/pause and navigation buttons for seamless user experience
🎨 **Multiple Visual Patterns**: Four different animated patterns to demonstrate high FPS capabilities

## Demo Patterns

1. **Animated Gradient** - Smooth color transitions and gradients
2. **Moving Checkerboard** - Dynamic checkerboard pattern with vibrant colors
3. **Wave Pattern** - Mathematical wave-based visual effects
4. **Particle System** - Physics-based particle animation with collision detection

## Technologies Used

- **React 19.1** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling solution
- **Canvas API** - High-performance 2D rendering
- **requestAnimationFrame** - Optimized animation loops

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/beblank/120-fps-reactjs-video-carousel.git

# Navigate to project directory
cd 120-fps-reactjs-video-carousel

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Serve production build locally
npx serve -s build
```

## Project Structure

```
src/
├── components/
│   ├── VideoCarousel.tsx    # Main carousel component
│   ├── FPSMonitor.tsx       # Real-time FPS monitoring
│   ├── CanvasVideo.tsx      # High-performance canvas renderer
│   └── index.ts             # Component exports
├── App.tsx                  # Root application component
└── index.tsx               # Application entry point
```

## Performance Features

### FPS Monitoring
- **Application FPS**: Measures the overall app performance
- **Render FPS**: Tracks the canvas rendering performance
- **Color-coded indicators**: Green (100+ FPS), Yellow (60+ FPS), Orange (30+ FPS), Red (<30 FPS)

### Optimization Techniques
- Canvas-based rendering for maximum performance
- Optimized animation loops using `requestAnimationFrame`
- Efficient state management to minimize re-renders
- Hardware acceleration through canvas APIs

## Usage

1. **Navigation**: Use the left (‹) and right (›) arrows to switch between video patterns
2. **Play/Pause**: Click the center button to control playback
3. **FPS Monitoring**: Watch the real-time FPS counters in the top-left corner
4. **Pattern Info**: View current pattern details in the bottom-left corner

## Screenshots

### Animated Gradient Pattern
![Animated Gradient](https://github.com/user-attachments/assets/421dde0f-dee6-4ba1-a97b-dc7eab842b20)

### Moving Checkerboard Pattern  
![Moving Checkerboard](https://github.com/user-attachments/assets/211cbcfe-f47e-46eb-8fdc-ce5c1698efb0)

### Wave Pattern
![Wave Pattern](https://github.com/user-attachments/assets/819384c4-a02b-4ba3-a229-95cdc97c232c)

### Particle System
![Particle System](https://github.com/user-attachments/assets/bd67d3f7-b22e-401c-928c-d8497d438740)

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 13+
- Edge 79+

For optimal 120 FPS performance, use a high-refresh-rate monitor (120Hz+) and ensure VSync is disabled.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- Canvas API for high-performance rendering capabilities
- The open-source community for inspiration and tools