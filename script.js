// ================================================
// RESPONSIVE WEBSITE FUNCTIONALITY
// ================================================

// Global Variables
let is24HourFormat = true;
let clockInterval;
let isMenuOpen = false;
let currentBreakpoint = '';

// Breakpoint Configuration
const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1200
};

// ================================================
// DEVICE DETECTION & RESPONSIVE UTILITIES
// ================================================
class ResponsiveManager {
    constructor() {
        this.currentBreakpoint = this.getBreakpoint();
        this.isTouchDevice = this.checkTouchDevice();
        this.orientation = this.getOrientation();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateResponsiveClasses();
        this.handleResponsiveElements();
    }
    
    bindEvents() {
        // Debounced resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Touch and hover detection
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        
        // Keyboard navigation support
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
    }
    
    getBreakpoint() {
        const width = window.innerWidth;
        if (width <= BREAKPOINTS.mobile) return 'mobile';
        if (width <= BREAKPOINTS.tablet) return 'tablet';
        if (width <= BREAKPOINTS.desktop) return 'desktop';
        return 'large';
    }
    
    checkTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }
    
    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        const newOrientation = this.getOrientation();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.updateResponsiveClasses();
            this.handleBreakpointChange();
        }
        
        if (newOrientation !== this.orientation) {
            this.orientation = newOrientation;
            this.handleOrientationChange();
        }
        
        this.handleResponsiveElements();
    }
    
    handleOrientationChange() {
        document.body.classList.toggle('portrait', this.orientation === 'portrait');
        document.body.classList.toggle('landscape', this.orientation === 'landscape');
        
        // Specific orientation handling for mobile
        if (this.currentBreakpoint === 'mobile') {
            this.adjustMobileOrientation();
        }
    }
    
    updateResponsiveClasses() {
        const body = document.body;
        
        // Remove all breakpoint classes
        Object.keys(BREAKPOINTS).forEach(bp => {
            body.classList.remove(`bp-${bp}`);
        });
        
        // Add current breakpoint class
        body.classList.add(`bp-${this.currentBreakpoint}`);
        
        // Add touch device class
        body.classList.toggle('touch-device', this.isTouchDevice);
        body.classList.toggle('no-touch', !this.isTouchDevice);
    }
    
    handleBreakpointChange() {
        console.log(`Breakpoint changed to: ${this.currentBreakpoint}`);
        
        // Close mobile menu if switching to desktop
        if (this.currentBreakpoint !== 'mobile' && isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Adjust layout components
        this.adjustNavigation();
        this.adjustGridLayouts();
        this.adjustTypography();
        this.adjustSpacing();
    }
    
    adjustMobileOrientation() {
        const navigation = document.querySelector('.navigation');
        if (navigation && this.orientation === 'landscape') {
            navigation.style.padding = '0.25rem 1rem';
        } else if (navigation) {
            navigation.style.padding = '';
        }
    }
    
    adjustNavigation() {
        const navigation = document.querySelector('.navigation');
        const navRight = document.querySelector('.nav-right');
        
        if (!navigation) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                this.createMobileNavigation();
                if (navRight) navRight.style.display = isMenuOpen ? 'flex' : 'none';
                break;
            case 'tablet':
                this.adjustTabletNavigation();
                if (navRight) navRight.style.display = 'flex';
                break;
            default:
                this.resetDesktopNavigation();
                if (navRight) navRight.style.display = 'flex';
                break;
        }
    }
    
    createMobileNavigation() {
        const navigation = document.querySelector('.navigation');
        if (!navigation || navigation.querySelector('.mobile-menu-toggle')) return;
        
        // Create hamburger menu
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        hamburger.setAttribute('aria-label', 'Toggle mobile menu');
        
        navigation.insertBefore(hamburger, navigation.firstChild);
        
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Handle nav links clicks
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.currentBreakpoint === 'mobile') {
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        const navigation = document.querySelector('.navigation');
        const hamburger = document.querySelector('.mobile-menu-toggle');
        const navRight = document.querySelector('.nav-right');
        
        navigation.classList.toggle('menu-open', isMenuOpen);
        hamburger.classList.toggle('active', isMenuOpen);
        
        if (navRight) {
            navRight.style.display = isMenuOpen ? 'flex' : 'none';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        isMenuOpen = false;
        const navigation = document.querySelector('.navigation');
        const hamburger = document.querySelector('.mobile-menu-toggle');
        const navRight = document.querySelector('.nav-right');
        
        if (navigation) navigation.classList.remove('menu-open');
        if (hamburger) hamburger.classList.remove('active');
        if (navRight) navRight.style.display = 'none';
        
        document.body.style.overflow = '';
    }
    
    adjustTabletNavigation() {
        // Remove mobile menu if it exists
        const hamburger = document.querySelector('.mobile-menu-toggle');
        if (hamburger) hamburger.remove();
        
        // Reset navigation state
        const navigation = document.querySelector('.navigation');
        if (navigation) navigation.classList.remove('menu-open');
        
        document.body.style.overflow = '';
        isMenuOpen = false;
    }
    
    resetDesktopNavigation() {
        this.adjustTabletNavigation(); // Same as tablet for now
    }
    
    adjustGridLayouts() {
        this.adjustStatsGrid();
        this.adjustSkillsGrid();
        this.adjustBlogGrid();
        this.adjustContactLayout();
        this.adjustGallery();
    }
    
    adjustStatsGrid() {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                statsGrid.style.gridTemplateColumns = '1fr';
                statsGrid.style.gap = '1rem';
                break;
            case 'tablet':
                statsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                statsGrid.style.gap = '1.5rem';
                break;
            default:
                statsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                statsGrid.style.gap = '2rem';
                break;
        }
    }
    
    adjustSkillsGrid() {
        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                skillsGrid.style.gridTemplateColumns = '1fr';
                skillsGrid.style.gap = '1rem';
                break;
            case 'tablet':
                skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                skillsGrid.style.gap = '1.5rem';
                break;
            default:
                skillsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                skillsGrid.style.gap = '2rem';
                break;
        }
    }
    
    adjustBlogGrid() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                blogGrid.style.gridTemplateColumns = '1fr';
                blogGrid.style.gap = '1.5rem';
                break;
            case 'tablet':
                blogGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                blogGrid.style.gap = '2rem';
                break;
            default:
                blogGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                blogGrid.style.gap = '2rem';
                break;
        }
    }
    
    adjustContactLayout() {
        const contactContent = document.querySelector('.contact-content');
        if (!contactContent) return;
        
        if (this.currentBreakpoint === 'mobile' || this.currentBreakpoint === 'tablet') {
            contactContent.style.flexDirection = 'column';
            contactContent.style.gap = '2rem';
        } else {
            contactContent.style.flexDirection = 'row';
            contactContent.style.gap = '3rem';
        }
    }
    
    adjustGallery() {
        const gallery = document.querySelector('.contact-gallery');
        if (!gallery) return;
        
        const scrollBtns = document.querySelectorAll('.scroll-btn');
        
        if (this.currentBreakpoint === 'mobile') {
            // Hide scroll buttons on mobile, enable touch scrolling
            scrollBtns.forEach(btn => btn.style.display = 'none');
            gallery.style.overflowX = 'auto';
            gallery.style.scrollBehavior = 'smooth';
        } else {
            // Show scroll buttons on larger screens
            scrollBtns.forEach(btn => btn.style.display = 'flex');
            gallery.style.overflowX = 'hidden';
        }
    }
    
    adjustTypography() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                container.style.fontSize = '14px';
                break;
            case 'tablet':
                container.style.fontSize = '15px';
                break;
            default:
                container.style.fontSize = '16px';
                break;
        }
    }
    
    adjustSpacing() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                container.style.padding = '1rem';
                break;
            case 'tablet':
                container.style.padding = '1.5rem';
                break;
            default:
                container.style.padding = '2rem';
                break;
        }
    }
    
    handleResponsiveElements() {
        this.adjustImages();
        this.adjustForms();
        this.adjustCards();
    }
    
    adjustImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (this.currentBreakpoint === 'mobile') {
                img.style.width = '100%';
                img.style.height = 'auto';
            }
        });
    }
    
    adjustForms() {
        const formRows = document.querySelectorAll('.form-row');
        formRows.forEach(row => {
            if (this.currentBreakpoint === 'mobile') {
                row.style.flexDirection = 'column';
                row.style.gap = '1rem';
            } else {
                row.style.flexDirection = 'row';
                row.style.gap = '1rem';
            }
        });
    }
    
    adjustCards() {
        const cards = document.querySelectorAll('.blog-card, .stat-item, .contact-item');
        cards.forEach(card => {
            if (this.currentBreakpoint === 'mobile') {
                card.style.margin = '0 0 1rem 0';
            } else {
                card.style.margin = '';
            }
        });
    }
    
    handleTouchStart() {
        document.body.classList.add('touch-active');
    }
    
    handleKeyNavigation(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            this.closeMobileMenu();
        }
    }
    
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

