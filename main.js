/**
 * AARON ISHIMARU - PORTFOLIO CORE
 * Optimized for Senior-Level technical presentation.
 */

// 1. SCROLL REVEAL ENGINE
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. VALUE PILLS INTERACTION (FADE TRANSITION)
const pills = document.querySelectorAll('.value-pill');
const descBox = document.getElementById('value-description');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Smoothly swap text
        descBox.classList.remove('active');
        setTimeout(() => {
            descBox.innerText = pill.getAttribute('data-desc');
            descBox.classList.add('active');
        }, 150);
    });
});

// 3. PERFORMANCE-OPTIMIZED IMAGE SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if(!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Automatic transition
if(slides.length > 0) {
    setInterval(() => showSlide(currentSlide + 1), 6000);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
}

// 4. MODAL LOGIC (LOCK SCROLL)
const modal = document.getElementById('contactModal');
const triggers = document.querySelectorAll('.contact-trigger, .contact-btn-top');

triggers.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// 5. SIGNATURE
console.log(
    "%c Aaron Ishimaru | Systems Strategist %c",
    "color: #fff; background: #0071e3; padding: 8px 12px; border-radius: 4px; font-weight: bold;",
    ""
);