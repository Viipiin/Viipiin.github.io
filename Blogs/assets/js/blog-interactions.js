/**
 * Blog Interactions - Handle all interactive functionality
 * Animations, scroll effects, and user interactions
 */

// Ensure BlogComponents exists
window.BlogComponents = window.BlogComponents || {};

class BlogInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupProgressBar();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
    }

    // Navbar scroll effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateNavbar = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    // Smooth reveal animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const elementsToAnimate = document.querySelectorAll(`
                .article-section,
                .method-card,
                .intro-section,
                .takeaways,
                .code-block,
                .alert-box
            `);

            elementsToAnimate.forEach(el => {
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        });
    }

    // Reading progress bar
    setupProgressBar() {
        // Wait for DOM to be ready
        const initProgressBar = () => {
            // Only create progress bar if it doesn't exist
            if (document.querySelector('.reading-progress')) return;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.innerHTML = '<div class="progress-fill"></div>';
            
            // Insert after body opening tag
            if (document.body) {
                document.body.insertBefore(progressBar, document.body.firstChild);
            }

            const updateProgress = () => {
                // Simple and reliable progress calculation
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                const documentHeight = Math.max(
                    document.body.scrollHeight || 0,
                    document.body.offsetHeight || 0,
                    document.documentElement.clientHeight || 0,
                    document.documentElement.scrollHeight || 0,
                    document.documentElement.offsetHeight || 0
                );
                
                const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
                const scrollableHeight = documentHeight - windowHeight;
                
                let progress = 0;
                if (scrollableHeight > 0) {
                    progress = (scrollTop / scrollableHeight) * 100;
                }
                
                // Ensure progress is between 0 and 100
                progress = Math.min(100, Math.max(0, progress));
                
                const progressFill = document.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }
            };

            // Initial update
            updateProgress();

            // Throttled scroll listener
            let ticking = false;
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateProgress();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', updateProgress, { passive: true });
            window.addEventListener('load', updateProgress);
        };

        // Initialize immediately if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProgressBar);
        } else {
            initProgressBar();
        }
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Press 'B' to go back to blog
            if (e.key === 'b' || e.key === 'B') {
                if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
                
                const backLink = document.querySelector('.back-link');
                if (backLink && !e.target.matches('input, textarea, [contenteditable]')) {
                    window.location.href = backLink.href;
                }
            }
            
            // Press 'C' to copy first code block
            if (e.key === 'c' || e.key === 'C') {
                if (e.ctrlKey || e.metaKey) return; // Don't interfere with copy shortcut
                
                const firstCopyButton = document.querySelector('.copy-button');
                if (firstCopyButton && !e.target.matches('input, textarea, [contenteditable]')) {
                    firstCopyButton.click();
                }
            }
        });
    }
}

// Enhanced copy functionality with better UX
window.BlogComponents.copyCode = function(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const text = codeBlock.textContent;
    
    // Visual feedback before copying
    button.classList.add('copying');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="copy-icon">⏳</span><span class="copy-text">Copying...</span>';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'copy-ripple';
    button.appendChild(ripple);
    
    navigator.clipboard.writeText(text).then(() => {
        // Success feedback
        button.innerHTML = '<span class="copy-icon">✅</span><span class="copy-text">Copied!</span>';
        button.classList.remove('copying');
        button.classList.add('success');
        
        // Show toast notification
        showToast('Code copied to clipboard!', 'success');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('success');
            ripple.remove();
        }, 2500);
    }).catch(() => {
        // Error feedback
        button.innerHTML = '<span class="copy-icon">❌</span><span class="copy-text">Failed</span>';
        button.classList.remove('copying');
        button.classList.add('error');
        
        // Show error toast
        showToast('Failed to copy code', 'error');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('error');
            ripple.remove();
        }, 2500);
    });
};

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Table of contents generator
window.BlogComponents.generateTOC = function() {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    if (headings.length === 0) return '';

    let tocHTML = '<div class="table-of-contents"><h3>📚 Table of Contents</h3><ul class="toc-list">';
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent;
        
        tocHTML += `<li class="toc-item toc-${level}">
            <a href="#${id}" class="toc-link">${text}</a>
        </li>`;
    });
    
    tocHTML += '</ul></div>';
    return tocHTML;
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Blog Interactions initializing...');
    
    // Initialize main interactions
    new BlogInteractions();
    
    // Add fixed back button to all blog pages
    if (window.BlogComponents && typeof window.BlogComponents.addFixedBackButton === 'function') {
        window.BlogComponents.addFixedBackButton();
    }
    
    // Add keyboard shortcuts hint
    const shortcutsHint = document.createElement('div');
    shortcutsHint.className = 'keyboard-shortcuts';
    shortcutsHint.innerHTML = `
        <div class="shortcuts-content">
            <span class="shortcuts-title">Keyboard Shortcuts:</span>
            <span class="shortcut"><kbd>B</kbd> Back to blog</span>
            <span class="shortcut"><kbd>C</kbd> Copy first code</span>
        </div>
    `;
    document.body.appendChild(shortcutsHint);
    
    console.log('✅ Blog Interactions loaded');
});

// Also initialize on window load as backup
window.addEventListener('load', () => {
    if (!window.blogInteractionsLoaded) {
        console.log('🔄 Backup initialization...');
        new BlogInteractions();
        window.blogInteractionsLoaded = true;
    }
});

// Debug utility for progress bar (remove in production)
window.debugProgressBar = function() {
    console.log('🔍 Debugging Progress Bar...');
    
    const progressElement = document.querySelector('.reading-progress');
    const progressFill = document.querySelector('.progress-fill');
    
    console.log('Progress element:', progressElement ? '✅ Found' : '❌ Missing');
    console.log('Progress fill:', progressFill ? '✅ Found' : '❌ Missing');
    
    if (progressFill) {
        console.log('Current width:', progressFill.style.width || '0%');
    }
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const documentHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0
    );
    const windowHeight = window.innerHeight || 0;
    
    console.log('Scroll position:', scrollTop + 'px');
    console.log('Document height:', documentHeight + 'px');
    console.log('Window height:', windowHeight + 'px');
    console.log('Scrollable height:', (documentHeight - windowHeight) + 'px');
    
    if (documentHeight > windowHeight) {
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        console.log('Calculated progress:', progress.toFixed(2) + '%');
    }
};

// Test function to manually create progress bar
window.testProgressBar = function() {
    console.log('🧪 Testing Progress Bar Creation...');
    
    // Remove existing if any
    const existing = document.querySelector('.reading-progress');
    if (existing) {
        existing.remove();
        console.log('Removed existing progress bar');
    }
    
    // Create new one
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9999;
    `;
    
    const fill = progressBar.querySelector('.progress-fill');
    fill.style.cssText = `
        height: 100%;
        background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
        width: 50%;
        transition: width 0.1s ease-out;
    `;
    
    document.body.insertBefore(progressBar, document.body.firstChild);
    console.log('✅ Progress bar created manually with 50% width');
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogInteractions;
}
