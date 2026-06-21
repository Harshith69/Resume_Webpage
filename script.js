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
