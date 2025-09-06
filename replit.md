# StrataMind - AI-Powered Solutions Website

## Overview

StrataMind is a modern, interactive website featuring a dark galaxy/AI theme that showcases AI-powered solutions. The project is a single-page application (SPA) with smooth animations, a live RAG/QnA demo system, and complete business sections including services, pricing, and contact functionality. The website integrates with a FastAPI backend to provide real-time AI question-answering capabilities through a knowledge base upload and chat interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a vanilla JavaScript SPA architecture with three main files:
- **HTML Structure**: Single `index.html` file containing all page sections (home, services, demo, pricing, about, contact)
- **CSS Styling**: Complete styling in `styles.css` with dark galaxy theme, animations, and responsive design
- **JavaScript Logic**: All interactivity handled in `script.js` including navigation, animations, backend integration, and form handling

**Design Decisions:**
- **Vanilla JavaScript**: Chosen over frameworks for simplicity and fast loading
- **Single Page Design**: All sections in one HTML file for smooth scrolling navigation
- **Mobile-First Responsive**: Hamburger menu and responsive grids for mobile compatibility
- **Animation-Heavy**: Cursor followers, floating robots, and smooth transitions for engagement

### Styling and Theme Architecture
- **Font Strategy**: Orbitron for headers (futuristic), Exo 2 for body text (readability)
- **Color Scheme**: Dark gradient backgrounds with white text and accent colors
- **Animation System**: CSS-based star field background, floating robot elements, and hover effects
- **Layout Pattern**: Card-based design with rounded corners and glowing effects

### Backend Integration
- **API Architecture**: RESTful integration with FastAPI backend
- **Connection Management**: Health check system to verify backend availability
- **Demo Functionality**: Real-time knowledge base upload and question-answering chat interface
- **Error Handling**: User feedback for connection issues and API failures

**Key Integration Points:**
- Health check endpoint for connection status
- Knowledge base text upload functionality
- Live chat interface for AI question answering

### Navigation and User Experience
- **Smooth Scrolling**: Section-based navigation with smooth scroll behavior
- **Mobile Menu**: Hamburger menu system for mobile devices
- **Interactive Elements**: Hover effects, button animations, and form validation
- **Visual Feedback**: Status indicators, loading states, and user interaction responses

## External Dependencies

### Backend Services
- **FastAPI Backend**: Hosted at `https://s-chatterjee2005-stratamind.hf.space`
  - `/health` endpoint for connection verification
  - `/upload_text/` endpoint for knowledge base management
  - `/ask/` endpoint for AI question answering

### Font and Icon Libraries
- **Google Fonts**: Orbitron and Exo 2 font families for typography
- **Font Awesome**: Version 6.0.0 for iconography and visual elements

### Browser APIs
- **Fetch API**: For backend communication and API requests
- **DOM API**: For dynamic content manipulation and user interactions
- **CSS Animations**: For visual effects and smooth transitions

**Integration Rationale:**
The minimal external dependency approach ensures fast loading times and reduces potential points of failure, while the FastAPI backend provides the AI capabilities needed for the demo functionality.