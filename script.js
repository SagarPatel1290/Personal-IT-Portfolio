/**
 * ============================================================================
 * SAGAR PATEL PORTFOLIO - MAIN APPLICATION LOGIC
 * Description: Handles UI interactions, animations, theme toggling, 
 * scroll observers, and custom cursor logic.
 * Author: Sagar Patel
 * ============================================================================
 */

/* --- 1. SCROLL RESTORATION --- */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => window.scrollTo(0, 0));

/* --- 2. EXTERNAL LIBRARY INIT --- */
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 50 });
}

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), { 
        max: 5, speed: 400, glare: true, "max-glare": 0.1 
    });
}

/* --- 3. DYNAMIC TYPEWRITER EFFECT --- */
const typewriterElement = document.getElementById('typewriter');
const words = ["Web Developer", "Android Developer", "Computer Educator", "IT Logic Expert", "Full Stack Developer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];
    charIndex += isDeleting ? -1 : 1;
    typewriterElement.textContent = currentWord.substring(0, charIndex);
    
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; 
        wordIndex = (wordIndex + 1) % words.length; 
        typeSpeed = 500; 
    }
    
    setTimeout(typeEffect, typeSpeed);
}
setTimeout(typeEffect, 500);

/* --- 4. THEME MANAGEMENT --- */
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    themeToggleBtn.addEventListener('click', () => {
        rootElement.classList.toggle('dark-theme');
        themeIcon.className = rootElement.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon';
    });
}

/* --- 5. PROGRESS BAR ANIMATION (INTERSECTION OBSERVER) --- */
document.addEventListener("DOMContentLoaded", () => {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const match = bar.getAttribute('style')?.match(/--target-width:\s*([^;]+)/);
                if (match) bar.style.width = match[1]; 
                skillObserver.unobserve(bar); 
            }
        });
    }, { threshold: 0.5 }); 

    progressFills.forEach(bar => {
        bar.style.width = "0"; 
        skillObserver.observe(bar);
    });
});

/* --- 6. SCROLL PROGRESS INDICATOR --- */
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = `${(window.scrollY / totalHeight) * 100}%`;
    });
}

/* --- 7. DESKTOP CURSOR TRACKING --- */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 150, fill: "forwards" });
    });
}

/* --- 8. MOBILE TOUCH RIPPLE EFFECT --- */
window.addEventListener("touchstart", (e) => {
    // Desktop par ripple nahi chahiye, sirf touch devices par
    const ripple = document.createElement("div");
    ripple.className = "touch-ripple";
    
    // Touch location handle karne ke liye (e.touches[0])
    const touch = e.touches[0];
    ripple.style.left = `${touch.clientX}px`;
    ripple.style.top = `${touch.clientY}px`;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 500);
}, { passive: true });

/* --- 9. DYNAMIC HEADER LOGIC --- */
const mainHeader = document.getElementById('main-header');
if (mainHeader) {
    window.addEventListener('scroll', () => {
        mainHeader.classList.toggle('scrolled', window.scrollY > 150);
    });
}

/* --- 10. BACK TO TOP BUTTON --- */
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        backToTopBtn.classList.toggle("show", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* --- 11. CONSOLE GREETING (EASTER EGG) --- */
setTimeout(() => {
    console.log("%cHello Recruiter! 👋", "color: #3b82f6; font-size: 30px; font-weight: bold; text-shadow: 1px 1px 0px #000;");
    console.log("%cI see you are inspecting my code. You have good taste! 😉\nIf you are looking for a dedicated Web/Android Developer in Gujarat, let's connect:\n📧 Email: sagarp451@gmail.com\n📞 Phone: +91 94289 02507", "font-size: 16px; color: #10b981; line-height: 1.5;");
}, 2000);

/* --- 12. GOOGLE ANALYTICS (GA4) EVENT TRACKING --- */
const GA_TRACKING_ID = 'G-2BHKR9534B';

const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA_TRACKING_ID);

document.addEventListener('DOMContentLoaded', () => {
    
    // Generic tracking helper
    const trackClick = (selector, eventName) => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('click', () => {
                gtag('event', eventName);
                console.log(`Analytics Tracked: ${eventName}`);
            });
        });
    };

    // Standard Interactions
    trackClick('.btn-download', 'download_resume');
    trackClick('.btn-linkedin', 'click_linkedin');
    trackClick('.btn-whatsapp', 'click_call_whatsapp');
    trackClick('.btn-email', 'click_email');
    trackClick('.btn-github', 'click_github');
    trackClick('.floating-wa', 'click_floating_whatsapp');

    // Live Demo Clicks (Dynamic Payload)
    document.querySelectorAll('.btn-live').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-info');
            const projectName = projectCard ? projectCard.querySelector('h3').innerText.split('\n')[0] : 'Unknown Project';
            
            gtag('event', 'click_live_demo', { 'project_name': projectName });
            console.log(`Analytics Tracked: Live Demo - ${projectName}`);
        });
    });
});