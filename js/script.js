// Funcionalidades JavaScript para a farmácia

document.addEventListener('DOMContentLoaded', function () {
    console.log('Documento carregado - FarmaVida');

    setupMobileMenu();
    setupAddToCart();
    setupSearch();
    setupNewsletter();
    setupLightbox();
    setupSmoothScroll();
    setupLoginModal();
});

/* ----------------------------- MENU MOBILE ----------------------------- */

function setupMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.classList.add('menu-toggle');

    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');

    if (!headerContainer || !nav) return;

    headerContainer.appendChild(menuToggle);

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            nav.style.display = 'block';
        }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    menuToggle.addEventListener('click', function () {
        const isHidden = nav.style.display === 'none' || nav.style.display === '';
        nav.style.display = isHidden ? 'block' : 'none';

        menuToggle.innerHTML = isHidden
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
}


/* ----------------------------- ADICIONAR AO CARRINHO ----------------------------- */

function setupAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            showNotification(`Produto adicionado ao carrinho!\n${productName}\n${productPrice}`);
            updateCartCounter();
        });
    });
}


/* ----------------------------- BUSCA ----------------------------- */

function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const term = searchInput.value.trim();

        if (!term) {
            showNotification('Digite algo para buscar', 'error');
            return;
        }

        window.location.href = `busca.html?q=${encodeURIComponent(term)}`;
    }

    if (searchButton) searchButton.addEventListener('click', e => {
        e.preventDefault();
        performSearch();
    });

    if (searchInput) searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}


/* ----------------------------- NEWSLETTER ----------------------------- */

function setupNewsletter() {
    const form = document.querySelector('.newsletter-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            showNotification('E-mail cadastrado com sucesso!');
            emailInput.value = '';
        } else {
            showNotification('Digite um e-mail válido', 'error');
        }
    });
}


/* ----------------------------- LIGHTBOX ----------------------------- */

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

    window.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });

    document.querySelectorAll('[data-lightbox]').forEach(img => {
        img.addEventListener('click', function (e) {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = this.href;
            caption.textContent = this.dataset.title;
        });
    });
}


/* ----------------------------- SCROLL SUAVE ----------------------------- */

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}


/* ----------------------------- NOTIFICAÇÃO ----------------------------- */

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--primary)' : 'var(--accent)',
        color: '#fff',
        padding: '15px 20px',
        borderRadius: '5px',
        zIndex: '1000',
        fontWeight: 'bold',
        whiteSpace: 'pre-line',
        animation: 'fadeOut 3s forwards'
    });

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}


/* ----------------------------- CARRINHO ----------------------------- */

function updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    if (!counter) return;

    counter.textContent = parseInt(counter.textContent) + 1;
}


/* ----------------------------- EMAIL ----------------------------- */

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ----------------------------- LOGIN MODAL ----------------------------- */

function setupLoginModal() {
    const openBtn = document.querySelector(".user-actions a[href='login.html']");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close-modal");

    if (!openBtn || !modal) return;

    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => modal.style.display = "none");

    modal.addEventListener("click", function (e) {
        if (e.target === this) modal.style.display = "none";
    });
}
