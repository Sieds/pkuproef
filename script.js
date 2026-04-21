// Detecteer taal op basis van URL
function getCurrentLanguage() {
    const path = window.location.pathname;
    return path.includes('/en/') ? 'en' : 'nl';
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        }
    });
});

function togglePKUText() {
    const container = document.getElementById('pku-text-container');
    const extraText = document.getElementById('pku-text-extra');
    const button = document.getElementById('toggle-pku-text');
    const buttonText = button.querySelector('.toggle-text');
    const chevronUse = button.querySelector('use');
    const currentLanguage = getCurrentLanguage();

    if (container.classList.contains('pku-text-collapsed')) {
        // Expand
        extraText.style.display = 'block';
        container.classList.remove('pku-text-collapsed');
        container.classList.add('pku-text-expanded');

        if (currentLanguage === 'nl') {
            buttonText.textContent = 'Lees minder';
        } else {
            buttonText.textContent = 'Read less';
        }
        chevronUse.setAttribute('href', '#chevron-up');
    } else {
        // Collapse
        extraText.style.display = 'none';
        container.classList.remove('pku-text-expanded');
        container.classList.add('pku-text-collapsed');

        if (currentLanguage === 'nl') {
            buttonText.textContent = 'Lees meer';
        } else {
            buttonText.textContent = 'Read more';
        }
        chevronUse.setAttribute('href', '#chevron-down');
    }
}
