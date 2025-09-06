# StrataMind - AI-Powered Solutions Website

A modern, interactive website for StrataMind featuring a dark galaxy/AI theme with smooth animations and a live RAG/QnA demo connected to FastAPI backend.

## Features

### 🌟 Complete Website Sections
- **Home** - Hero section with animated brain and call-to-action
- **Services** - AI services displayed in interactive cards
- **Demo** - Live RAG/QnA system with backend integration
- **Pricing** - Three-tier pricing plans with hover effects
- **About** - Company information with animated tech stack
- **Contact** - Interactive contact form with validation

### 🎨 Dark Galaxy/AI Theme
- Futuristic Orbitron and Exo 2 fonts
- Smooth gradient backgrounds and animations
- Glowing effects and hover transitions
- Animated stars and floating robots
- Cursor-following robot animations
- Rounded corners and card layouts

### 🤖 Interactive Demo
- Real-time backend connection status
- Knowledge base upload functionality
- Live question/answer interface
- Smooth chat animations
- Error handling and user feedback

### 📱 Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Responsive grid layouts
- Touch-friendly interactions

## Backend Integration

The website connects to your FastAPI backend at: `https://s-chatterjee2005-stratamind.hf.space`

### API Endpoints Used:
- `GET /health` - Check backend connection status
- `POST /upload_text/` - Upload knowledge base text
- `POST /ask/` - Submit questions and get AI responses

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

## Local Development

### Running in Replit
The website is already configured to run in Replit using the built-in workflow system:

1. The workflow automatically serves the site on port 5000
2. Access your site through the Replit webview
3. All changes are automatically reflected

### Manual Setup
If you need to run this locally outside of Replit:

```bash
# Navigate to project directory
cd your-project-folder

# Start a simple HTTP server
python -m http.server 5000

# Or using Node.js
npx serve -p 5000

# Or using any static file server of your choice
```

Then open `http://localhost:5000` in your browser.

## Deployment Options

### 1. Replit Deployment
- Use Replit's built-in deployment feature
- Automatically handles scaling and SSL
- Perfect for demos and production

### 2. Static Hosting Services
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket with static hosting

### 3. Traditional Web Hosting
- Upload all files to your web hosting provider
- Ensure `index.html` is in the root directory
- No server-side requirements needed

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Features

- Optimized CSS animations using `transform` and `opacity`
- Efficient event handling with debouncing
- Minimal DOM manipulation
- Compressed and optimized stylesheets
- Lazy loading for smooth scrolling effects

## Customization

### Changing Backend URL
Update the `BACKEND_URL` constant in `script.js`:

```javascript
const BACKEND_URL = "your-new-backend-url";
```

### Modifying Theme Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #ff6b9d;
    --accent-color: #00ff88;
}
```

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style in `styles.css`
3. Add navigation link functionality in `script.js`

## Troubleshooting

### Demo Not Working
1. Check browser console for errors
2. Verify backend URL is accessible
3. Ensure CORS is properly configured on backend
4. Check network connectivity

### Animations Not Smooth
1. Reduce animation complexity in CSS
2. Enable hardware acceleration with `transform3d()`
3. Check browser performance settings

### Mobile Issues
1. Test on actual devices, not just browser dev tools
2. Verify touch events are properly handled
3. Check viewport meta tag is present

## Contributing

1. Follow existing code style and formatting
2. Test changes across different browsers
3. Ensure mobile responsiveness
4. Document any new features

## License

© 2024 StrataMind. All rights reserved.

---

**Built with ❤️ using HTML, CSS, and JavaScript**