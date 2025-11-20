// ===== HOLBROOK ESTATES JAVASCRIPT ===== //

// Global variables for carousel
let currentSlide = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION ===== //
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== NAVBAR SCROLL EFFECT ===== //
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
        }
    });

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS ===== //
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS ===== //
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .location-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== HERO CAROUSEL FUNCTIONALITY ===== //
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            const progress = indicator.querySelector('.indicator-progress');
            if (progress) {
                progress.style.animation = 'none';
                progress.style.width = '0';
            }
        });
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
            const progress = indicators[index].querySelector('.indicator-progress');
            if (progress) {
                setTimeout(() => {
                    progress.style.animation = 'progressFill 8s linear';
                    progress.style.width = '100%';
                }, 100);
            }
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Start the slideshow
    if (slides.length > 0) {
        // Initialize first slide
        showSlide(0);
        startSlideshow();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopSlideshow);
            heroSection.addEventListener('mouseleave', startSlideshow);
        }
    }
    
    // ===== GALLERY SCROLL FUNCTIONALITY ===== //
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    // Add click handlers for gallery cards
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`Gallery card ${index + 1} clicked`);
            // You can add lightbox functionality here
        });
    });

    // ===== CONTACT FORM HANDLING ===== //
    const contactForm = document.getElementById('inquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const newsletter = formData.get('newsletter');
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
            this.reset();
        });
    }

    // ===== UTILITY FUNCTIONS ===== //
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close functionality
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // ===== SCROLL TO TOP FUNCTIONALITY ===== //
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-color, #d4af37);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== PARALLAX EFFECT FOR HERO SECTION ===== //
    const heroSection = document.querySelector('.hero');
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    if (heroSection && heroSlides.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSlides.forEach(slide => {
                    slide.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                });
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS FOR NEW SECTIONS ===== //
    const attractionCards = document.querySelectorAll('.attraction-card');
    const aboutImages = document.querySelectorAll('.about-img-large, .about-img-small');
    
    const attractionObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    attractionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        attractionObserver.observe(card);
    });
    
    // Image hover effects
    aboutImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHT ===== //
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== FEATURE CARDS STAGGER ANIMATION ===== //
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animation
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureObserver.observe(card);
    });

    // ===== LOADING ANIMATION ===== //
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== CONSOLE WELCOME MESSAGE ===== //
    console.log('%c🏡 Welcome to Holbrook Estates', 'color: #c9a96e; font-size: 16px; font-weight: bold;');
    console.log('%cPremier Residential Development in Flathead Valley', 'color: #2c2c2c; font-size: 12px;');
});

// ===== GLOBAL FUNCTIONS FOR CAROUSEL CONTROLS ===== //
function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (direction === 1) {
        currentSlide = (currentSlide + 1) % slides.length;
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        const progress = indicator.querySelector('.indicator-progress');
        if (progress) {
            progress.style.animation = 'none';
            progress.style.width = '0';
        }
    });
    
    // Add active class to current
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Start progress animation
    const activeProgress = indicators[currentSlide].querySelector('.indicator-progress');
    if (activeProgress) {
        setTimeout(() => {
            activeProgress.style.animation = 'progressFill 8s linear';
            activeProgress.style.width = '100%';
        }, 100);
    }
}

function currentSlideFunc(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    currentSlide = index - 1;
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        const progress = indicator.querySelector('.indicator-progress');
        if (progress) {
            progress.style.animation = 'none';
            progress.style.width = '0';
        }
    });
    
    // Add active class to current
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Start progress animation
    const activeProgress = indicators[currentSlide].querySelector('.indicator-progress');
    if (activeProgress) {
        setTimeout(() => {
            activeProgress.style.animation = 'progressFill 8s linear';
            activeProgress.style.width = '100%';
        }, 100);
    }
}

