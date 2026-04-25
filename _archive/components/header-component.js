/**
 * Reusable Header Component
 * Modern, responsive header with beautiful UI/UX design
 */

window.HeaderComponent = {
    // Create header HTML structure
    createHeader: function(config = {}) {
        const defaultConfig = {
            logo: {
                text: "Viipiin",
                url: "/",
                showIcon: true
            },
            navigation: [
                { text: "Home", url: "/", active: false },
                { text: "About", url: "/about", active: false },
                { text: "Services", url: "/services", active: false },
                { text: "Blog", url: "/blog", active: false },
                { text: "Contact", url: "/contact", active: false }
            ],
            cta: {
                text: "Get Started",
                url: "/contact",
                style: "primary" // primary, secondary, outline
            },
            showSearch: true,
            showThemeToggle: true,
            showSocialLinks: true,
            socialLinks: [
                { platform: "linkedin", url: "#", icon: "linkedin" },
                { platform: "github", url: "#", icon: "github" },
                { platform: "twitter", url: "#", icon: "twitter" }
            ]
        };

        const settings = { ...defaultConfig, ...config };

        return `
            <header class="modern-header" id="modernHeader">
                <!-- Header Background Effects -->
                <div class="header-bg-effects">
                    <div class="bg-gradient"></div>
                    <div class="bg-particles"></div>
                </div>

                <!-- Main Header Content -->
                <div class="header-container">
                    <!-- Logo Section -->
                    <div class="header-logo">
                        <a href="${settings.logo.url}" class="logo-link">
                            ${settings.logo.showIcon ? `
                                <div class="logo-icon">
                                    <svg viewBox="0 0 40 40" fill="none">
                                        <!-- Clean rounded square background -->
                                        <rect width="40" height="40" rx="10" fill="url(#logoGradient)"/>
                                        
                                        <!-- Innovative V design with negative space -->
                                        <path d="M14 15L20 25L26 15H23L20 21L17 15H14Z" fill="white"/>
                                        
                                        <!-- Simple but clever: Two dots that form eyes/personality -->
                                        <circle cx="17" cy="12" r="1.5" fill="white"/>
                                        <circle cx="23" cy="12" r="1.5" fill="white"/>
                                        
                                        <!-- Minimal accent line - like a smile -->
                                        <path d="M16 28C18 30 22 30 24 28" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-opacity="0.8"/>
                                        
                                        <defs>
                                            <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
                                                <stop offset="0%" stop-color="#6366f1"/>
                                                <stop offset="100%" stop-color="#8b5cf6"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            ` : ''}
                            <span class="logo-text">${settings.logo.text}</span>
                        </a>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav class="header-nav desktop-nav">
                        <ul class="nav-list">
                            ${settings.navigation.map(item => `
                                <li class="nav-item">
                                    <a href="${item.url}" class="nav-link ${item.active ? 'active' : ''}" data-text="${item.text}">
                                        <span class="nav-text">${item.text}</span>
                                        <div class="nav-indicator"></div>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </nav>

                    <!-- Header Actions -->
                    <div class="header-actions">
                        ${settings.showSearch ? `
                            <button class="action-btn search-btn" aria-label="Search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </button>
                        ` : ''}

                        ${settings.showThemeToggle ? `
                            <button class="action-btn theme-toggle" aria-label="Toggle theme">
                                <div class="theme-icon">
                                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                                    </svg>
                                </div>
                            </button>
                        ` : ''}

                        ${settings.showSocialLinks ? `
                            <div class="social-links">
                                ${settings.socialLinks.map(social => `
                                    <a href="${social.url}" class="social-link" aria-label="${social.platform}">
                                        ${this.getSocialIcon(social.icon)}
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${settings.cta ? `
                            <a href="${settings.cta.url}" class="cta-button ${settings.cta.style}">
                                <span class="cta-text">${settings.cta.text}</span>
                                <div class="cta-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7,7 17,7 17,17"></polyline>
                                    </svg>
                                </div>
                            </a>
                        ` : ''}

                        <!-- Mobile Menu Toggle -->
                        <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                            <div class="hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <nav class="header-nav mobile-nav" id="mobileNav">
                    <div class="mobile-nav-content">
                        <ul class="mobile-nav-list">
                            ${settings.navigation.map((item, index) => `
                                <li class="mobile-nav-item" style="--delay: ${index * 0.1}s">
                                    <a href="${item.url}" class="mobile-nav-link ${item.active ? 'active' : ''}">
                                        <span class="mobile-nav-text">${item.text}</span>
                                        <div class="mobile-nav-arrow">→</div>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                        
                        ${settings.cta ? `
                            <div class="mobile-cta">
                                <a href="${settings.cta.url}" class="mobile-cta-button">
                                    ${settings.cta.text}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </nav>

                <!-- Search Overlay -->
                ${settings.showSearch ? `
                    <div class="search-overlay" id="searchOverlay">
                        <div class="search-container">
                            <div class="search-box">
                                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input type="text" placeholder="Search..." class="search-input" id="searchInput">
                                <button class="search-close" aria-label="Close search">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div class="search-suggestions">
                                <div class="suggestion-category">
                                    <h4>Popular searches</h4>
                                    <ul>
                                        <li><a href="#">Web Development</a></li>
                                        <li><a href="#">UI/UX Design</a></li>
                                        <li><a href="#">Consulting</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </header>
        `;
    },

    // Get social media icons
    getSocialIcon: function(platform) {
        const icons = {
            linkedin: `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            `,
            github: `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            `,
            twitter: `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
            `
        };
        return icons[platform] || '';
    },

    // Initialize header functionality
    init: function() {
        this.initMobileMenu();
        this.initSearch();
        this.initThemeToggle();
        this.initScrollEffects();
        this.initNavigationEffects();
    },

    // Mobile menu functionality
    initMobileMenu: function() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.getElementById('mobileNav');
        const header = document.getElementById('modernHeader');

        if (toggle && mobileNav) {
            toggle.addEventListener('click', () => {
                const isOpen = header.classList.contains('mobile-menu-open');
                
                if (isOpen) {
                    header.classList.remove('mobile-menu-open');
                    document.body.classList.remove('mobile-menu-open');
                } else {
                    header.classList.add('mobile-menu-open');
                    document.body.classList.add('mobile-menu-open');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!header.contains(e.target) && header.classList.contains('mobile-menu-open')) {
                    header.classList.remove('mobile-menu-open');
                    document.body.classList.remove('mobile-menu-open');
                }
            });
        }
    },

    // Search functionality
    initSearch: function() {
        const searchBtn = document.querySelector('.search-btn');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.querySelector('.search-close');
        const searchInput = document.getElementById('searchInput');

        if (searchBtn && searchOverlay) {
            searchBtn.addEventListener('click', () => {
                searchOverlay.classList.add('active');
                document.body.classList.add('search-open');
                setTimeout(() => searchInput?.focus(), 300);
            });

            searchClose?.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
                document.body.classList.remove('search-open');
            });

            // Close search on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                    searchOverlay.classList.remove('active');
                    document.body.classList.remove('search-open');
                }
            });
        }
    },

    // Theme toggle functionality
    initThemeToggle: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark-theme');
                localStorage.setItem('theme', 
                    document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light'
                );
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-theme');
            }
        }
    },

    // Scroll effects
    initScrollEffects: function() {
        const header = document.getElementById('modernHeader');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for styling effects
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Header remains visible - no hide/show functionality
        });
    },

    // Navigation hover effects
    initNavigationEffects: function() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.setProperty('--hover-width', '100%');
            });

            link.addEventListener('mouseleave', () => {
                link.style.setProperty('--hover-width', '0%');
            });
        });
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HeaderComponent.init());
} else {
    HeaderComponent.init();
}