// ================================================
// RESPONSIVE CLOCK FUNCTIONALITY
// ================================================
class ResponsiveClock {
    constructor() {
        this.is24HourFormat = true;
        this.clockInterval = null;
        this.currentBreakpoint = 'desktop';
        this.clockTimeElement = document.getElementById('clock-time');
        this.clockDateElement = document.getElementById('clock-date');
        this.toggleBtn = document.getElementById('timeFormatToggle');
        this.navRight = document.querySelector('.nav-right');
        
        this.init();
    }
    
    init() {
        this.loadTimeFormatPreference();
        this.adaptToBreakpoint();
        this.startClock();
        this.bindEvents();
    }
    
    bindEvents() {
        // Toggle button event
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTimeFormat());
            this.addButtonFeedback();
        }
        
        // Resize event
        window.addEventListener('resize', this.debounce(() => {
            this.adaptToBreakpoint();
        }, 250));
        
        // Visibility change event to pause/resume clock
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseClock();
            } else {
                this.resumeClock();
            }
        });
    }
    
    adaptToBreakpoint() {
        const width = window.innerWidth;
        let newBreakpoint = 'desktop';
        
        if (width <= 480) {
            newBreakpoint = 'mobile';
        } else if (width <= 768) {
            newBreakpoint = 'tablet';
        }
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.adjustClockForBreakpoint();
        }
    }
    
    adjustClockForBreakpoint() {
        if (!this.navRight) return;
        
        // Remove previous breakpoint classes
        this.navRight.classList.remove('clock-mobile', 'clock-tablet', 'clock-desktop');
        
        // Add current breakpoint class
        this.navRight.classList.add(`clock-${this.currentBreakpoint}`);
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                // Hide clock completely on mobile
                this.navRight.style.display = 'none';
                this.navRight.style.visibility = 'hidden';
                break;
            case 'tablet':
                // Hide clock on tablet as well
                this.navRight.style.display = 'none';
                this.navRight.style.visibility = 'hidden';
                break;
            default:
                // Show clock on desktop and larger screens (>768px)
                this.navRight.style.display = 'flex';
                this.navRight.style.visibility = 'visible';
                this.adjustDesktopClock();
                break;
        }
        
        // Update clock display immediately only if visible
        if (this.currentBreakpoint === 'desktop') {
            this.updateClock();
        }
    }
    
    adjustMobileClock() {
        // Compact display for mobile
        if (this.clockTimeElement) {
            this.clockTimeElement.style.fontSize = '0.8rem';
            this.clockTimeElement.style.fontWeight = '600';
        }
        if (this.clockDateElement) {
            this.clockDateElement.style.fontSize = '0.7rem';
            this.clockDateElement.style.opacity = '0.8';
        }
        
        // Make toggle button smaller but still touchable
        if (this.toggleBtn) {
            this.toggleBtn.style.transform = 'scale(0.9)';
        }
        
        // Adjust layout
        if (this.navRight) {
            this.navRight.style.flexDirection = 'column';
            this.navRight.style.alignItems = 'center';
            this.navRight.style.gap = '0.3rem';
        }
    }
    
    adjustTabletClock() {
        // Medium size for tablet
        if (this.clockTimeElement) {
            this.clockTimeElement.style.fontSize = '0.9rem';
            this.clockTimeElement.style.fontWeight = '500';
        }
        if (this.clockDateElement) {
            this.clockDateElement.style.fontSize = '0.75rem';
            this.clockDateElement.style.opacity = '0.9';
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.style.transform = 'scale(0.95)';
        }
        
        if (this.navRight) {
            this.navRight.style.flexDirection = 'row';
            this.navRight.style.alignItems = 'center';
            this.navRight.style.gap = '0.75rem';
        }
    }
    
    adjustDesktopClock() {
        // Full size for desktop
        if (this.clockTimeElement) {
            this.clockTimeElement.style.fontSize = '1rem';
            this.clockTimeElement.style.fontWeight = '500';
        }
        if (this.clockDateElement) {
            this.clockDateElement.style.fontSize = '0.8rem';
            this.clockDateElement.style.opacity = '1';
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.style.transform = 'scale(1)';
        }
        
        if (this.navRight) {
            this.navRight.style.flexDirection = 'row';
            this.navRight.style.alignItems = 'center';
            this.navRight.style.gap = '1rem';
        }
    }
    
    startClock() {
        this.updateClock();
        this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }
    
    pauseClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }
    
    resumeClock() {
        if (!this.clockInterval) {
            this.startClock();
        }
    }
    
    updateClock() {
        if (!this.clockTimeElement || !this.clockDateElement) return;
        
        const now = new Date();
        
        // Format time based on current format preference and device
        const timeString = this.formatTime(now);
        const dateString = this.formatDate(now);
        
        this.clockTimeElement.textContent = timeString;
        this.clockDateElement.textContent = dateString;
        
        // Add subtle animation on update for visual feedback
        this.addUpdateAnimation();
    }
    
    formatTime(date) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: this.currentBreakpoint === 'mobile' ? undefined : '2-digit', // Hide seconds on mobile
            hour12: !this.is24HourFormat
        };
        
        return date.toLocaleTimeString('en-US', timeOptions);
    }
    
    formatDate(date) {
        let dateOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        
        // Shorter format for mobile
        if (this.currentBreakpoint === 'mobile') {
            dateOptions = {
                month: 'short',
                day: 'numeric'
            };
        } else if (this.currentBreakpoint !== 'mobile') {
            dateOptions.year = 'numeric';
        }
        
        return date.toLocaleDateString('en-US', dateOptions);
    }
    
    addUpdateAnimation() {
        if (this.currentBreakpoint === 'mobile') {
            // Subtle pulse for mobile
            this.clockTimeElement.style.animation = 'none';
            this.clockTimeElement.offsetHeight; // Trigger reflow
            this.clockTimeElement.style.animation = 'clockPulse 0.5s ease';
        }
    }
    
    toggleTimeFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        const toggleTrack = this.toggleBtn?.querySelector('.toggle-track');
        
        if (toggleTrack) {
            // Add button press animation
            toggleTrack.classList.add('button-pressed');
            
            // Update the format class and display
            if (this.is24HourFormat) {
                toggleTrack.classList.remove('format-12h');
                toggleTrack.classList.add('format-24h');
            } else {
                toggleTrack.classList.remove('format-24h');
                toggleTrack.classList.add('format-12h');
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                toggleTrack.classList.remove('button-pressed');
            }, 300);
        }
        
        // Update clock immediately
        this.updateClock();
        
        // Store preference in localStorage
        localStorage.setItem('timeFormat', this.is24HourFormat ? '24' : '12');
        
        // Haptic feedback for mobile
        if (this.currentBreakpoint === 'mobile' && 'vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }
    
    loadTimeFormatPreference() {
        const savedFormat = localStorage.getItem('timeFormat');
        if (savedFormat) {
            this.is24HourFormat = savedFormat === '24';
            const toggleTrack = this.toggleBtn?.querySelector('.toggle-track');
            
            if (toggleTrack) {
                if (this.is24HourFormat) {
                    toggleTrack.classList.remove('format-12h');
                    toggleTrack.classList.add('format-24h');
                } else {
                    toggleTrack.classList.remove('format-24h');
                    toggleTrack.classList.add('format-12h');
                }
            }
        }
    }
    
    addButtonFeedback() {
        const toggleTrack = this.toggleBtn?.querySelector('.toggle-track');
        
        if (this.toggleBtn && toggleTrack) {
            // Touch events for mobile
            this.toggleBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toggleTrack.classList.add('pressed');
            }, { passive: false });
            
            this.toggleBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                toggleTrack.classList.remove('pressed');
            }, { passive: false });
            
            // Mouse events for desktop
            this.toggleBtn.addEventListener('mousedown', () => {
                toggleTrack.classList.add('pressed');
            });
            
            this.toggleBtn.addEventListener('mouseup', () => {
                toggleTrack.classList.remove('pressed');
            });
            
            this.toggleBtn.addEventListener('mouseleave', () => {
                toggleTrack.classList.remove('pressed');
            });
        }
    }
    
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

