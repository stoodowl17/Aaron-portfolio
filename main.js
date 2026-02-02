/**
 * AARON ISHIMARU - CORE SYSTEMS
 */

// 1. SCROLLSPY (ACTIVE NAV HIGHLIGHTING)
const scrollSpy = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 250) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
};
window.addEventListener("scroll", scrollSpy);

// 2. REVEAL SYSTEM (INTERSECTION OBSERVER)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 3. PILL LOGIC (STATE MANAGEMENT)
const pills = document.querySelectorAll('.value-pill');
const descBox = document.getElementById('value-description');
pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        
        descBox.classList.remove('active');
        setTimeout(() => {
            descBox.innerText = pill.getAttribute('data-desc');
            descBox.classList.add('active');
        }, 150);
    });
});

// 4. IMAGE SLIDER
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

// 5. MODAL SYSTEM
const setupModal = (id, triggerClass) => {
    const modal = document.getElementById(id);
    document.querySelectorAll(`.${triggerClass}`).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
};
setupModal('contactModal', 'contact-trigger');

console.log("%c Strategic Architecture Operational ", "color: #0071e3; font-weight: bold; padding: 10px;");