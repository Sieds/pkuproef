// Menu component - wordt geladen in alle paginas
function loadMenu() {
    // Detecteer huidige taal op basis van URL pad
    const path = window.location.pathname;
    const isEnglish = path.includes('/en/');
    const currentLang = isEnglish ? 'en' : 'nl';

    // Bepaal base path (relatief naar root)
    const basePath = '../';

    // Menu items per taal
    const menuItems = {
        nl: {
            home: 'Home',
            whatIsPku: 'Wat is PKU?',
            aboutCookbooks: 'Over de kookboeken',
            impression: 'Sfeerimpressie',
            order: 'Bestellen',
            videos: "Kookvideo's",
            orderPage: 'bestellen.html',
            videosPage: 'kookvideo.html'
        },
        en: {
            home: 'Home',
            whatIsPku: 'What is PKU?',
            aboutCookbooks: 'About the cookbooks',
            impression: 'Impression',
            order: 'Order',
            videos: 'Cooking videos',
            orderPage: 'order.html',
            videosPage: 'videos.html'
        }
    };

    const menu = menuItems[currentLang];

    // Bepaal huidige pagina voor taalwisselaar en active state
    const currentPage = path.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    // Map pagina's tussen talen
    function mapPageToNL(page) {
        const mapping = {
            'order.html': 'bestellen.html',
            'videos.html': 'kookvideo.html'
        };
        return mapping[page] || page;
    }

    function mapPageToEN(page) {
        const mapping = {
            'bestellen.html': 'order.html',
            'kookvideo.html': 'videos.html'
        };
        return mapping[page] || page;
    }

    const menuHTML = `
    <header>
        <nav>
            <div class="nav-container">
                <div class="nav-left">
                    <div class="logo">
                        <a href="index.html"><img src="${basePath}Images/PKU-proef.png" alt="PKU Kookboek Logo" class="logo-img"></a>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="index.html" class="${currentPage === 'index.html' && !currentHash ? 'active' : ''}">${menu.home}</a></li>
                        <li><a href="index.html#what-is-pku" class="${currentPage === 'index.html' && currentHash === '#what-is-pku' ? 'active' : ''}">${menu.whatIsPku}</a></li>
                        <li><a href="index.html#ontstaan" class="${currentPage === 'index.html' && currentHash === '#ontstaan' ? 'active' : ''}">${menu.aboutCookbooks}</a></li>
                        <li><a href="index.html#over-kookboek" class="${currentPage === 'index.html' && currentHash === '#over-kookboek' ? 'active' : ''}">${menu.impression}</a></li>
                        <li><a href="${menu.orderPage}" class="${currentPage === menu.orderPage ? 'active' : ''}">${menu.order}</a></li>
                        <li><a href="${menu.videosPage}" class="${currentPage === menu.videosPage ? 'active' : ''}">${menu.videos}</a></li>
                    </ul>
                </div>
                <div class="language-switcher">
                    <a href="${basePath}nl/${mapPageToNL(currentPage)}" class="lang-btn ${currentLang === 'nl' ? 'active' : ''}">NL</a>
                    <a href="${basePath}en/${mapPageToEN(currentPage)}" class="lang-btn ${currentLang === 'en' ? 'active' : ''}">EN</a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
}

// Laad menu zodra de DOM ready is
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMenu);
} else {
    loadMenu();
}