// Legacy function support
function updateClock() {
    // This function is now handled by ResponsiveClock class
    if (window.responsiveClock) {
        window.responsiveClock.updateClock();
    }
}

function toggleTimeFormat() {
    if (window.responsiveClock) {
        window.responsiveClock.toggleTimeFormat();
    }
}

function loadTimeFormatPreference() {
    // This function is now handled by ResponsiveClock class
    if (window.responsiveClock) {
        window.responsiveClock.loadTimeFormatPreference();
    }
}

function addButtonFeedback() {
    // This function is now handled by ResponsiveClock class
    if (window.responsiveClock) {
        window.responsiveClock.addButtonFeedback();
    }
}

// ================================================
// NOTIFICATION SYSTEM
// ================================================
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
        this.init();
    }
    
    init() {
        this.addNotificationStyles();
    }
    
    addNotificationStyles() {
        if (document.getElementById('notificationStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                min-width: 320px;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 
                    0 20px 40px rgba(0, 0, 0, 0.25),
                    0 8px 16px rgba(0, 0, 0, 0.15);
                opacity: 0;
                transform: translateX(100%) scale(0.95);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10000;
                overflow: hidden;
                border: 2px solid rgba(0, 0, 0, 0.1);
            }
            
            .notification.show {
                opacity: 1;
                transform: translateX(0) scale(1);
            }
            
            .notification.removing {
                opacity: 0;
                transform: translateX(100%) scale(0.9);
                transition: all 0.3s ease-in;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: 24px;
                gap: 16px;
                position: relative;
                background: #ffffff;
            }
            
            .notification-icon {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                font-size: 20px;
                color: #ffffff;
                margin-top: 0;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border: none;
            }
            
            .notification-success .notification-icon {
                background: linear-gradient(135deg, #10b981, #059669);
                color: #ffffff;
            }
            
            .notification-error .notification-icon {
                background: linear-gradient(135deg, #f87171, #ef4444);
                color: #ffffff;
            }
            
            .notification-warning .notification-icon {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                color: #ffffff;
            }
            
            .notification-info .notification-icon {
                background: linear-gradient(135deg, #60a5fa, #3b82f6);
                color: #ffffff;
            }
            
            .notification-text {
                flex: 1;
                min-width: 0;
                line-height: 1.5;
            }
            
            .notification-title {
                margin: 0 0 8px 0;
                font-size: 20px;
                font-weight: 700;
                color: #1f2937;
                line-height: 1.3;
                letter-spacing: -0.025em;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-shadow: none;
            }
            
            .notification-message {
                margin: 0;
                font-size: 16px;
                color: #4b5563;
                line-height: 1.5;
                word-wrap: break-word;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-weight: 400;
                text-shadow: none;
            }
            
            .notification-close {
                flex-shrink: 0;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                font-size: 22px;
                color: #64748b;
                cursor: pointer;
                padding: 8px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                transition: all 0.2s ease;
                font-weight: 600;
            }
            
            .notification-close:hover {
                background: #f1f5f9;
                color: #475569;
                transform: scale(1.05);
                border-color: #cbd5e1;
            }
            
            .notification-close:active {
                transform: scale(0.95);
            }
            
            /* Success notification - Green theme with white background */
            .notification-success {
                background: #ffffff;
                border-left: 6px solid #10b981;
                border-top: 1px solid #d1fae5;
                border-right: 1px solid #d1fae5;
                border-bottom: 1px solid #d1fae5;
            }
            
            .notification-success .notification-title {
                color: #065f46;
            }
            
            .notification-success .notification-message {
                color: #047857;
            }
            
            /* Error notification - Red theme with white background */
            .notification-error {
                background: #ffffff;
                border-left: 6px solid #f87171;
                border-top: 1px solid #fecaca;
                border-right: 1px solid #fecaca;
                border-bottom: 1px solid #fecaca;
            }
            
            .notification-error .notification-title {
                color: #991b1b;
            }
            
            .notification-error .notification-message {
                color: #b91c1c;
            }
            
            /* Warning notification - Orange theme with white background */
            .notification-warning {
                background: #ffffff;
                border-left: 6px solid #fbbf24;
                border-top: 1px solid #fde68a;
                border-right: 1px solid #fde68a;
                border-bottom: 1px solid #fde68a;
            }
            
            .notification-warning .notification-title {
                color: #92400e;
            }
            
            .notification-warning .notification-message {
                color: #b45309;
            }
            
            /* Info notification - Blue theme with white background */
            .notification-info {
                background: #ffffff;
                border-left: 6px solid #60a5fa;
                border-top: 1px solid #bfdbfe;
                border-right: 1px solid #bfdbfe;
                border-bottom: 1px solid #bfdbfe;
            }
            
            .notification-info .notification-title {
                color: #1e40af;
            }
            
            .notification-info .notification-message {
                color: #2563eb;
            }
            
            /* Progress bar animation */
            .notification::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                animation: notificationProgress 5s linear;
                border-radius: 0 0 16px 16px;
            }
            
            .notification-success::after {
                background: linear-gradient(90deg, #10b981, #059669);
            }
            
            .notification-error::after {
                background: linear-gradient(90deg, #f87171, #ef4444);
            }
            
            .notification-warning::after {
                background: linear-gradient(90deg, #fbbf24, #f59e0b);
            }
            
            .notification-info::after {
                background: linear-gradient(90deg, #60a5fa, #3b82f6);
            }
            
            @keyframes notificationProgress {
                0% { width: 100%; }
                100% { width: 0%; }
            }
            
            /* Mobile responsive design */
            @media (max-width: 480px) {
                .notification {
                    left: 16px;
                    right: 16px;
                    top: 16px;
                    max-width: none;
                    min-width: auto;
                    border-radius: 12px;
                }
                
                .notification-content {
                    padding: 20px;
                    gap: 14px;
                }
                
                .notification-title {
                    font-size: 18px;
                }
                
                .notification-message {
                    font-size: 15px;
                }
                
                .notification-icon {
                    width: 36px;
                    height: 36px;
                    font-size: 18px;
                    border-radius: 10px;
                }
                
                .notification-close {
                    width: 36px;
                    height: 36px;
                    font-size: 20px;
                    border-radius: 8px;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 16px;
                    top: 16px;
                    max-width: 360px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    show(type, title, message, duration = 5000) {
        const notification = this.createNotification(type, title, message);
        this.addNotification(notification, duration);
    }
    
    createNotification(type, title, message) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${this.getIcon(type)}</div>
                <div class="notification-text">
                    <h4 class="notification-title">${title}</h4>
                    <p class="notification-message">${message}</p>
                </div>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        return notification;
    }
    
    getIcon(type) {
        const icons = {
            success: '✓',
            error: '!',
            warning: '⚠',
            info: 'i'
        };
        return icons[type] || icons.info;
    }
    
    addNotification(notification, duration) {
        // Remove oldest notification if at max
        if (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            this.removeNotification(oldest, false);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        this.notifications.push(notification);
        
        // Position notifications
        this.positionNotifications();
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => this.removeNotification(notification), duration);
        }
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.removeNotification(notification));
    }
    
    removeNotification(notification, updatePositions = true) {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
            notification.classList.add('removing');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (updatePositions) {
                    this.positionNotifications();
                }
            }, 300);
        }
    }
    
    positionNotifications() {
        this.notifications.forEach((notification, index) => {
            const offset = index * 90; // Increased spacing for better visibility
            notification.style.top = `${20 + offset}px`;
            notification.style.zIndex = `${10000 + index}`;
        });
    }
}

// Global notification instance
const notificationManager = new NotificationManager();

// Global function to show notifications
function showPopup(type, title, message, duration = 5000) {
    notificationManager.show(type, title, message, duration);
}

function hidePopup() {
    // Legacy function for compatibility
    console.log('hidePopup called - using new notification system');
}

// ================================================
// FIXED BACK TO TOP BUTTON
// ================================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.progressRing = null;
        this.percentageDisplay = null;
        this.currentBreakpoint = 'desktop';
        this.isVisible = false;
        this.scrollThreshold = 300;
        this.circumference = 157; // Default circumference
        
        this.init();
    }
    
    init() {
        if (!this.button) {
            console.warn('Back to top button not found');
            return;
        }
        
        this.setupExistingButton();
        this.bindEvents();
        this.detectBreakpoint();
        this.updateVisibility();
    }
    
    setupExistingButton() {
        // Find the existing progress ring
        this.progressRing = this.button.querySelector('.progress-ring-circle');
        
        // Create percentage display for mobile if it doesn't exist
        this.percentageDisplay = this.button.querySelector('.back-to-top-percentage');
        if (!this.percentageDisplay) {
            this.percentageDisplay = document.createElement('div');
            this.percentageDisplay.className = 'back-to-top-percentage';
            this.percentageDisplay.textContent = '0%';
            this.button.appendChild(this.percentageDisplay);
        }
        
        // Ensure the button has proper attributes
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.setAttribute('role', 'button');
        this.button.setAttribute('tabindex', '0');
    }
    
    bindEvents() {
        // Scroll event with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.updateProgress();
                this.updateVisibility();
            }, 16); // ~60fps
        }, { passive: true });
        
        // Click event
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Keyboard support
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
        
        // Touch events for mobile
        this.button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.addPressEffect();
            
            // Haptic feedback for mobile
            if ('vibrate' in navigator && this.currentBreakpoint === 'mobile') {
                navigator.vibrate(50);
            }
        }, { passive: false });
        
        this.button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.removePressEffect();
        }, { passive: false });
        
        // Mouse events for desktop
        this.button.addEventListener('mousedown', () => {
            this.addPressEffect();
        });
        
        this.button.addEventListener('mouseup', () => {
            this.removePressEffect();
        });
        
        this.button.addEventListener('mouseleave', () => {
            this.removePressEffect();
        });
        
        // Resize event with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                this.detectBreakpoint();
                this.updateCircumference();
            }, 250);
        }, { passive: true });
    }
    
    detectBreakpoint() {
        const width = window.innerWidth;
        let newBreakpoint = 'desktop';
        
        if (width <= 480) {
            newBreakpoint = 'mobile';
        } else if (width <= 768) {
            newBreakpoint = 'tablet';
        }
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.updateCircumference();
            this.updateButtonSize();
        }
    }
    
    updateCircumference() {
        // Calculate circumference based on existing circle radius (r=20 from HTML)
        this.circumference = 2 * Math.PI * 20; // Using existing radius from HTML
        
        // Update the stroke-dasharray to match
        if (this.progressRing) {
            this.progressRing.style.strokeDasharray = `0 ${this.circumference}`;
        }
    }
    
    updateButtonSize() {
        // Add breakpoint-specific classes for additional styling
        this.button.classList.remove('btn-mobile', 'btn-tablet', 'btn-desktop');
        this.button.classList.add(`btn-${this.currentBreakpoint}`);
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
        const percentage = Math.round(scrollPercent * 100);
        
        // Update progress ring
        if (this.progressRing) {
            const dashArray = scrollPercent * this.circumference;
            this.progressRing.style.strokeDasharray = `${dashArray} ${this.circumference}`;
        }
        
        // Update percentage text (visible on mobile)
        if (this.percentageDisplay) {
            this.percentageDisplay.textContent = `${percentage}%`;
        }
    }
    
    updateVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldShow = scrollTop > this.scrollThreshold;
        
        if (shouldShow !== this.isVisible) {
            this.isVisible = shouldShow;
            
            if (shouldShow) {
                this.button.classList.add('show');
                this.button.setAttribute('aria-hidden', 'false');
            } else {
                this.button.classList.remove('show');
                this.button.setAttribute('aria-hidden', 'true');
            }
        }
    }
    
    scrollToTop() {
        // Add immediate visual feedback
        this.addPulseEffect();
        
        // Smooth scroll to top with easing
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = Math.min(startPosition / 3, 1000); // Dynamic duration, max 1s
        
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - easedProgress));
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
    }
    
    addPressEffect() {
        this.button.style.transform = 'scale(0.9)';
        this.button.style.transition = 'transform 0.1s ease';
    }
    
    removePressEffect() {
        this.button.style.transform = '';
        this.button.style.transition = '';
    }
    
    addPulseEffect() {
        this.button.classList.remove('pulse');
        // Force reflow
        this.button.offsetHeight;
        this.button.classList.add('pulse');
        
        // Remove class after animation
        setTimeout(() => {
            this.button.classList.remove('pulse');
        }, 600);
    }
}

