// Back to Top Component
class BackToTop {
    constructor() {
        this.button = null;
        this.isVisible = false;
        this.scrollThreshold = 300;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
        this.handleScroll();
    }

    createButton() {
        // Create the back to top button
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.setAttribute('title', 'Back to top (Ctrl + ↑)');
        
        this.button.innerHTML = `
            <svg class="back-to-top-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20V9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <div class="back-to-top-tooltip">
                Back to top <span class="keyboard-shortcut">Ctrl+↑</span>
            </div>
        `;
        
        document.body.appendChild(this.button);
    }

    bindEvents() {
        // Scroll event listener
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100));
        
        // Click event listener
        this.button.addEventListener('click', this.scrollToTop.bind(this));
        
        // Keyboard shortcut listener
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Mouse events for enhanced UX
        this.button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Determine scroll direction
        this.scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
        this.lastScrollTop = scrollTop;
        
        // Show/hide button based on scroll position
        if (scrollTop > this.scrollThreshold && !this.isVisible) {
            this.showButton();
        } else if (scrollTop <= this.scrollThreshold && this.isVisible) {
            this.hideButton();
        }
        
        // Add pulse effect when user is near bottom
        if (scrollPercentage > 80 && !this.button.classList.contains('pulse')) {
            this.button.classList.add('pulse');
        } else if (scrollPercentage <= 80 && this.button.classList.contains('pulse')) {
            this.button.classList.remove('pulse');
        }
    }

    showButton() {
        this.isVisible = true;
        this.button.classList.add('visible');
        
        // Announce to screen readers
        this.button.setAttribute('aria-hidden', 'false');
    }

    hideButton() {
        this.isVisible = false;
        this.button.classList.remove('visible', 'pulse');
        
        // Hide from screen readers
        this.button.setAttribute('aria-hidden', 'true');
    }

    scrollToTop() {
        // Smooth scroll to top with easing
        const startPosition = window.pageYOffset;
        const distance = startPosition;
        const duration = Math.min(1000, Math.max(500, distance / 3)); // Dynamic duration
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition - (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                // Focus management for accessibility
                const header = document.querySelector('header, h1, .header');
                if (header) {
                    header.focus();
                }
            }
        };

        requestAnimationFrame(animateScroll);
        
        // Visual feedback
        this.button.style.transform = 'translateY(0) scale(0.9)';
        setTimeout(() => {
            this.button.style.transform = '';
        }, 150);
    }

    handleKeydown(event) {
        // Ctrl + Up Arrow shortcut
        if (event.ctrlKey && event.key === 'ArrowUp') {
            event.preventDefault();
            
            if (this.isVisible) {
                this.scrollToTop();
            } else if (window.pageYOffset > 0) {
                // Show button temporarily if not visible but page is scrolled
                this.showButton();
                this.scrollToTop();
            }
        }
        
        // Alternative shortcuts
        if (event.key === 'Home' && event.ctrlKey) {
            event.preventDefault();
            this.scrollToTop();
        }
    }

    handleMouseEnter() {
        // Add hover effect enhancement
        this.button.style.transform = 'translateY(-3px) scale(1.1)';
    }

    handleMouseLeave() {
        // Reset transform
        this.button.style.transform = '';
    }

    // Throttle function to limit scroll event frequency
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public method to manually trigger scroll to top
    static scrollToTop() {
        if (window.backToTopInstance) {
            window.backToTopInstance.scrollToTop();
        }
    }

    // Public method to show/hide button manually
    static toggle(show) {
        if (window.backToTopInstance) {
            if (show) {
                window.backToTopInstance.showButton();
            } else {
                window.backToTopInstance.hideButton();
            }
        }
    }
}

// Initialize back to top component when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already initialized
    if (!window.backToTopInstance) {
        window.backToTopInstance = new BackToTop();
        
        // Add global keyboard shortcut information
        console.log('🚀 Back to Top: Press Ctrl+↑ to scroll to top');
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackToTop;
}
