// Popup functionality
class Popup {
    constructor() {
        this.createPopupElement();
    }

    createPopupElement() {
        // Remove existing popup if any
        const existingPopup = document.getElementById('customPopup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup HTML
        const popupHTML = `
            <div id="customPopup" class="popup-overlay">
                <div class="popup">
                    <div class="popup-icon" id="popupIcon"></div>
                    <h3 id="popupTitle"></h3>
                    <p id="popupMessage"></p>
                    <button class="popup-btn" id="popupBtn" onclick="hidePopup()">OK</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    show(type, title, message, buttonText = 'OK') {
        const popup = document.getElementById('customPopup');
        const icon = document.getElementById('popupIcon');
        const titleEl = document.getElementById('popupTitle');
        const messageEl = document.getElementById('popupMessage');
        const btnEl = document.getElementById('popupBtn');

        // Set icon based on type
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        icon.textContent = icons[type] || icons.info;
        icon.className = `popup-icon ${type}`;
        titleEl.textContent = title;
        messageEl.textContent = message;
        btnEl.textContent = buttonText;

        popup.classList.add('show');
    }

    hide() {
        const popup = document.getElementById('customPopup');
        if (popup) {
            popup.classList.remove('show');
        }
    }
}

// Global popup instance
let popupInstance = null;

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    popupInstance = new Popup();
});

// Global function to show popup
function showPopup(type, title, message, buttonText = 'OK') {
    if (!popupInstance) {
        popupInstance = new Popup();
    }
    
    // Ensure popup is visible
    setTimeout(() => {
        popupInstance.show(type, title, message, buttonText);
    }, 100);
}

// Global function to hide popup
function hidePopup() {
    if (popupInstance) {
        popupInstance.hide();
    }
}

// Contact Form Handler
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            showPopup('error', 'Validation Error', 'Please fill in all required fields marked with *');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showPopup('error', 'Invalid Email', 'Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showPopup('success', 'Message Sent!', 'Thank you for your message! I\'ll get back to you within 24 hours.');
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // Log form data (remove in production)
        console.log('Form Data:', data);
    });
}

// Form interaction animations
function initializeFormAnimations() {
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Newsletter signup handler
function initializeNewsletterSignup() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (!newsletterBtn || !newsletterInput) return;

    newsletterBtn.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showPopup('warning', 'Email Required', 'Please enter your email address to subscribe.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showPopup('error', 'Invalid Email', 'Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const originalText = this.textContent;
        this.textContent = 'Subscribing...';
        this.disabled = true;
        
        setTimeout(() => {
            showPopup('success', 'Subscribed!', 'Thank you for subscribing! I\'ll notify you when new posts are available.');
            newsletterInput.value = '';
            
            // Reset button
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });

    // Allow Enter key to submit
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            newsletterBtn.click();
        }
    });
}

// Blog card click handler
function initializeBlogCards() {
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent popup if clicking on a read-more link
            if (e.target.classList.contains('read-more') || e.target.closest('.read-more')) {
                e.preventDefault();
                showPopup('info', 'Coming Soon!', 'Blog post details will be available shortly. Full articles are in development.');
                return;
            }
            
            // Show popup for card clicks
            showPopup('info', 'Coming Soon!', 'Blog post details will be available shortly. Full articles are in development.');
        });
    });
    
    // Also handle read-more links specifically
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPopup('info', 'Coming Soon!', 'Blog post details will be available shortly. Full articles are in development.');
        });
    });
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Fade in elements on scroll
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

    // Observe all sections and cards
    document.querySelectorAll('.section, .blog-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Skills interaction
function initializeSkillsInteraction() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const skill = this.textContent;
            showPopup('info', 'Skill Details', `Would you like to know more about my experience with ${skill}? Feel free to contact me for detailed discussions.`);
        });
    });
}

// Certification interaction
function initializeCertificationInteraction() {
    document.querySelectorAll('.cert-item').forEach(cert => {
        cert.addEventListener('click', function() {
            const certification = this.textContent;
            showPopup('info', 'Certification Details', `${certification} - Click to view verification details or contact me for more information about this certification.`);
        });
    });
}

// Enhanced Contact Page Interactions
function initializeContactEnhancements() {
    // Animate tech stats on page load
    animateTechStats();
    
    // Add particle animation to contact info
    createParticleEffect();
    
    // Add typing effect to contact section title
    addTypingEffect();
    
    // Add progressive enhancement for contact items
    enhanceContactItems();
}

// Animate tech stats with counting effect
function animateTechStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalValue = statNumber.textContent.trim();
                
                // Extract number from text (e.g., "24h" -> 24, "100+" -> 100)
                const numMatch = finalValue.match(/(\d+)/);
                if (numMatch) {
                    const targetNumber = parseInt(numMatch[1]);
                    const suffix = finalValue.replace(/\d+/, '');
                    
                    animateCounter(statNumber, 0, targetNumber, suffix, 2000);
                }
                
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Counter animation function
function animateCounter(element, start, end, suffix, duration) {
    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = Math.max(stepTime, minTimer);
    
    let current = start;
    const increment = end > start ? 1 : -1;
    
    const counter = setInterval(() => {
        current += increment;
        element.textContent = current + suffix;
        
        if (current === end) {
            clearInterval(counter);
            // Add a subtle glow effect when animation completes
            element.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
            setTimeout(() => {
                element.style.textShadow = '';
            }, 1000);
        }
    }, timer);
}

// Create dynamic particle effect
function createParticleEffect() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;
    
    // Create additional floating particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${i % 2 === 0 ? '#667eea' : '#764ba2'};
            border-radius: 50%;
            opacity: 0.4;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${Math.random() * 10 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        contactInfo.appendChild(particle);
    }
    
    // Add CSS animation for floating particles
    if (!document.getElementById('particleAnimations')) {
        const style = document.createElement('style');
        style.id = 'particleAnimations';
        style.textContent = `
            @keyframes floatRandom {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(20px, -30px) rotate(90deg);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-15px, -50px) rotate(180deg);
                    opacity: 0.8;
                }
                75% {
                    transform: translate(-30px, -20px) rotate(270deg);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add typing effect to section title
function addTypingEffect() {
    const title = document.querySelector('.contact-info h2');
    if (!title) return;
    
    const originalText = title.textContent;
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: #667eea;
        font-weight: normal;
    `;
    
    title.textContent = '';
    title.appendChild(cursor);
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            title.insertBefore(document.createTextNode(originalText.charAt(i)), cursor);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 2000);
        }
    }, 100);
}

// Enhance contact items with progressive disclosure
function enhanceContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        // Add data attribute for enhanced styling
        item.setAttribute('data-index', index);
        
        // Add click effect
        item.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover effect simulation (visual feedback)
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add ripple effect animation CSS
    if (!document.getElementById('rippleEffect')) {
        const style = document.createElement('style');
        style.id = 'rippleEffect';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Gallery Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const gallery = document.getElementById('scrollableGallery');

    if (scrollLeftBtn && scrollRightBtn && gallery) {
        scrollLeftBtn.addEventListener('click', function() {
            gallery.scrollBy({
                left: -320, // Scroll by width of one item plus gap
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', function() {
            gallery.scrollBy({
                left: 320, // Scroll by width of one item plus gap
                behavior: 'smooth'
            });
        });

        // Show/hide buttons based on scroll position
        function updateButtonVisibility() {
            const scrollLeft = gallery.scrollLeft;
            const maxScroll = gallery.scrollWidth - gallery.clientWidth;

            scrollLeftBtn.style.opacity = scrollLeft > 10 ? '1' : '0.3';
            scrollRightBtn.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0.3';
        }

        gallery.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility(); // Initial check
    }
});

// Enhanced Blog Page Functionality
function initializeBlogPageEnhancements() {
    // Add reading time estimation to blog cards
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        const excerpt = card.querySelector('.blog-excerpt');
        if (excerpt) {
            const wordCount = excerpt.textContent.split(' ').length;
            const readingTime = Math.ceil(wordCount / 200); // Average reading speed
            
            // Create reading time element
            const readingTimeEl = document.createElement('div');
            readingTimeEl.className = 'reading-time';
            readingTimeEl.innerHTML = `⏱️ ${readingTime} min read`;
            
            // Insert after blog date
            const blogDate = card.querySelector('.blog-date');
            if (blogDate) {
                blogDate.insertAdjacentElement('afterend', readingTimeEl);
            }
        }
    });

    // Add scroll-triggered animations for blog cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });

    // Enhanced newsletter validation
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterInput && newsletterBtn) {
        newsletterInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (isValid) {
                this.style.borderColor = '#4CAF50';
                newsletterBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            } else if (email.length > 0) {
                this.style.borderColor = '#f44336';
                newsletterBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            } else {
                this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                newsletterBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing website functionality...');
    
    // Initialize all modules
    initializeContactForm();
    initializeFormAnimations();
    initializeNewsletterSignup();
    initializeBlogCards();
    initializeSmoothScrolling();
    initializeLoadingAnimations();
    initializeSkillsInteraction();
    initializeCertificationInteraction();
    initializeContactEnhancements();
    initializeBlogPageEnhancements();
    
    console.log('Website functionality initialized successfully!');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
window.addEventListener('load', function() {
    // Mark page as fully loaded
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showPopup('error', 'Something went wrong', 'Please refresh the page or contact me if the problem persists.');
});

// Service worker registration (for future PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here in the future
        console.log('Service worker support detected');
    });
}
