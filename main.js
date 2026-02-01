/**
 * AARON ISHIMARU - PORTFOLIO CORE
 * Verified Apple Design Standards
 */

// 1. REVEAL SYSTEM
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. PILLS
const pills = document.querySelectorAll('.value-pill');
const descBox = document.getElementById('value-description');
pills.forEach(pill => {
    pill.addEventListener('click', () => {
        descBox.classList.remove('active');
        setTimeout(() => {
            descBox.innerText = pill.getAttribute('data-desc');
            descBox.classList.add('active');
        }, 150);
    });
});

// 3. SLIDER
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
if(slides.length > 0) {
    setInterval(() => showSlide(currentSlide + 1), 5000);
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
}

// 4. MODALS
const modal = document.getElementById('contactModal');
document.querySelectorAll('.contact-trigger, .contact-btn-top').forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});
window.onclick = (e) => {
    if (e.target == modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

console.log("%c Aaron Ishimaru | Strategic Health Tech ", "color: #0071e3; font-weight: bold; padding: 10px;");