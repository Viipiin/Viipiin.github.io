#!/usr/bin/env python3
"""
Portfolio PDF Generator using Playwright
More reliable alternative that handles modern CSS and JavaScript
"""

import asyncio
import os
from pathlib import Path
from datetime import datetime

async def create_portfolio_pdf_playwright():
    """
    Convert portfolio HTML to PDF using Playwright (Chrome-based)
    """
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("❌ Playwright not installed. Installing...")
        os.system("pip install playwright")
        os.system("playwright install chromium")
        from playwright.async_api import async_playwright
    
    current_dir = Path(__file__).parent
    html_file = current_dir / "index.html"
    output_pdf = current_dir / f"Vipin_Kumar_Portfolio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    
    print(f"🚀 Creating PDF using Playwright...")
    print(f"📄 Source: {html_file}")
    print(f"💾 Output: {output_pdf}")
    
    if not html_file.exists():
        print(f"❌ HTML file not found: {html_file}")
        return False
    
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Set viewport for consistent rendering
        await page.set_viewport_size({"width": 1200, "height": 800})
        
        # Load the HTML file
        await page.goto(f"file://{html_file.absolute()}")
        
        # Wait for content to load (including fonts and images)
        await page.wait_for_load_state('networkidle')
        
        # Additional wait for any animations or dynamic content
        await asyncio.sleep(2)
        
        # Generate PDF with professional settings
        await page.pdf(
            path=str(output_pdf),
            format='A4',
            margin={
                'top': '20mm',
                'right': '15mm', 
                'bottom': '20mm',
                'left': '15mm'
            },
            print_background=True,
            display_header_footer=True,
            header_template='<div style="font-size: 10px; margin: 0 auto; color: #666;">Vipin Kumar - Solution Architect Portfolio</div>',
            footer_template='<div style="font-size: 10px; margin: 0 auto; color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            prefer_css_page_size=False,
            scale=0.8  # Slightly reduce scale to fit content better
        )
        
        await browser.close()
        
        if output_pdf.exists():
            file_size = output_pdf.stat().st_size / 1024
            print(f"✅ PDF created successfully!")
            print(f"📏 File size: {file_size:.1f} KB")
            print(f"📍 Location: {output_pdf}")
            return True
        else:
            print(f"❌ PDF creation failed")
            return False

