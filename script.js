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
    popupInstance.show(type, title, message, buttonText);
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
        card.addEventListener('click', function() {
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
