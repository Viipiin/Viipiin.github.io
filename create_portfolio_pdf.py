#!/usr/bin/env python3
"""
Portfolio PDF Generator
Converts the index.html portfolio page to a PDF file
"""

import pdfkit
import os
import sys
from pathlib import Path

def create_portfolio_pdf():
    """
    Convert the portfolio HTML page to PDF
    """
    
    # Get the current directory (where the script is located)
    current_dir = Path(__file__).parent
    
    # Define file paths
    html_file = current_dir / "index.html"
    css_dir = current_dir / "assets" / "css"
    output_pdf = current_dir / "Vipin_Kumar_Portfolio.pdf"
    
    print(f"Converting portfolio to PDF...")
    print(f"HTML file: {html_file}")
    print(f"Output PDF: {output_pdf}")
    
    # Check if HTML file exists
    if not html_file.exists():
        print(f"Error: HTML file not found at {html_file}")
        return False
    
    # PDF generation options
    options = {
        'page-size': 'A4',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': "UTF-8",
        'no-outline': None,
        'enable-local-file-access': None,
        'print-media-type': None,
        'disable-smart-shrinking': None,
        'minimum-font-size': 12,
        'zoom': 1.0,
        'dpi': 300,
        'image-quality': 100,
        'orientation': 'Portrait',
        'disable-javascript': None,  # Disable JS to avoid issues
        'load-error-handling': 'ignore',
        'load-media-error-handling': 'ignore'
    }
    
    try:
        # Convert HTML to PDF
        pdfkit.from_file(str(html_file), str(output_pdf), options=options)
        
        print(f"✅ Portfolio PDF created successfully!")
        print(f"📄 File saved as: {output_pdf}")
        print(f"📏 File size: {output_pdf.stat().st_size / 1024:.1f} KB")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating PDF: {str(e)}")
        print("\nTroubleshooting tips:")
        print("1. Install wkhtmltopdf: https://wkhtmltopdf.org/downloads.html")
        print("2. Add wkhtmltopdf to your system PATH")
        print("3. Restart your terminal/command prompt")
        return False

def install_dependencies():
    """
    Install required Python packages
    """
    print("Installing required packages...")
    
    packages = ['pdfkit']
    
    for package in packages:
        try:
            import importlib
            importlib.import_module(package)
            print(f"✅ {package} already installed")
        except ImportError:
            print(f"📦 Installing {package}...")
            os.system(f"pip install {package}")

if __name__ == "__main__":
    print("🚀 Portfolio PDF Generator")
    print("=" * 50)
    
    # Check if dependencies are installed
    try:
        import pdfkit
        print("✅ All dependencies available")
    except ImportError:
        print("📦 Installing dependencies...")
        install_dependencies()
        try:
            import pdfkit
        except ImportError:
            print("❌ Failed to install dependencies. Please install manually:")
            print("pip install pdfkit")
            sys.exit(1)
    
    # Create the PDF
    success = create_portfolio_pdf()
    
    if success:
        print("\n🎉 Portfolio PDF generation completed!")
    else:
        print("\n❌ Portfolio PDF generation failed!")
        print("\nAlternative options:")
        print("1. Use browser 'Print to PDF' feature")
        print("2. Try online HTML to PDF converters")
        print("3. Use Puppeteer (Node.js) approach")
