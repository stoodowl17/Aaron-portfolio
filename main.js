/**
 * AARON ISHIMARU - CORE SYSTEMS
 */

// 1. SLIDER ENGINE
let currentSlide = 0;
let slideTimer;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const bentoBtns = document.querySelectorAll('.achievement-btn');

function showSlide(n) {
    if(!slides.length) return;
    
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    bentoBtns.forEach(b => b.classList.remove('active-choice'));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    const currentBento = document.querySelector(`.achievement-btn[data-index="${currentSlide}"]`);
    if(currentBento) currentBento.classList.add('active-choice');
}

function startSlideTimer() {
    stopSlideTimer();
    slideTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);
}

function stopSlideTimer() {
    clearInterval(slideTimer);
}

bentoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        stopSlideTimer(); 
        const index = parseInt(btn.getAttribute('data-index'));
        showSlide(index);
        setTimeout(startSlideTimer, 10000); 
    });
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        stopSlideTimer();
        showSlide(i);
        setTimeout(startSlideTimer, 10000);
    });
});

showSlide(0);
startSlideTimer();

// 2. SCROLLSPY
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
        if (link.getAttribute("href").includes(current)) link.classList.add("active");
    });
};
window.addEventListener("scroll", scrollSpy);

// 3. REVEALS
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 4. PILLS
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

// 5. MODAL
const modal = document.getElementById('contactModal');
document.querySelectorAll('.contact-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

console.log("%c Engineered by Aaron Ishimaru ", "color: #0071e3; font-weight: bold; padding: 10px;");