// ================================================
// FORM HANDLING
// ================================================
class FormManager {
    constructor() {
        this.forms = [];
        this.init();
    }
    
    init() {
        this.initializeContactForm();
        this.initializeNewsletterForm();
        this.initializeFormAnimations();
        this.initializeFormValidation();
    }
    
    initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactFormSubmission(contactForm);
        });
    }
    
    handleContactFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        const validationResult = this.validateContactForm(data);
        if (!validationResult.isValid) {
            showPopup('error', 'Validation Error', validationResult.message);
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            showPopup('success', 'Message Sent!', 'Thank you for your message! I\'ll get back to you within 24 hours.');
            form.reset();
            this.resetFormState(form);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 1500);
    }
    
    validateContactForm(data) {
        const errors = [];
        
        if (!data.firstName?.trim()) errors.push('First name is required');
        if (!data.lastName?.trim()) errors.push('Last name is required');
        if (!data.email?.trim()) errors.push('Email is required');
        if (!this.isValidEmail(data.email)) errors.push('Please enter a valid email address');
        if (!data.message?.trim()) errors.push('Message is required');
        
        return {
            isValid: errors.length === 0,
            message: errors.join('\n')
        };
    }
    
    initializeNewsletterForm() {
        const newsletterBtn = document.querySelector('.newsletter-btn');
        const newsletterInput = document.querySelector('.newsletter-input');
        
        if (!newsletterBtn || !newsletterInput) return;

        newsletterBtn.addEventListener('click', () => {
            this.handleNewsletterSubmission(newsletterInput, newsletterBtn);
        });

        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleNewsletterSubmission(newsletterInput, newsletterBtn);
            }
        });
    }
    
    handleNewsletterSubmission(input, button) {
        const email = input.value.trim();
        
        if (!email) {
            showPopup('warning', 'Email Required', 'Please enter your email address to subscribe.');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            showPopup('error', 'Invalid Email', 'Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        button.classList.add('loading');
        
        setTimeout(() => {
            showPopup('success', 'Subscribed!', 'Thank you for subscribing! I\'ll notify you when new posts are available.');
            input.value = '';
            
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('loading');
        }, 1000);
    }
    
    initializeFormAnimations() {
        document.querySelectorAll('input, textarea, select').forEach(element => {
            element.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.parentElement.classList.add('has-focus');
            });
            
            element.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (!this.value) {
                    this.parentElement.classList.remove('has-focus');
                }
            });
            
            element.addEventListener('input', function() {
                this.parentElement.classList.toggle('has-value', this.value.length > 0);
            });
        });
    }
    
    initializeFormValidation() {
        // Real-time validation
        document.querySelectorAll('input[required], textarea[required]').forEach(element => {
            element.addEventListener('blur', () => {
                this.validateField(element);
            });
            
            element.addEventListener('input', () => {
                // Clear error state on input
                element.parentElement.classList.remove('error');
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        field.parentElement.classList.toggle('error', !isValid);
        
        // Update or remove error message
        let errorMsg = field.parentElement.querySelector('.error-message');
        if (!isValid) {
            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                field.parentElement.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        } else if (errorMsg) {
            errorMsg.remove();
        }
        
        return isValid;
    }
    
    resetFormState(form) {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused', 'has-focus', 'has-value', 'error');
        });
        
        form.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ================================================
// INTERACTIVE FEATURES
// ================================================
class InteractiveFeatures {
    constructor() {
        this.init();
    }
    
    init() {
        this.initializeBlogCards();
        this.initializeSkillsInteraction();
        this.initializeCertificationInteraction();
        this.initializeGalleryScroll();
        this.initializeScrollAnimations();
        this.initializeSmoothScrolling();
    }
    
    initializeBlogCards() {
        const blogCards = document.querySelectorAll('.blog-card');
        const readMoreLinks = document.querySelectorAll('.read-more');
        
        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('read-more') || e.target.closest('.read-more')) {
                    return;
                }
                
                e.preventDefault();
                showPopup('info', 'Coming Soon!', 'Blog post details will be available shortly. Full articles are in development.');
            });
            
            // Add hover effect for non-touch devices
            if (!('ontouchstart' in window)) {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            }
        });
        
        readMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPopup('info', 'Coming Soon!', 'Blog post details will be available shortly. Full articles are in development.');
            });
        });
    }
    
    initializeSkillsInteraction() {
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const skill = this.textContent;
                showPopup('info', 'Skill Details', `Would you like to know more about my experience with ${skill}? Feel free to contact me for detailed discussions.`);
            });
            
            // Add hover effect for non-touch devices
            if (!('ontouchstart' in window)) {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        });
    }
    
    initializeCertificationInteraction() {
        document.querySelectorAll('.cert-item').forEach(cert => {
            cert.addEventListener('click', function() {
                const certification = this.textContent;
                showPopup('info', 'Certification Details', `${certification} - Click to view verification details or contact me for more information about this certification.`);
            });
        });
    }
    
    initializeGalleryScroll() {
        const scrollLeftBtn = document.getElementById('scrollLeft');
        const scrollRightBtn = document.getElementById('scrollRight');
        const gallery = document.getElementById('scrollableGallery');

        if (!scrollLeftBtn || !scrollRightBtn || !gallery) return;

        scrollLeftBtn.addEventListener('click', () => {
            gallery.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            gallery.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });

        // Touch support for mobile
        let startX = 0;
        let scrollLeft = 0;

        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        }, { passive: true });

        gallery.addEventListener('touchmove', (e) => {
            if (!startX) return;
            e.preventDefault();
            const x = e.touches[0].pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });

        gallery.addEventListener('touchend', () => {
            startX = 0;
        });

        // Update button visibility
        const updateButtonVisibility = () => {
            const scrollLeft = gallery.scrollLeft;
            const maxScroll = gallery.scrollWidth - gallery.clientWidth;

            scrollLeftBtn.style.opacity = scrollLeft > 10 ? '1' : '0.3';
            scrollRightBtn.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0.3';
            scrollLeftBtn.disabled = scrollLeft <= 10;
            scrollRightBtn.disabled = scrollLeft >= maxScroll - 10;
        };

        gallery.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility();
    }
    
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate stats if it's a stat item
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateStatNumber(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section, .blog-card, .stat-item, .contact-item, .experience-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateStatNumber(statItem) {
        const numberEl = statItem.querySelector('.stat-number');
        if (!numberEl) return;
        
        const finalValue = numberEl.textContent.trim();
        const numMatch = finalValue.match(/(\d+)/);
        
        if (numMatch) {
            const targetNumber = parseInt(numMatch[1]);
            const suffix = finalValue.replace(/\d+/, '');
            
            this.animateCounter(numberEl, 0, targetNumber, suffix, 2000);
        }
    }
    
    animateCounter(element, start, end, suffix, duration) {
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
                element.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
                setTimeout(() => {
                    element.style.textShadow = '';
                }, 1000);
            }
        }, timer);
    }
    
    initializeSmoothScrolling() {
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
}

