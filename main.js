/**
 * AARON ISHIMARU - PORTFOLIO CORE
 * Capitalization Check: PASS
 */

// 1. SCROLL REVEALS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. AUDIO (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq = 440) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    osc.start(); osc.stop(audioCtx.currentTime + 0.12);
}

// 3. PILLS
const pills = document.querySelectorAll('.value-pill');
const descBox = document.getElementById('value-description');
pills.forEach(pill => {
    pill.addEventListener('click', () => {
        playTone(300);
        descBox.style.opacity = 0;
        setTimeout(() => {
            descBox.innerText = pill.getAttribute('data-desc');
            descBox.style.opacity = 1;
        }, 150);
    });
});

// 4. SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
function showSlide(n) {
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

// 5. MODALS
const setupModal = (id, triggerClass) => {
    const modal = document.getElementById(id);
    if(!modal) return;
    document.querySelectorAll(`.${triggerClass}`).forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    modal.querySelectorAll('.close-modal').forEach(close => {
        close.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
};
setupModal('contactModal', 'contact-trigger');
setupModal('codeModal', 'btn-ghost');

// 6. CODE PAD (Original logic: 5862)
let currentCode = "";
const responses = ["Access Denied", "Nice try.", "Are you guessing?", "404: Code Not Found.", "Wrong.", "Is that your final answer?", "Nope."];
document.querySelectorAll('.key').forEach(k => {
    k.addEventListener('click', (e) => {
        if(currentCode.length < 4) {
            currentCode += e.target.innerText;
            document.getElementById('codeDisplay').innerText = currentCode.replace(/./g, '•');
            playTone(600);
        }
    });
});
document.getElementById('clrKey').addEventListener('click', () => {
    currentCode = "";
    document.getElementById('codeDisplay').innerText = "----";
});
document.getElementById('entKey').addEventListener('click', () => {
    if(currentCode === "5862") {
        playTone(880);
        window.location.href = "studio.html";
    } else {
        const msg = responses[Math.floor(Math.random() * responses.length)];
        document.getElementById('codeMsg').innerText = msg;
        currentCode = "";
        document.getElementById('codeDisplay').innerText = "----";
        setTimeout(() => document.getElementById('codeMsg').innerText = "", 2000);
    }
});

// 7. BLACK HOLE (Easter Egg)
const logo = document.getElementById('interactive-logo');
let chaosTimer;

logo.addEventListener('mouseenter', () => {
    logo.classList.add('logo-spin');
    chaosTimer = setTimeout(triggerBlackHole, 2000);
});
logo.addEventListener('mouseleave', () => {
    logo.classList.remove('logo-spin');
    clearTimeout(chaosTimer);
});

function triggerBlackHole() {
    const logoImg = document.getElementById('interactive-logo');
    document.body.appendChild(logoImg);
    logoImg.classList.add('logo-centered');

    setTimeout(() => {
        document.getElementById('site-header').classList.add('implode');
        document.getElementById('site-main').classList.add('implode');
        document.getElementById('site-footer').classList.add('implode');
        logoImg.style.transform = 'translate(-50%, -50%) scale(0) rotate(1440deg)';
    }, 1500);

    setTimeout(() => {
        document.getElementById('broken-overlay').style.display = 'flex';
        document.body.style.background = 'black';
    }, 2800);
}

console.log("%c Aaron Ishimaru | Systems Check: Nominal ", "color: white; background: #0071e3; font-weight: bold; padding: 10px; border-radius: 4px;");