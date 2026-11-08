
// Mobilní navigace
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const themeToggle = document.querySelector('.theme-toggle');
const themeToggleLabel = themeToggle.querySelector('.theme-toggle-label');

themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    themeToggle.setAttribute('aria-pressed', String(isDarkMode));
    themeToggleLabel.textContent = isDarkMode ? 'Světlý režim' : 'Tmavý režim';
});

// Aktuální rok v patičce
document.getElementById('year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
        '.hero-content, .hero-bottom, .intro > .section-kicker, .intro-grid, ' +
        '.value-grid article, .services .section-head, .service-row, ' +
        '.pricing .section-head, .price-table, .price-note, .booking-copy, ' +
        '.booking-form, .quote-inner, .footer > *'
    );
    const groupIndexes = new Map();
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    revealTargets.forEach(target => {
        const groupIndex = groupIndexes.get(target.parentElement) || 0;
        groupIndexes.set(target.parentElement, groupIndex + 1);
        target.style.setProperty(
            '--reveal-delay',
            `${Math.min(groupIndex * 90, 270)}ms`
        );
        target.classList.add('scroll-reveal');
        revealObserver.observe(target);
    });
}

const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const fields = [
        ['Jméno', data.get('name')],
        ['E-mail', data.get('email')],
        ['Značka vozidla', data.get('make')],
        ['Model vozidla', data.get('model')],
        ['Rok výroby', data.get('year')],
        ['Motor', data.get('engine')],
        ['Zpráva', data.get('message')]
    ];

    const body = fields
        .map(([label, value]) => `${label}: ${value || 'Neuvedeno'}`)
        .join('\n');
    const subject = encodeURIComponent(
        `Zpráva z webu JBAutoservis – ${data.get('name')}`
    );

    feedback.textContent = 'Otevírám váš e-mailový program s připravenou zprávou…';
    window.location.href =
        `mailto:jbautoservis10@seznam.cz?subject=${subject}&body=${encodeURIComponent(body)}`;
});
