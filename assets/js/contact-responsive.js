/**
 * Enhanced Contact Page Responsive JavaScript
 * Handles responsive interactions, form validation, and mobile optimizations
 */

class ContactPageEnhancer {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.setupResponsiveElements();
        this.initializeFormEnhancements();
        this.setupGalleryEnhancements();
        this.initializeMobileOptimizations();
        this.setupAccessibilityFeatures();
    }

    bindEvents() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Orientation change for mobile devices
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });

        // Form interaction events
        this.bindFormEvents();
        
        // Gallery touch events for mobile
        if (this.isTouch) {
            this.bindTouchEvents();
        }
    }

    setupResponsiveElements() {
        // Add responsive classes based on device type
        document.body.classList.toggle('is-mobile', this.isMobile);
        document.body.classList.toggle('is-tablet', this.isTablet);
        document.body.classList.toggle('is-touch', this.isTouch);
        
        // Setup responsive containers
        this.setupResponsiveContainers();
    }

    setupResponsiveContainers() {
        const containers = document.querySelectorAll('.contact-content, .tech-stats, .gallery-container');
        
        containers.forEach(container => {
            if (this.isMobile) {
                container.classList.add('mobile-layout');
            } else {
                container.classList.remove('mobile-layout');
            }
        });
    }

    initializeFormEnhancements() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Add form validation
        this.setupFormValidation(form);
        
        // Add loading states
        this.setupFormLoadingStates(form);
        
        // Add auto-save for mobile (draft functionality)
        if (this.isMobile) {
            this.setupAutoSave(form);
        }
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
            
            // Mobile-specific enhancements
            if (this.isMobile) {
                this.enhanceFieldForMobile(input);
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Must be at least 2 characters';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please describe your project';
                } else if (value.length < 20) {
                    isValid = false;
                    errorMessage = 'Please provide more details (at least 20 characters)';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    enhanceFieldForMobile(input) {
        // Add appropriate input types and attributes for mobile
        const fieldName = input.getAttribute('name');
        
        switch (fieldName) {
            case 'email':
                input.setAttribute('inputmode', 'email');
                input.setAttribute('autocomplete', 'email');
                break;
            case 'firstName':
                input.setAttribute('autocomplete', 'given-name');
                break;
            case 'lastName':
                input.setAttribute('autocomplete', 'family-name');
                break;
            case 'company':
                input.setAttribute('autocomplete', 'organization');
                break;
        }

        // Add touch-friendly focus handling
        input.addEventListener('focus', () => {
            if (this.isMobile) {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    }

    setupFormLoadingStates(form) {
        const submitBtn = form.querySelector('.submit-btn');
        if (!submitBtn) return;

        this.originalSubmitText = submitBtn.textContent;
    }

    handleFormSubmission(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError('Please fix the errors above and try again.');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        this.showLoadingState(submitBtn);

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            this.hideLoadingState(submitBtn);
            this.showSuccessMessage();
            form.reset();
        }, 2000);
    }

    showLoadingState(button) {
        button.disabled = true;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            Sending...
        `;
        button.classList.add('loading');
    }

    hideLoadingState(button) {
        button.disabled = false;
        button.textContent = this.originalSubmitText;
        button.classList.remove('loading');
    }

    showFormError(message) {
        this.showNotification(message, 'error');
    }

    showSuccessMessage() {
        this.showNotification('Thank you! Your message has been sent successfully.', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);

        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    setupAutoSave(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', this.debounce(() => {
                this.saveFormData(form);
            }, 1000));
        });

        // Load saved data on page load
        this.loadFormData(form);
    }

    saveFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        localStorage.setItem('contactFormDraft', JSON.stringify(data));
    }

    loadFormData(form) {
        const savedData = localStorage.getItem('contactFormDraft');
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.warn('Could not load saved form data:', e);
        }
    }

    setupGalleryEnhancements() {
        const gallery = document.getElementById('scrollableGallery');
        if (!gallery) return;

        // Enhanced scrolling for mobile
        if (this.isMobile) {
            this.setupMobileGalleryScrolling(gallery);
        }

        // Lazy loading for gallery images
        this.setupLazyLoading();
        
        // Touch gestures for gallery
        if (this.isTouch) {
            this.setupGalleryTouchGestures(gallery);
        }
    }

    setupMobileGalleryScrolling(gallery) {
        // Add scroll indicators
        this.addScrollIndicators(gallery);
        
        // Smooth scroll snap
        gallery.style.scrollSnapType = 'x mandatory';
        
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.style.scrollSnapAlign = 'center';
        });
    }

    addScrollIndicators(gallery) {
        const container = gallery.closest('.gallery-container');
        if (!container) return;

        const indicators = document.createElement('div');
        indicators.className = 'gallery-indicators';
        
        const items = gallery.querySelectorAll('.gallery-item');
        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'indicator-dot';
            dot.setAttribute('data-index', index);
            indicators.appendChild(dot);
        });

        container.appendChild(indicators);

        // Update active indicator on scroll
        gallery.addEventListener('scroll', this.debounce(() => {
            this.updateScrollIndicators(gallery, indicators);
        }, 100));

        // Click handlers for indicators
        indicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator-dot')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.scrollToGalleryItem(gallery, index);
            }
        });
    }

    updateScrollIndicators(gallery, indicators) {
        const items = gallery.querySelectorAll('.gallery-item');
        const dots = indicators.querySelectorAll('.indicator-dot');
        
        const scrollLeft = gallery.scrollLeft;
        const itemWidth = items[0].offsetWidth + 16; // Include gap
        const activeIndex = Math.round(scrollLeft / itemWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    scrollToGalleryItem(gallery, index) {
        const items = gallery.querySelectorAll('.gallery-item');
        const item = items[index];
        
        if (item) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('.gallery-image, .contact-hero');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupGalleryTouchGestures(gallery) {
        let startX = 0;
        let scrollStart = 0;
        let isScrolling = false;

        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            scrollStart = gallery.scrollLeft;
            isScrolling = true;
        });

        gallery.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            gallery.scrollLeft = scrollStart + diff;
        });

        gallery.addEventListener('touchend', () => {
            isScrolling = false;
        });
    }

    bindTouchEvents() {
        // Enhanced touch interactions for mobile
        const touchElements = document.querySelectorAll('.contact-item, .gallery-item, .submit-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    initializeMobileOptimizations() {
        if (!this.isMobile) return;

        // Prevent zoom on input focus
        this.preventInputZoom();
        
        // Optimize scroll behavior
        this.optimizeScrollBehavior();
        
        // Add mobile-specific classes
        document.body.classList.add('mobile-optimized');
    }

    preventInputZoom() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.style.fontSize === '' || parseFloat(input.style.fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
    }

    optimizeScrollBehavior() {
        // Improve scroll performance on mobile
        document.documentElement.style.webkitOverflowScrolling = 'touch';
        
        // Add momentum scrolling to gallery
        const gallery = document.getElementById('scrollableGallery');
        if (gallery) {
            gallery.style.webkitOverflowScrolling = 'touch';
        }
    }

    setupAccessibilityFeatures() {
        // Add ARIA labels and roles
        this.enhanceAccessibility();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
    }

    enhanceAccessibility() {
        // Add proper ARIA labels
        const form = document.getElementById('contactForm');
        if (form) {
            form.setAttribute('aria-label', 'Contact form');
        }

        const gallery = document.getElementById('scrollableGallery');
        if (gallery) {
            gallery.setAttribute('role', 'region');
            gallery.setAttribute('aria-label', 'Microsoft technology gallery');
        }

        // Add screen reader text for buttons
        const scrollButtons = document.querySelectorAll('.scroll-btn');
        scrollButtons.forEach((btn, index) => {
            const direction = index === 0 ? 'left' : 'right';
            btn.setAttribute('aria-label', `Scroll gallery ${direction}`);
        });
    }

    setupKeyboardNavigation() {
        // Gallery keyboard navigation
        const gallery = document.getElementById('scrollableGallery');
        if (gallery) {
            gallery.setAttribute('tabindex', '0');
            
            gallery.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.scrollGallery(gallery, -1);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.scrollGallery(gallery, 1);
                        break;
                }
            });
        }
    }

    scrollGallery(gallery, direction) {
        const scrollAmount = 300;
        gallery.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    }

    setupFocusManagement() {
        // Manage focus for better UX
        const form = document.getElementById('contactForm');
        if (form) {
            const firstInput = form.querySelector('input, textarea');
            if (firstInput) {
                // Focus first input when form becomes visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                            setTimeout(() => {
                                if (!this.isMobile) { // Don't auto-focus on mobile
                                    firstInput.focus();
                                }
                            }, 500);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(form);
            }
        }
    }

    handleResize() {
        const wasMobile = this.isMobile;
        const wasTablet = this.isTablet;
        
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        if (wasMobile !== this.isMobile || wasTablet !== this.isTablet) {
            this.setupResponsiveElements();
            
            // Reinitialize mobile-specific features
            if (this.isMobile && !wasMobile) {
                this.initializeMobileOptimizations();
            }
        }
    }

    handleOrientationChange() {
        // Handle orientation change for better UX
        setTimeout(() => {
            this.handleResize();
            
            // Recalculate gallery layout
            const gallery = document.getElementById('scrollableGallery');
            if (gallery) {
                gallery.scrollTo({ left: 0, behavior: 'smooth' });
            }
        }, 100);
    }

    // Utility function for debouncing
    debounce(func, wait) {
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
}

// CSS for enhanced features
const enhancedStyles = `
    <style>
        /* Enhanced Form Styles */
        .form-group.error input,
        .form-group.error textarea,
        .form-group.error select {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        }
        
        /* Loading Button State */
        .submit-btn.loading {
            position: relative;
            color: transparent;
        }
        
        .loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background: white;
        }
        
        .notification-success .notification-content {
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            border-left: 4px solid #28a745;
        }
        
        .notification-error .notification-content {
            background: linear-gradient(135deg, #f8d7da, #f5c6cb);
            border-left: 4px solid #dc3545;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 1.125rem;
        }
        
        .notification-message {
            flex: 1;
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            color: #6c757d;
        }
        
        /* Gallery Indicators */
        .gallery-indicators {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .indicator-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: rgba(102, 126, 234, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .indicator-dot.active {
            background: #667eea;
            transform: scale(1.2);
        }
        
        /* Touch Active States */
        .touch-active {
            transform: scale(0.98);
            opacity: 0.8;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .notification {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .notification-content {
                padding: 0.875rem 1rem;
            }
            
            .gallery-indicators {
                margin-top: 0.75rem;
            }
            
            .indicator-dot {
                width: 10px;
                height: 10px;
            }
        }
        
        /* Focus Styles for Accessibility */
        .gallery-container:focus-within .scroll-btn {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .indicator-dot:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
    </style>
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add enhanced styles
    document.head.insertAdjacentHTML('beforeend', enhancedStyles);
    
    // Initialize contact page enhancer
    new ContactPageEnhancer();
});
