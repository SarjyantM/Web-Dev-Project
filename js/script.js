// Typed Text Animation
const words = ["Web Developer", "Designer", "Creator", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typedText");

function typeEffect() {
    if (!typedElement) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, 100);
    }
}

// Update Clocks
function updateTimes() {
    const nepal = document.getElementById('nepalTime');
    const local = document.getElementById('localTime');
    
    if (nepal) {
        nepal.textContent = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kathmandu',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
    
    if (local) {
        local.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
}

// Auto Theme
function setTheme() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
}

// Contact Form
function setupForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (res.ok) {
                status.textContent = '✓ Message sent successfully!';
                status.style.color = '#28a745';
                form.reset();
            } else {
                status.textContent = '✗ Error sending message. Try again.';
                status.style.color = '#dc3545';
            }
        } catch {
            status.textContent = '✗ Error sending message. Try again.';
            status.style.color = '#dc3545';
        }
        
        setTimeout(() => status.textContent = '', 4000);
    });
}

// Back to Top
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile Menu
function setupMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.querySelector('nav ul');
    if (!menuIcon || !navMenu) return;
    
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    updateTimes();
    setInterval(updateTimes, 1000);
    setTheme();
    setInterval(setTheme, 60000);
    setupForm();
    setupBackToTop();
    setupMobileMenu();
});