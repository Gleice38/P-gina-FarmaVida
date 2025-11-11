// Lightbox melhorado para imagens de produtos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar lightbox
    initLightbox();
});

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    
    // Fechar lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Fechar ao clicar fora da imagem
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }
    
    // Adicionar eventos para todas as imagens com data-lightbox
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(this.href, this.dataset.title);
        });
    });
    
    // Adicionar navegação com teclado
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
}

function openLightbox(src, title) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxCaption.innerHTML = title || '';
        
        // Prevenir scroll de fundo
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}