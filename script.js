// ===================================
// Scroll Progress
// ===================================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = (window.scrollY / h * 100) + '%';
});

// ===================================
// Cursor Follower
// ===================================
const dot = document.getElementById('cursorDot');
if (window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .project-row').forEach(el => {
        el.addEventListener('mouseenter', () => dot.style.transform = 'translate(-50%,-50%) scale(3)');
        el.addEventListener('mouseleave', () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
    });
}

// ===================================
// Navigation
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(s => {
        if (window.pageYOffset >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href').substring(1) === current);
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
navLinks.forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ===================================
// Scroll Animations (IntersectionObserver)
// ===================================
const animEls = document.querySelectorAll('[data-anim]');
const animObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
animEls.forEach(el => animObs.observe(el));

// ===================================
// Stat Counter Animation
// ===================================
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateNum(el) {
    const target = +el.dataset.target;
    const dur = 2000;
    const inc = target / (dur / 16);
    let cur = 0;
    const tick = () => {
        cur += inc;
        if (cur < target) { el.textContent = Math.floor(cur); requestAnimationFrame(tick); }
        else el.textContent = target;
    };
    tick();
}

const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !statsAnimated) {
            statNums.forEach(animateNum);
            statsAnimated = true;
        }
    });
}, { threshold: 0.3 });
const heroSection = document.querySelector('.hero');
if (heroSection) statsObs.observe(heroSection);

// ===================================
// Contact Form (AJAX via FormSubmit)
// ===================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    fetch('https://formsubmit.co/ajax/harshithnchandan@gmail.com', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
    }).then(r => {
        if (r.ok) {
            contactForm.reset();
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
        } else throw new Error();
    }).catch(() => {
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed';
        btn.disabled = false;
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
    });
});

// ===================================
// Hero Scroll Parallax  (photo + name move at different rates)
// ===================================
const heroPhotoLayer = document.querySelector('.hero-photo-layer');
const heroName = document.querySelector('.hero-name');
const heroMeta = document.querySelector('.hero-meta');
let latestScroll = 0, parallaxTicking = false;

function applyParallax() {
    const y = latestScroll;
    if (y < window.innerHeight) {
        // photo scales up & drifts down slowly; name drifts up; subtle fade
        if (heroPhotoLayer) heroPhotoLayer.style.transform = `translateY(${y * 0.18}px) scale(${1 + y * 0.0004})`;
        if (heroName) heroName.style.transform = `translate(-50%,-50%) translateY(${y * -0.12}px)`;
        if (heroMeta) heroMeta.style.opacity = Math.max(0, 1 - y / 400);
    }
    parallaxTicking = false;
}
window.addEventListener('scroll', () => {
    latestScroll = window.scrollY;
    if (!parallaxTicking) { requestAnimationFrame(applyParallax); parallaxTicking = true; }
}, { passive: true });

// ===================================
// 3D Tilt on cards & interactive blocks
// ===================================
const tiltEls = document.querySelectorAll('.project-detail, .edu-card, .stat, .skill-group, [data-tilt]');
tiltEls.forEach(el => {
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform .2s cubic-bezier(.16,1,.3,1), box-shadow .2s ease';
    el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 10}deg) translateZ(12px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ===================================
// 3D Click Pop
// ===================================
document.querySelectorAll('.project-detail, .edu-card, .stat, .skill-pills span, .btn-hire, .contact-socials a').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.remove('tilt-pop');
        void el.offsetWidth;            // reflow to restart animation
        el.classList.add('tilt-pop');
    });
});

// ===================================
// Hero photo subtle mouse-follow (depth)
// ===================================
const heroSec = document.getElementById('home');
if (heroSec && window.matchMedia('(hover:hover)').matches) {
    heroSec.addEventListener('mousemove', e => {
        if (window.scrollY > window.innerHeight) return;
        const cx = e.clientX / window.innerWidth - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        if (heroPhotoLayer) heroPhotoLayer.style.transform += '';
        const photo = document.getElementById('heroPhoto');
        if (photo) photo.style.transform = `translate(${cx * 18}px, ${cy * 12}px)`;
        if (heroName) heroName.style.transform = `translate(-50%,-50%) translate(${cx * -22}px, ${cy * -14}px)`;
    });
}

// ===================================
// Back to Top
// ===================================
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) {
            window.scrollTo({
                top: t.getBoundingClientRect().top + window.pageYOffset - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Page Load
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity .6s ease';
        document.body.style.opacity = '1';
    }, 50);
});
