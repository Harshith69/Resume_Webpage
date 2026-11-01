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
let latestScroll = 0, parallaxTicking = false;

function applyParallax() {
    const y = latestScroll;
    if (y < window.innerHeight) {
        if (heroPhotoLayer) heroPhotoLayer.style.transform = `translateY(${y * 0.15}px) scale(${1 + y * 0.0003})`;
        if (heroName) heroName.style.transform = `translateY(${y * -0.1}px)`;
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
const tiltEls = document.querySelectorAll('.project-card, .edu-card, .stat, .skill-group, [data-tilt]');
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
document.querySelectorAll('.project-card, .edu-card, .stat, .skill-pills span, .btn-hire, .contact-socials a').forEach(el => {
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
        const photo = document.getElementById('heroPhoto');
        if (photo) photo.style.transform = `translate(${cx * 14}px, ${cy * 10}px)`;
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


// =========================================================
// Cinematic intro + continuous ambient soundscape + UI sounds
// =========================================================
(() => {
  const curtain = document.getElementById('introCurtain');
  const soundButton = document.getElementById('soundToggle');
  const soundLabel = soundButton?.querySelector('.sound-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (curtain) {
    if (reducedMotion || sessionStorage.getItem('portfolioIntroSeen')) {
      curtain.classList.add('is-gone');
    } else {
      window.addEventListener('load', () => {
        window.setTimeout(() => {
          curtain.classList.add('is-gone');
          sessionStorage.setItem('portfolioIntroSeen', '1');
        }, 1450);
      }, { once: true });
    }
  }

  let audioContext = null;
  let soundEnabled = false;
  let masterGain = null;
  let ambientNodes = [];

  function getAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) {
      audioContext = new AudioCtx();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.72;
      masterGain.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') audioContext.resume();
    return audioContext;
  }

  // Original, softly layered ambient tones; no external audio files or copyrighted music.
  function startAmbient() {
    const ctx = getAudio();
    if (!ctx || ambientNodes.length) return;

    const pad = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.65;
    pad.gain.setValueAtTime(0.0001, ctx.currentTime);
    pad.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2.2);
    filter.connect(pad);
    pad.connect(masterGain);

    // A warm, slowly shifting A-minor-inspired pad.
    [110, 164.81, 220, 329.63].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();
      osc.type = index === 3 ? 'sine' : 'triangle';
      osc.frequency.value = frequency;
      osc.detune.value = index % 2 === 0 ? -4 : 4;
      voiceGain.gain.value = index === 0 ? 0.24 : index === 3 ? 0.12 : 0.18;
      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();
      ambientNodes.push(osc, voiceGain);
    });

    // Very slow filter movement gives the background a subtle living texture.
    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.075;
    lfoDepth.gain.value = 150;
    lfo.connect(lfoDepth);
    lfoDepth.connect(filter.frequency);
    lfo.start();
    ambientNodes.push(lfo, lfoDepth, filter, pad);
  }

  function stopAmbient() {
    if (!audioContext || !ambientNodes.length) return;
    const pad = ambientNodes[ambientNodes.length - 1];
    const ctx = audioContext;
    if (pad?.gain) {
      pad.gain.cancelScheduledValues(ctx.currentTime);
      pad.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.35);
    }
    const nodes = ambientNodes.slice();
    ambientNodes = [];
    window.setTimeout(() => {
      nodes.forEach(node => {
        try { if (typeof node.stop === 'function') node.stop(); } catch (_) {}
        try { node.disconnect(); } catch (_) {}
      });
    }, 1500);
  }

  function tone(frequency, duration = .055, type = 'sine', volume = .16) {
    if (!soundEnabled) return;
    const ctx = getAudio();
    if (!ctx || !masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + duration + .015);
  }

  soundButton?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
    soundButton.setAttribute('aria-label', soundEnabled ? 'Turn ambient sound off' : 'Turn ambient sound on');
    if (soundLabel) soundLabel.textContent = soundEnabled ? 'AMBIENCE ON' : 'SOUND OFF';

    if (soundEnabled) {
      getAudio();
      startAmbient();
      tone(523.25, .11, 'sine', .12);
      window.setTimeout(() => tone(783.99, .14, 'sine', .09), 75);
    } else {
      stopAmbient();
    }
  });

  document.querySelectorAll('a,button,.project-card').forEach(el => {
    el.addEventListener('pointerenter', () => tone(880, .025, 'sine', .055), { passive: true });
    el.addEventListener('click', () => tone(440, .045, 'triangle', .12), { passive: true });
  });

  // Pause the ambient layer when the tab is hidden; resume when it is visible.
  document.addEventListener('visibilitychange', () => {
    if (!audioContext) return;
    if (document.hidden && audioContext.state === 'running') audioContext.suspend();
    else if (!document.hidden && soundEnabled && audioContext.state === 'suspended') audioContext.resume();
  });
})();