// ===== GLOBAL FUNCTIONS FOR GALLERY SCROLL ===== //
function scrollGallery(direction) {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;
    
    const cardWidth = 350; // Card width + gap
    const scrollAmount = cardWidth + 32; // Include gap
    
    if (direction === 1) {
        galleryTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        galleryTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// ===== IMAGE MODAL FUNCTIONALITY ===== //
function openImageModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Make functions available globally
window.changeSlide = changeSlide;
window.currentSlide = currentSlideFunc;
window.scrollGallery = scrollGallery;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

// ===== CSS ANIMATIONS FOR NOTIFICATIONS ===== //
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: var(--accent-color, #c9a96e) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .scroll-to-top:hover {
        background-color: var(--accent-light, #e4d4b7) !important;
        transform: translateY(-2px);
    }
    
    .gallery-item {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .gallery-item.filtered-out {
        opacity: 0;
        transform: scale(0.8);
    }
`;

document.head.appendChild(style);

// ===== SPLASH SCREEN FUNCTIONALITY ===== //
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // Ensure splash screen is visible initially
    splashScreen.style.display = 'flex';
    mainContent.classList.remove('show');
    
    // Total splash duration: 4.5 seconds
    // - Logo animation: 0.5s delay + 1.5s duration = 2s
    // - Text animation: 1.2s delay + 1s duration = 2.2s
    // - Loader animation: 2.2s delay + 2s duration = 4.2s
    // - Extra buffer: 0.3s
    const splashDuration = 4500; // 4.5 seconds
    
    // Start the exit sequence
    setTimeout(() => {
        // Add fade-out class to splash screen
        splashScreen.classList.add('fade-out');
        
        // Show main content after splash starts fading
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 300);
        
        // Remove splash screen from DOM after fade completes
        setTimeout(() => {
            splashScreen.style.display = 'none';
            
            // Initialize other functionality after splash is complete
            initializeLightbox();
            
            // Trigger any scroll-based animations
            window.dispatchEvent(new Event('scroll'));
        }, 800);
        
    }, splashDuration);
}

// Preload critical images for smooth experience
function preloadImages() {
    const criticalImages = [
        'assets/IMG_4348.JPG', // Logo
        'assets/PTSC_0064.JPG', // Hero background
    ];
    
    let loadedCount = 0;
    const totalImages = criticalImages.length;
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                // All critical images loaded, start splash screen
                initializeSplashScreen();
            }
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                // Continue even if some images fail to load
                initializeSplashScreen();
            }
        };
        img.src = src;
    });
    
    // Fallback: start splash screen after 2 seconds even if images haven't loaded
    setTimeout(() => {
        if (loadedCount < totalImages) {
            initializeSplashScreen();
        }
    }, 2000);
}

// ===== SIMPLE LIGHTBOX FUNCTIONALITY ===== //
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('simple-lightbox');
    const image = document.getElementById('lightbox-image');
    const titleEl = document.getElementById('lightbox-title');
    const descriptionEl = document.getElementById('lightbox-description');
    
    // Set image and info
    image.src = imageSrc;
    image.alt = title;
    titleEl.textContent = title;
    descriptionEl.textContent = description;
    
    // Show lightbox
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('simple-lightbox');
    
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close lightbox when clicking outside the content
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('simple-lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('simple-lightbox');
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        }
    }
});

// Initialize plot map lightbox
function initializePlotMapLightbox() {
    const plotMapItems = document.querySelectorAll('.plot-map-item');
    
    plotMapItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.plot-img');
            const title = item.dataset.title;
            const description = item.dataset.description;
            
            openLightbox(img.src, title, description);
        });
    });
}

// Initialize clickable images lightbox
function initializeClickableImages() {
    const clickableImages = document.querySelectorAll('.clickable-img');
    
    clickableImages.forEach(img => {
        img.addEventListener('click', () => {
            const title = img.dataset.title || img.alt;
            const description = img.dataset.description || '';
            
            openLightbox(img.src, title, description);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start preloading and splash sequence
    preloadImages();
    
    // Initialize lightbox functionality after a short delay
    setTimeout(() => {
        initializePlotMapLightbox();
        initializeClickableImages();
    }, 1000);
});
