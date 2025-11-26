/**
 * Solo WebThree Portfolio Interactivity - MAX EVOLVED
 * Features: Smooth scrolling and Terminal Mode (Dark/Light Theme Toggle).
 */

// Global constant for fixed header height offset (used in scrolling)
const HEADER_OFFSET = 80;
const htmlElement = document.documentElement;
const themeToggleButton = document.getElementById('theme-toggle-button');


// --- 1. Theme Toggle Logic (New Feature) ---

/**
 * Updates the appearance based on the current theme mode.
 */
function updateThemeAppearance() {
    const isDarkMode = htmlElement.classList.contains('dark');
    
    if (isDarkMode) {
        // Dark Mode is ON
        themeToggleButton.textContent = 'TERMINAL MODE';
        // You can add more dark mode specific changes here
    } else {
        // Light Mode is ON
        themeToggleButton.textContent = 'NEON MODE';
        // You can add more light mode specific changes here
    }
}

/**
 * Toggles the 'dark' class on the root HTML element.
 */
function toggleTheme() {
    // Toggles the 'dark' class, which triggers the CSS variable change
    htmlElement.classList.toggle('dark'); 
    
    // Save preference to localStorage (optional, but good practice)
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    updateThemeAppearance();
}

// Initialize theme from local storage or set default to dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else { // Defaults to dark if no preference or saved theme is dark
        htmlElement.classList.add('dark');
    }
    
    updateThemeAppearance();
}

// Attach event listener to the toggle button
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}


// --- 2. Smooth Scrolling Logic ---

/**
 * Attaches a click listener to all internal '#' links to enable smooth scrolling.
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const scrollPosition = targetElement.offsetTop - HEADER_OFFSET;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Handles the Call-to-Action (CTA) Button to scroll to Projects
 */
const ctaButton = document.getElementById('cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            window.scrollTo({
                top: projectsSection.offsetTop - HEADER_OFFSET, 
                behavior: 'smooth'
            });
        }
    });
}

// Run the theme initializer when the script loads
document.addEventListener('DOMContentLoaded', initializeTheme);