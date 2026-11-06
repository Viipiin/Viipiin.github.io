/**
 * Blog Template Engine - Component-Based Architecture
 * Creates reusable components for consistent blog layout and functionality
 */

class BlogTemplate {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'Blog Article',
            author: config.author || 'Vipin Kumar',
            publishDate: config.publishDate || new Date().toLocaleDateString(),
            category: config.category || 'General',
            difficulty: config.difficulty || 'Intermediate',
            readTime: config.readTime || '5 min read',
            description: config.description || '',
            tags: config.tags || [],
            relatedArticles: config.relatedArticles || [],
            shareTitle: config.shareTitle || '📤 Share This Article',
            shareDescription: config.shareDescription || 'Found this helpful? Share it with your team!',
            ...config
        };
        this.components = {};
        this.init();
    }

    init() {
        this.createComponents();
        this.setupEventListeners();
        this.setupAnimations();
    }

    createComponents() {
        this.components = {
            navbar: this.createNavbar(),
            hero: this.createHero(),
            article: this.createArticleContainer(),
            codeBlock: this.createCodeBlockTemplate(),
            methodCard: this.createMethodCardTemplate(),
            warningBox: this.createWarningBoxTemplate(),
            takeaways: this.createTakeawaysTemplate(),
            relatedArticles: this.createRelatedArticlesTemplate(),
            shareSection: this.createShareSectionTemplate(),
            backButton: this.createBackButton()
        };
    }

    // Navigation Component
    createNavbar() {
        return `
            <nav class="navbar" id="navbar">
                <div class="nav-container">
                    <a href="../index.html" class="logo">Vipin Kumar</a>
                    <ul class="nav-links">
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../pages/blog.html" class="active">Blog</a></li>
                        <li><a href="../pages/contact.html">Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }

    // Hero Section Component
    createHero() {
        const categoryClass = this.config.category.toLowerCase().replace(/\s+/g, '-');
        const difficultyClass = this.config.difficulty.toLowerCase();
        
        return `
            <div class="hero">
                <div class="hero-container">
                    <div class="hero-content">
                        <div class="article-meta">
                            <span class="category-badge ${categoryClass}">${this.config.category}</span>
                            <span class="difficulty-badge ${difficultyClass}">${this.config.difficulty}</span>
                            <span class="read-time">${this.config.readTime}</span>
                        </div>
                        
                        <h1 class="article-title">${this.config.title}</h1>
                        <p class="article-description">${this.config.description}</p>
                        
                        <div class="hero-meta">
                            <div class="author-info">
                                <span class="author-name">By ${this.config.author}</span>
                                <span class="publish-date">${this.config.publishDate}</span>
                            </div>
                            ${this.config.tags.length > 0 ? `
                                <div class="article-tags">
                                    ${this.config.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Article Container Component
    createArticleContainer() {
        return `
            <main class="main-content">
                <div class="article-container">
                    <div class="article-content" id="article-content">
                        <!-- Article content will be inserted here -->
                    </div>
                </div>
            </main>
        `;
    }

    // Code Block Component
    createCodeBlockTemplate() {
        return (title, code, language = 'javascript') => `
            <div class="code-block">
                <div class="code-header">
                    <span class="code-title">${title}</span>
                    <div class="code-actions">
                        <span class="code-language">${language}</span>
                        <button class="copy-button" onclick="BlogComponents.copyCode(this)">
                            <span class="copy-icon">📋</span>
                            <span class="copy-text">Copy Code</span>
                        </button>
                    </div>
                </div>
                <div class="code-content">
                    <pre><code class="language-${language}">${this.escapeHtml(code)}</code></pre>
                </div>
            </div>
        `;
    }

    // Method Card Component
    createMethodCardTemplate() {
        return (badge, title, content, type = 'default') => `
            <div class="method-card ${type}">
                <div class="method-header">
                    <span class="method-badge ${type}">${badge}</span>
                    <h3 class="method-title">${title}</h3>
                </div>
                <div class="method-content">
                    ${content}
                </div>
            </div>
        `;
    }

    // Warning Box Component
    createWarningBoxTemplate() {
        return (title, content, type = 'warning') => `
            <div class="alert-box ${type}">
                <div class="alert-header">
                    <span class="alert-icon">${this.getAlertIcon(type)}</span>
                    <h4 class="alert-title">${title}</h4>
                </div>
                <div class="alert-content">
                    ${content}
                </div>
            </div>
        `;
    }

    // Takeaways Component
    createTakeawaysTemplate() {
        return (items) => `
            <div class="takeaways">
                <h3 class="takeaways-title">🎯 Key Takeaways</h3>
                <div class="takeaway-grid">
                    ${items.map(item => `
                        <div class="takeaway-item">
                            <div class="takeaway-icon">${item.icon}</div>
                            <h4 class="takeaway-heading">${item.title}</h4>
                            <p class="takeaway-description">${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Related Articles Component
    createRelatedArticlesTemplate() {
        return (articles) => {
            if (!articles || articles.length === 0) {
                return '';
            }

            const articlesHTML = articles.map(article => `
                <a href="${article.url}" class="related-card${article.disabled ? ' disabled' : ''}">
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                </a>
            `).join('');

            return `
                <div class="related-articles">
                    <h3>📚 Related Articles</h3>
                    <div class="related-grid">
                        ${articlesHTML}
                    </div>
                </div>
            `;
        };
    }

    // Share Section Component
    createShareSectionTemplate() {
        return (title = '📤 Share This Article', description = 'Found this helpful? Share it with your team!') => `
            <div class="share-section">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="share-buttons">
                    <button class="share-btn" onclick="BlogComponents.copyUrl()">📋 Copy Link</button>
                    <button class="share-btn" onclick="BlogComponents.shareToLinkedIn()">💼 LinkedIn</button>
                    <button class="share-btn" onclick="BlogComponents.shareToTwitter()">🐦 Twitter</button>
                </div>
            </div>
        `;
    }

    // Back Button Component
    createBackButton() {
        return `
            <!-- Fixed Back to Blog Button -->
            <div class="fixed-back-button">
                <a href="../pages/blog.html" class="back-link">
                    <span class="back-icon">←</span>
                    <span class="back-text">Back to Blog</span>
                </a>
            </div>
        `;
    }

    // Inline Back Button (for content flow)
    createInlineBackButton() {
        return `
            <div class="inline-back-button">
                <a href="../pages/blog.html" class="back-link">
                    <span class="back-icon">←</span>
                    <span class="back-text">Back to Blog</span>
                </a>
            </div>
        `;
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getAlertIcon(type) {
        const icons = {
            warning: '⚠️',
            info: 'ℹ️',
            success: '✅',
            error: '❌',
            tip: '💡'
        };
        return icons[type] || icons.info;
    }

    // Render the complete template
    render() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.config.title} | Vipin Kumar</title>
                <link rel="icon" type="image/svg+xml" href="../favicon.svg">
                <meta name="description" content="${this.config.description}">
                <meta name="author" content="${this.config.author}">
                <meta name="keywords" content="${this.config.tags.join(', ')}">
                
                <!-- Google Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
                
                <!-- Stylesheets -->
                <link rel="stylesheet" href="assets/css/blog-template.css">
                <link rel="stylesheet" href="assets/css/blog-components.css">
            </head>
            <body>
                ${this.components.navbar}
                ${this.components.hero}
                ${this.components.article}
                ${this.components.backButton}
                
                <!-- Scripts -->
                <script src="assets/js/blog-components.js"></script>
                <script src="assets/js/blog-interactions.js"></script>
            </body>
            </html>
        `;
    }
}

// Blog Components Utility Functions
window.BlogComponents = {
    // Copy code functionality
    copyCode: function(button) {
        const codeBlock = button.closest('.code-block').querySelector('code');
        const text = codeBlock.textContent;
        
        // Add loading state
        button.classList.add('copying');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="copy-icon">⏳</span><span class="copy-text">Copying...</span>';
        
        navigator.clipboard.writeText(text).then(() => {
            button.innerHTML = '<span class="copy-icon">✅</span><span class="copy-text">Copied!</span>';
            button.classList.add('success');
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copying', 'success');
            }, 2000);
        }).catch(() => {
            button.innerHTML = '<span class="copy-icon">❌</span><span class="copy-text">Failed</span>';
            button.classList.add('error');
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copying', 'error');
            }, 2000);
        });
    },

    // Create section with animation
    createSection: function(title, content, className = '') {
        return `
            <section class="article-section ${className}">
                <h2 class="section-title">${title}</h2>
                <div class="section-content">
                    ${content}
                </div>
            </section>
        `;
    },

    // Create intro section
    createIntro: function(title, content) {
        return `
            <div class="intro-section">
                <h3 class="intro-title">${title}</h3>
                <div class="intro-content">
                    ${content}
                </div>
            </div>
        `;
    },

    // Create feature list
    createFeatureList: function(title, items) {
        return `
            <div class="feature-list">
                <h4 class="feature-list-title">${title}</h4>
                <ul class="feature-items">
                    ${items.map(item => `<li class="feature-item">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    },

    // Create fixed back button
    createFixedBackButton: function() {
        return `
            <!-- Fixed Back to Blog Button -->
            <div class="fixed-back-button">
                <a href="../pages/blog.html" class="back-link">
                    <span class="back-icon">←</span>
                    <span class="back-text">Back to Blog</span>
                </a>
            </div>
        `;
    },

    // Create inline back button
    createInlineBackButton: function() {
        return `
            <div class="inline-back-button">
                <a href="../pages/blog.html" class="back-link">
                    <span class="back-icon">←</span>
                    <span class="back-text">Back to Blog</span>
                </a>
            </div>
        `;
    },

    // Add fixed back button to page
    addFixedBackButton: function() {
        // Remove existing fixed back button if any
        const existing = document.querySelector('.fixed-back-button');
        if (existing) {
            existing.remove();
        }

        // Create and add the fixed back button
        const backButtonHTML = this.createFixedBackButton();
        document.body.insertAdjacentHTML('beforeend', backButtonHTML);
    },

    // Create related articles section
    createRelatedArticles: function(articles) {
        if (!articles || articles.length === 0) {
            return '';
        }

        const articlesHTML = articles.map(article => `
            <a href="${article.url}" class="related-card${article.disabled ? ' disabled' : ''}">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
            </a>
        `).join('');

        return `
            <div class="related-articles">
                <h3>📚 Related Articles</h3>
                <div class="related-grid">
                    ${articlesHTML}
                </div>
            </div>
        `;
    },

    // Create share section
    createShareSection: function(title = '📤 Share This Article', description = 'Found this helpful? Share it with your team!') {
        return `
            <div class="share-section">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="share-buttons">
                    <button class="share-btn" onclick="BlogComponents.copyUrl()">📋 Copy Link</button>
                    <button class="share-btn" onclick="BlogComponents.shareToLinkedIn()">💼 LinkedIn</button>
                    <button class="share-btn" onclick="BlogComponents.shareToTwitter()">🐦 Twitter</button>
                </div>
            </div>
        `;
    },

    // Add related articles to page
    addRelatedArticles: function(articles, targetSelector = '.article-content') {
        const relatedHTML = this.createRelatedArticles(articles);
        if (relatedHTML) {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.insertAdjacentHTML('beforeend', relatedHTML);
            }
        }
    },

    // Add share section to page
    addShareSection: function(title, description, targetSelector = '.article-content') {
        const shareHTML = this.createShareSection(title, description);
        const target = document.querySelector(targetSelector);
        if (target) {
            target.insertAdjacentHTML('beforeend', shareHTML);
        }
    },

    // Share functionality
    shareToLinkedIn: function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=600');
    },

    shareToTwitter: function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        window.open(twitterUrl, '_blank', 'width=600,height=600');
    },

    copyUrl: function() {
        const url = window.location.href;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('✅ Link copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.fallbackCopyTextToClipboard(url);
            });
        } else {
            this.fallbackCopyTextToClipboard(url);
        }
    },

    fallbackCopyTextToClipboard: function(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showToast('✅ Link copied to clipboard!', 'success');
            } else {
                this.showToast('❌ Failed to copy link', 'error');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            this.showToast('❌ Copy not supported', 'error');
        }
        
        document.body.removeChild(textArea);
    },

    // Toast notification system
    showToast: function(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogTemplate;
}