// ================================================
// PERFORMANCE OPTIMIZATION
// ================================================
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initializeLazyLoading();
        this.optimizeImages();
        this.preloadCriticalResources();
    }
    
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    preloadCriticalResources() {
        // Preload critical CSS
        const criticalCSS = document.querySelector('link[rel="stylesheet"]');
        if (criticalCSS) {
            criticalCSS.setAttribute('rel', 'preload');
            criticalCSS.setAttribute('as', 'style');
            criticalCSS.setAttribute('onload', 'this.rel="stylesheet"');
        }
    }
}

// ================================================
// INITIALIZATION & ERROR HANDLING
// ================================================

// Global instances
let responsiveManager;
let formManager;
let interactiveFeatures;
let performanceManager;
let backToTop;

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing responsive website functionality...');
    
    try {
        // Initialize responsive clock
        window.responsiveClock = new ResponsiveClock();
        
        // Initialize all managers
        responsiveManager = new ResponsiveManager();
        formManager = new FormManager();
        interactiveFeatures = new InteractiveFeatures();
        performanceManager = new PerformanceManager();
        backToTop = new BackToTop();
        
        // Initialize notification manager
        window.notificationManager = new NotificationManager();
        
        // Add responsive CSS classes
        addResponsiveCSS();
        
        console.log('✅ Website functionality initialized successfully!');
        
        // Mark as loaded
        document.body.classList.add('loaded');
        
        // Test notification to verify it's working
        setTimeout(() => {
            showPopup('success', 'Welcome! 🎉', 'Your portfolio is now fully loaded and ready to explore. All features are working perfectly!', 4000);
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error initializing website functionality:', error);
        // Use basic alert if notification system fails
        setTimeout(() => {
            alert('Some features may not work properly. Please refresh the page.');
        }, 1000);
    }
});

