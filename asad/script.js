// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== SCROLL ANIMATIONS ==========
const animateElements = document.querySelectorAll('[data-animate]');
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            const animType = el.dataset.animate;
            el.classList.add('animate-in');
            if (animType === 'fade-right') el.classList.add('fade-right');
            if (animType === 'fade-left') el.classList.add('fade-left');
            setTimeout(() => { el.classList.add('visible'); }, parseInt(delay));
            observer.unobserve(el);
        }
    });
}, observerOptions);
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PARALLAX HERO ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg-img');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = 'scale(' + (1.05 + scrolled * 0.0002) + ') translateY(' + (scrolled * 0.3) + 'px)';
    }
});

// ========== CTA RIPPLE EFFECT ==========
document.querySelectorAll('.hero-cta, .download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size/2) + 'px;top:' + (e.clientY - rect.top - size/2) + 'px;transform:scale(0);animation:ripple 0.6s ease-out;pointer-events:none;';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(style);

console.log('Asad website loaded successfully!');