def create_simplified_html():
    """
    Create a simplified HTML version optimized for PDF generation
    """
    current_dir = Path(__file__).parent
    original_html = current_dir / "index.html"
    simplified_html = current_dir / "portfolio_pdf_version.html"
    
    print("📝 Creating PDF-optimized HTML version...")
    
    if not original_html.exists():
        print(f"❌ Original HTML not found: {original_html}")
        return None
    
    # Read original HTML
    with open(original_html, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Modify for better PDF rendering
    pdf_optimized_content = content.replace(
        '<link rel="stylesheet" href="assets/css/styles.css">',
        '''<link rel="stylesheet" href="assets/css/styles.css">
        <style>
        /* PDF-specific optimizations */
        @media print {
            .header-component, #headerContainer { display: none !important; }
            .back-to-top { display: none !important; }
            body { 
                font-size: 12px !important; 
                line-height: 1.4 !important;
                color: #000 !important;
            }
            .container { 
                margin-top: 0 !important; 
                padding-top: 0 !important;
            }
            .header { margin-top: 20px !important; }
            .section { page-break-inside: avoid; margin-bottom: 15px; }
            .experience-item { page-break-inside: avoid; margin-bottom: 10px; }
            h1, h2, h3 { page-break-after: avoid; color: #000 !important; }
            .stats-grid { display: flex; flex-wrap: wrap; gap: 10px; }
            .stat-item { flex: 1; min-width: 200px; }
            .skills-grid { display: block; }
            .skill-category { margin-bottom: 15px; }
            .skill-tag { 
                display: inline-block; 
                margin: 2px; 
                padding: 2px 6px; 
                border: 1px solid #ddd;
                font-size: 10px;
            }
            .profile-img { 
                width: 60px !important; 
                height: 60px !important; 
                font-size: 24px !important;
            }
            .creative-footer { 
                page-break-before: always; 
                margin-top: 20px;
            }
        }
        </style>'''
    )
    
    # Remove or simplify JavaScript that might cause issues
    pdf_optimized_content = pdf_optimized_content.replace(
        '<script src="assets/js/header-component.js"></script>',
        '<!-- Header component disabled for PDF -->'
    ).replace(
        '<script src="assets/js/back-to-top.js"></script>',
        '<!-- Back to top disabled for PDF -->'
    )
    
    # Save optimized version
    with open(simplified_html, 'w', encoding='utf-8') as f:
        f.write(pdf_optimized_content)
    
    print(f"✅ PDF-optimized HTML created: {simplified_html}")
    return simplified_html

async def main():
    """
    Main function to orchestrate PDF creation
    """
    print("🎯 Vipin Kumar - Portfolio PDF Generator")
    print("=" * 50)
    
    # Method 1: Try with simplified HTML
    simplified_html = create_simplified_html()
    if simplified_html:
        print("\n🔄 Attempting PDF creation with optimized HTML...")
        
        # Temporarily replace the path for PDF generation
        current_dir = Path(__file__).parent
        original_html = current_dir / "index.html"
        simplified_html_path = current_dir / "portfolio_pdf_version.html"
        
        # Update the path in the function
        global html_file
        
        # Modify the function to use simplified HTML
        success = await create_portfolio_pdf_playwright_simplified(simplified_html_path)
        
        if success:
            print("\n🎉 Portfolio PDF created successfully!")
            # Clean up temporary file
            try:
                simplified_html_path.unlink()
                print("🧹 Temporary files cleaned up")
            except:
                pass
        else:
            print("\n❌ PDF creation failed with optimized HTML")
            print("💡 Trying with original HTML...")
            success = await create_portfolio_pdf_playwright()
    else:
        print("\n🔄 Creating PDF with original HTML...")
        success = await create_portfolio_pdf_playwright()
    
    if not success:
        print("\n💡 Alternative approaches:")
        print("1. Open index.html in Chrome/Edge and use 'Print to PDF'")
        print("2. Use online HTML to PDF converters")
        print("3. Install wkhtmltopdf and use the first script")

async def create_portfolio_pdf_playwright_simplified(html_path):
    """
    Create PDF using the simplified HTML version
    """
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("❌ Playwright not installed. Installing...")
        os.system("pip install playwright")
        os.system("playwright install chromium")
        from playwright.async_api import async_playwright
    
    output_pdf = html_path.parent / f"Vipin_Kumar_Portfolio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    
    print(f"📄 Using simplified HTML: {html_path}")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Load the simplified HTML
        await page.goto(f"file://{html_path.absolute()}")
        await page.wait_for_load_state('networkidle')
        await asyncio.sleep(1)
        
        # Generate PDF
        await page.pdf(
            path=str(output_pdf),
            format='A4',
            margin={'top': '15mm', 'right': '10mm', 'bottom': '15mm', 'left': '10mm'},
            print_background=True,
            display_header_footer=True,
            header_template='<div style="font-size: 9px; margin: 0 auto; color: #666; text-align: center; width: 100%;">Vipin Kumar - Solution Architect Portfolio</div>',
            footer_template='<div style="font-size: 9px; margin: 0 auto; color: #666; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            scale=0.85
        )
        
        await browser.close()
        
        if output_pdf.exists():
            file_size = output_pdf.stat().st_size / 1024
            print(f"✅ PDF created: {output_pdf}")
            print(f"📏 Size: {file_size:.1f} KB")
            return True
        return False

if __name__ == "__main__":
    asyncio.run(main())