// Add responsive CSS dynamically
function addResponsiveCSS() {
    if (document.getElementById('responsiveCSS')) return;
    
    const style = document.createElement('style');
    style.id = 'responsiveCSS';
    style.textContent = `
        /* Mobile Navigation Styles */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--text-color);
            font-size: 1.5rem;
            z-index: 1001;
        }
        
        /* Force hide clock on small devices */
        @media (max-width: 768px) {
            .nav-right,
            .time-toggle,
            .live-clock,
            .clock-display {
                display: none !important;
                visibility: hidden !important;
            }
        }
        
        /* Responsive Clock Styles */
        .nav-right {
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.3s ease;
        }
        
        .nav-right.clock-mobile,
        .nav-right.clock-tablet {
            display: none !important;
            visibility: hidden !important;
        }
        
        .nav-right.clock-desktop {
            display: flex !important;
            visibility: visible !important;
            flex-direction: row;
            gap: 1rem;
        }
        
        .clock-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            line-height: 1.2;
            transition: all 0.3s ease;
        }
        
        .clock-mobile .clock-display {
            font-size: 0.8rem;
        }
        
        .clock-tablet .clock-display {
            font-size: 0.9rem;
        }
        
        .clock-desktop .clock-display {
            font-size: 1rem;
        }
        
        .clock-time {
            font-weight: 500;
            color: var(--primary-color);
            transition: all 0.3s ease;
        }
        
        .clock-date {
            opacity: 0.9;
            font-size: 0.8em;
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        
        /* Clock animations */
        @keyframes clockPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .button-pressed {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
        
        .pressed {
            transform: scale(0.95);
            opacity: 0.8;
            transition: all 0.1s ease;
        }
        
        /* Toggle button responsive styles */
        .toggle-button {
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .clock-mobile .toggle-button {
            transform: scale(0.9);
        }
        
        .clock-tablet .toggle-button {
            transform: scale(0.95);
        }
        
        .clock-desktop .toggle-button {
            transform: scale(1);
        }
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
            position: relative;
        }

        .hamburger-line {
            width: 25px;
            height: 3px;
            background-color: #333;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        /* Notification Styles */
        .notification {
            position: fixed;
            top: 2rem;
            right: 2rem;
            min-width: 300px;
            max-width: 400px;
            padding: 1rem;
            border-radius: 12px;
            color: white;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            opacity: 0;
        }

        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }

        .notification.removing {
            transform: translateX(100%);
            opacity: 0;
        }

        .notification-success { background: linear-gradient(135deg, #27ae60, #2ecc71); }
        .notification-error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
        .notification-warning { background: linear-gradient(135deg, #f39c12, #e67e22); }
        .notification-info { background: linear-gradient(135deg, #3498db, #2980b9); }

        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .notification-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        }

        .notification-text {
            flex: 1;
        }

        .notification-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
        }

        .notification-message {
            font-size: 0.875rem;
            margin: 0;
            opacity: 0.9;
            line-height: 1.4;
        }

        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            flex-shrink: 0;
        }

        .notification-close:hover {
            opacity: 1;
        }

        /* Form Enhancement Styles */
        .form-group {
            position: relative;
            transition: all 0.3s ease;
        }

        .form-group.focused {
            transform: translateY(-1px);
        }

        .form-group.error {
            animation: shake 0.5s ease-in-out;
        }

        .error-message {
            color: #e74c3c;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
        }

        .submit-btn.loading,
        .newsletter-btn.loading {
            position: relative;
            color: transparent;
        }

        .submit-btn.loading::after,
        .newsletter-btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* Animation Classes */
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        /* Responsive Breakpoint Classes */
        .bp-mobile .navigation {
            flex-direction: column;
            align-items: stretch;
            padding: 1rem;
        }

        .bp-mobile .mobile-menu-toggle {
            display: flex;
            align-self: flex-start;
        }

        .bp-mobile .nav-links {
            display: none;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .bp-mobile .navigation.menu-open .nav-links {
            display: flex;
        }

        .bp-mobile .nav-right {
            display: none;
            margin-top: 1rem;
            justify-content: center;
        }

        .bp-mobile .navigation.menu-open .nav-right {
            display: flex;
        }

        /* Touch Device Optimizations */
        .touch-device .skill-tag,
        .touch-device .cert-item,
        .touch-device .contact-item {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        }

        .touch-device .blog-card {
            transition: transform 0.2s ease;
        }

        .touch-device .blog-card:active {
            transform: scale(0.98);
        }

        /* Orientation Specific Styles */
        .portrait.bp-mobile .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .landscape.bp-mobile .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        /* High Contrast Mode Support */
        @media (prefers-contrast: high) {
            .notification {
                border: 2px solid currentColor;
            }
            
            .mobile-menu-toggle {
                border: 1px solid currentColor;
                border-radius: 4px;
            }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                animation: none;
            }
            
            .notification {
                transition: none;
            }
            
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* Mobile Specific Breakpoints */
        @media (max-width: 480px) {
            .container {
                padding: 1rem !important;
            }
            
            .notification {
                top: 1rem;
                right: 1rem;
                left: 1rem;
                max-width: none;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .section-title {
                font-size: 1.5rem;
            }
            
            .nav-right {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .live-clock {
                font-size: 0.8rem;
            }
        }

        @media (max-width: 768px) {
            .contact-content {
                flex-direction: column !important;
                gap: 2rem !important;
            }
            
            .form-row {
                flex-direction: column;
                gap: 1rem;
            }
            
            .gallery-container {
                padding: 0 1rem;
            }
            
            .scroll-btn {
                display: none !important;
            }
            
            .contact-gallery {
                overflow-x: auto;
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch;
            }
        }

        @media (max-width: 1024px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1.5rem !important;
            }
            
            .skills-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .blog-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Window load event for final optimizations
window.addEventListener('load', function() {
    console.log('🎯 Page fully loaded, applying final optimizations...');
    
    // Final performance optimizations
    setTimeout(() => {
        // Remove loading states
        document.body.classList.remove('loading');
        
        // Optimize images that may have loaded
        if (performanceManager) {
            performanceManager.optimizeImages();
        }
        
        // Update layout one final time
        if (responsiveManager) {
            responsiveManager.handleResponsiveElements();
        }
        
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations
        if (clockInterval) {
            clearInterval(clockInterval);
        }
    } else {
        // Page is visible, resume animations
        if (!clockInterval) {
            clockInterval = setInterval(updateClock, 1000);
            updateClock(); // Update immediately
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript error:', e.error);
    
    // Show user-friendly error message
    setTimeout(() => {
        showPopup('error', 'Something went wrong', 'Please refresh the page if you continue to experience issues.');
    }, 1000);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the default browser error handling
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (clockInterval) {
        clearInterval(clockInterval);
    }
    
    // Clear any running animations or timers
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
});

// Service Worker Registration (for future PWA support)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ℹ️ ServiceWorker registration not available:', err.message);
            });
    });
}

// Utility functions for external use
window.ResponsiveUtils = {
    getCurrentBreakpoint: () => responsiveManager?.currentBreakpoint || 'unknown',
    isMobile: () => responsiveManager?.currentBreakpoint === 'mobile',
    isTablet: () => responsiveManager?.currentBreakpoint === 'tablet',
    isDesktop: () => ['desktop', 'large'].includes(responsiveManager?.currentBreakpoint),
    isTouchDevice: () => responsiveManager?.isTouchDevice || false,
    showNotification: showPopup,
    closeNotification: () => notificationManager.notifications.forEach(n => notificationManager.removeNotification(n))
};

// ================================================
// BLOG FUNCTIONALITY
// ================================================

// Blog Content Manager
class BlogManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-content')) {
                e.preventDefault();
                this.toggleBlogContent(e.target);
            }
        });
    }
    
    toggleBlogContent(button) {
        const blogCard = button.closest('.blog-card');
        const blogContent = blogCard.querySelector('.blog-content');
        const isExpanded = button.getAttribute('data-expanded') === 'true';
        
        if (isExpanded) {
            // Collapse content
            blogContent.classList.remove('expanded');
            button.setAttribute('data-expanded', 'false');
            button.textContent = 'Read Full Article →';
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            
            // Scroll to top of card smoothly
            setTimeout(() => {
                blogCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100);
            
            // Show collapse notification
            if (typeof notificationManager !== 'undefined' && notificationManager) {
                notificationManager.show(
                    'Article Collapsed 📄',
                    'Article has been minimized. Click "Read Full Article" to expand again.',
                    'info'
                );
            }
        } else {
            // Expand content
            blogContent.classList.add('expanded');
            button.setAttribute('data-expanded', 'true');
            button.textContent = 'Collapse Article ←';
            button.style.background = '#ef4444';
            
            // Show expand notification
            if (typeof notificationManager !== 'undefined' && notificationManager) {
                notificationManager.show(
                    'Article Expanded! 📖',
                    'Scroll down to read the full technical guide with code examples and best practices.',
                    'success'
                );
            }
            
            // Smooth scroll to content after a brief delay
            setTimeout(() => {
                const contentTop = blogContent.offsetTop + blogCard.offsetTop;
                window.scrollTo({
                    top: contentTop - 100,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
}

// Initialize blog manager on blog pages
if (document.querySelector('.blog-card')) {
    const blogManager = new BlogManager();
    console.log('📝 Blog functionality initialized');
}

console.log('📱 Responsive website script loaded successfully!');
console.log('🎨 Available utilities:', Object.keys(window.ResponsiveUtils));

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ResponsiveManager,
        FormManager,
        InteractiveFeatures,
        PerformanceManager,
        NotificationManager,
        BackToTop
    };
}
