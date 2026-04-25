/**
 * Blog Generator Utility - Quick article creation tool
 * Use this to generate new blog articles with the component system
 */

class BlogGenerator {
    constructor() {
        this.templates = {
            tutorial: 'tutorial-template',
            guide: 'guide-template',
            tips: 'tips-template',
            review: 'review-template'
        };
    }

    /**
     * Generate a new blog article
     * @param {Object} config - Article configuration
     * @returns {string} Complete HTML for the article
     */
    generateArticle(config) {
        const blogTemplate = new BlogTemplate(config);
        return blogTemplate.render();
    }

    /**
     * Create a tutorial-style article
     * @param {Object} config - Tutorial configuration
     * @returns {string} HTML content
     */
    createTutorial(config) {
        const defaultConfig = {
            category: 'Tutorial',
            difficulty: 'Intermediate',
            readTime: '10 min read',
            tags: ['tutorial', 'guide', 'development']
        };
        
        return this.generateArticle({ ...defaultConfig, ...config });
    }

    /**
     * Create a quick tips article
     * @param {Object} config - Tips configuration
     * @returns {string} HTML content
     */
    createTips(config) {
        const defaultConfig = {
            category: 'Tips & Tricks',
            difficulty: 'Beginner',
            readTime: '3 min read',
            tags: ['tips', 'quick', 'productivity']
        };
        
        return this.generateArticle({ ...defaultConfig, ...config });
    }

    /**
     * Helper to create common article sections
     */
    static createSections() {
        return {
            // Introduction section
            intro: (title, content) => `
                <div class="intro-section">
                    <h3 class="intro-title">${title}</h3>
                    <div class="intro-content">
                        ${content}
                    </div>
                </div>
            `,

            // Main section
            section: (title, content) => `
                <section class="article-section">
                    <h2>${title}</h2>
                    ${content}
                </section>
            `,

            // Code example
            codeExample: (title, code, language = 'javascript') => {
                const blogTemplate = new BlogTemplate();
                return blogTemplate.createCodeBlockTemplate()(title, code, language);
            },

            // Method card
            methodCard: (badge, title, content, type = 'default') => {
                const blogTemplate = new BlogTemplate();
                return blogTemplate.createMethodCardTemplate()(badge, title, content, type);
            },

            // Alert box
            alert: (title, content, type = 'info') => {
                const blogTemplate = new BlogTemplate();
                return blogTemplate.createWarningBoxTemplate()(title, content, type);
            },

            // Takeaways
            takeaways: (items) => {
                const blogTemplate = new BlogTemplate();
                return blogTemplate.createTakeawaysTemplate()(items);
            },

            // Table of contents
            toc: (headings) => `
                <div class="table-of-contents">
                    <h3>📚 Table of Contents</h3>
                    <ul class="toc-list">
                        ${headings.map((heading, index) => `
                            <li class="toc-item">
                                <a href="#${heading.id || 'section-' + index}" class="toc-link">
                                    ${heading.title}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `,

            // Feature list
            featureList: (title, items) => `
                <div class="feature-list">
                    <h4 class="feature-list-title">${title}</h4>
                    <ul class="feature-items">
                        ${items.map(item => `<li class="feature-item">${item}</li>`).join('')}
                    </ul>
                </div>
            `
        };
    }

    /**
     * Example article configurations
     */
    static getExampleConfigs() {
        return {
            // Power Platform tutorial
            powerPlatformTutorial: {
                title: "Building Custom Connectors in Power Platform",
                description: "Step-by-step guide to creating custom connectors for enterprise integrations",
                category: "Power Platform",
                difficulty: "Advanced",
                readTime: "15 min read",
                tags: ["powerplatform", "connectors", "integration", "api"],
                author: "Vipin Kumar",
                publishDate: new Date().toLocaleDateString()
            },

            // SharePoint guide
            sharePointGuide: {
                title: "SharePoint PnP PowerShell Migration Scripts",
                description: "Automate your SharePoint migrations with PowerShell PnP scripts and best practices",
                category: "SharePoint",
                difficulty: "Intermediate",
                readTime: "12 min read",
                tags: ["sharepoint", "powershell", "migration", "automation"],
                author: "Vipin Kumar",
                publishDate: new Date().toLocaleDateString()
            },

            // Quick tips
            quickTips: {
                title: "5 Power Automate Tips That Will Save You Hours",
                description: "Simple yet powerful tips to optimize your Power Automate flows",
                category: "Tips & Tricks",
                difficulty: "Beginner",
                readTime: "5 min read",
                tags: ["powerautomate", "tips", "productivity", "optimization"],
                author: "Vipin Kumar",
                publishDate: new Date().toLocaleDateString()
            }
        };
    }

    /**
     * Validate article configuration
     * @param {Object} config - Article configuration to validate
     * @returns {Object} Validation result
     */
    validateConfig(config) {
        const required = ['title', 'description'];
        const missing = required.filter(field => !config[field]);
        
        return {
            valid: missing.length === 0,
            missing: missing,
            warnings: this.getConfigWarnings(config)
        };
    }

    getConfigWarnings(config) {
        const warnings = [];
        
        if (!config.category) warnings.push('Category not specified');
        if (!config.difficulty) warnings.push('Difficulty level not set');
        if (!config.readTime) warnings.push('Read time estimate missing');
        if (!config.tags || config.tags.length === 0) warnings.push('No tags specified');
        if (config.description && config.description.length > 160) {
            warnings.push('Description might be too long for meta description');
        }
        
        return warnings;
    }
}

/**
 * Quick helper functions for common tasks
 */
window.BlogUtils = {
    // Generate a new article
    createArticle: (config) => {
        const generator = new BlogGenerator();
        return generator.generateArticle(config);
    },

    // Create sections
    sections: BlogGenerator.createSections(),

    // Get example configurations
    examples: BlogGenerator.getExampleConfigs(),

    // Escape HTML
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Generate slug from title
    generateSlug: (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Example usage in console:
/*
// Create a new tutorial
const newTutorial = BlogUtils.createArticle({
    title: "Advanced Power Apps Canvas App Development",
    description: "Master advanced techniques for building scalable Power Apps canvas applications",
    category: "Power Apps",
    difficulty: "Advanced",
    readTime: "20 min read",
    tags: ["powerapps", "canvas", "advanced", "development"],
    author: "Vipin Kumar"
});

// Generate individual sections
const introSection = BlogUtils.sections.intro(
    "🎯 What You'll Learn",
    "<p>In this comprehensive guide, you'll discover advanced Power Apps techniques...</p>"
);

const codeSection = BlogUtils.sections.codeExample(
    "Advanced Formula Example",
    `Set(varUserRole, 
    If(
        User().Email in colAdmins.Email,
        "Admin",
        If(
            User().Email in colManagers.Email,
            "Manager", 
            "User"
        )
    )
);`,
    "powerapps"
);
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogGenerator, BlogTemplate };
}
