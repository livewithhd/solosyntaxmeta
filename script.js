/**
 * Solo WebThree Portfolio Interactivity - MAX EVOLVED
 * Features: Smooth scrolling, Audio Playback, and Theme Toggle.
 */

// Global constant for fixed header height offset (used in scrolling)
const HEADER_OFFSET = 80;
const htmlElement = document.documentElement;
const themeToggleButton = document.getElementById('theme-toggle'); // Corrected ID
const audio = document.getElementById('background-music');


// --- 1. Audio Playback Logic ---

function initializeAudio() {
    if (!audio) return;
    
    // Attempt to play music on load (will fail in most modern browsers unless muted)
    audio.volume = 0.4; // Set volume to 40%
    audio.play().catch(e => {
        console.log("Autoplay failed. Waiting for user interaction.", e);
    });

    // This ensures audio starts unmuted as soon as the user clicks or scrolls
    const startAudio = () => {
        if (audio.paused) {
            audio.play().catch(e => {
                console.error("Audio interaction play failed:", e);
            });
        }
        // Remove listener after first successful attempt/interaction
        document.removeEventListener('click', startAudio);
        document.removeEventListener('scroll', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('scroll', startAudio);
}


// --- 2. Theme Toggle Logic (REFINED) ---

/**
 * Updates the appearance and button icon based on the current theme mode.
 */
function updateThemeAppearance(isDarkMode) {
    // If it IS dark mode, the button icon should be SUN (because clicking it switches to LIGHT)
    // If it IS light mode, the button icon should be MOON (because clicking it switches to DARK)
    const icon = isDarkMode ? '☀️' : '🌙'; 
    if (themeToggleButton) {
        themeToggleButton.textContent = icon;
    }
}

/**
 * Toggles the 'dark' class on the root HTML element.
 */
function toggleTheme() {
    htmlElement.classList.toggle('dark'); 
    const isDarkMode = htmlElement.classList.contains('dark');
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    updateThemeAppearance(isDarkMode);
}

// Initialize theme from local storage or set default to system/dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDarkMode = true; // Default to dark preference
    
    if (savedTheme === 'light') {
        isDarkMode = false;
    } else if (savedTheme === 'dark') {
        isDarkMode = true;
    } else {
        isDarkMode = prefersDark; // Use system preference if no saved theme
    }

    if (isDarkMode) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    // Attach event listener only after initialization
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    updateThemeAppearance(isDarkMode);
}


// --- 3. Smooth Scrolling Logic ---

/**
 * Attaches a click listener to all internal '#' links to enable smooth scrolling.
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for the fixed header
                const scrollPosition = targetElement.offsetTop - HEADER_OFFSET;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handles the Call-to-Action (CTA) Button to scroll to Projects
 */
function initializeCtaButton() {
    const ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault(); // Stop default navigation
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                window.scrollTo({
                    top: projectsSection.offsetTop - HEADER_OFFSET, 
                    behavior: 'smooth'
                });
            }
        });
    }
}


// Run initializers when the script loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // This is the single source of truth for theme initialization
    initializeAudio(); 
    initializeSmoothScrolling();
    initializeCtaButton();
});