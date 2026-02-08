# Holbrook Estates - Luxury Residential Development Website

A premium, modern website for Holbrook Estates luxury residential development. Built with clean HTML, CSS, and JavaScript to reflect a high-end real estate brand.

## 🏡 Project Overview

This website showcases Holbrook Estates as a luxury residential development with a focus on:
- Clean, modern, and elegant design
- Premium minimalist aesthetic
- High-end real estate branding
- Responsive design for all devices

## 🎨 Design Features

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body Text**: Inter (clean sans-serif)

### Color Palette
- **Primary**: Charcoal (#2c2c2c)
- **Secondary**: Beige (#f8f6f3)
- **Accent**: Gold (#d4af37)
- **Text**: Various shades of gray for hierarchy

### Layout Sections
1. **Hero Section** - Full-width background with title and CTAs
2. **About Section** - Side-by-side text and image layout
3. **Features Section** - Grid of amenities and highlights
4. **Gallery Section** - Image grid with hover effects
5. **Location Section** - Map integration and nearby attractions
6. **Contact Section** - Inquiry form and contact information

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
holbrook-estates/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets (to be added)
├── assets/             # Additional assets
└── README.md           # Project documentation
```

## ✨ Features

### Interactive Elements
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Mobile Navigation**: Responsive hamburger menu
- **Scroll Animations**: Elements animate on scroll
- **Contact Form**: Functional inquiry form with validation
- **Gallery Interactions**: Hover effects and click handlers
- **Scroll to Top**: Floating button for easy navigation

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Optimized typography scaling

### Performance Features
- Optimized CSS with custom properties
- Efficient JavaScript with event delegation
- Smooth animations using CSS transforms
- Lazy loading ready structure

## 🛠️ Customization

### Adding Images
1. Place images in the `images/` directory
2. Update image placeholders in HTML:
   ```html
   <!-- Replace placeholder divs with actual images -->
   <img src="images/hero-background.jpg" alt="Holbrook Estates">
   ```

### Updating Content
- Edit text content directly in `index.html`
- Modify colors in CSS custom properties (`:root` section)
- Adjust spacing using the CSS variables

### Adding Map Integration
Replace the map placeholder in the Location section:
```html
<!-- Replace this div -->
<div class="map-placeholder">...</div>

<!-- With Google Maps embed -->
<iframe src="https://www.google.com/maps/embed?..." 
        width="100%" height="400" frameborder="0"></iframe>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Next Steps

### Content Integration
1. **Images**: Add high-quality photos from the original Squarespace site
2. **Content**: Update placeholder text with actual property information
3. **Map**: Integrate Google Maps with the actual location
4. **Contact**: Connect form to backend service or email handler

### Enhancements
1. **Lightbox Gallery**: Add image lightbox functionality
2. **Virtual Tour**: Integrate 360° tour or video walkthrough
3. **SEO**: Add meta tags, structured data, and sitemap
4. **Analytics**: Integrate Google Analytics or similar tracking

### Performance
1. **Image Optimization**: Compress and optimize all images
2. **CDN**: Consider using a CDN for faster loading
3. **Caching**: Implement browser caching strategies

## 📞 Support

For questions or customization requests, please refer to the project documentation or contact the development team.

---

**Holbrook Estates** - *A New Standard of Luxury Living*
