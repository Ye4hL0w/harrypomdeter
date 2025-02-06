document.addEventListener('DOMContentLoaded', function() {
    // Configuration de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'positionFromTop': 100
    });

    // Système de filtrage
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filtrage des éléments
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
        });
    });

    // Animation au survol des images
    galleryItems.forEach(item => {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');

        item.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });

        item.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });

    // Masonry Layout (optionnel si vous voulez un layout plus dynamique)
    const masonryLayout = () => {
        const grid = document.querySelector('.gallery-grid .row');
        const items = document.querySelectorAll('.gallery-item');
        const gap = 16; // Espacement entre les éléments

        let columns = 3;
        const containerWidth = grid.offsetWidth;

        if (window.innerWidth <= 768) {
            columns = 2;
        }
        if (window.innerWidth <= 576) {
            columns = 1;
        }

        const columnWidth = (containerWidth - (columns - 1) * gap) / columns;

        items.forEach((item, index) => {
            const column = index % columns;
            const row = Math.floor(index / columns);

            item.style.width = `${columnWidth}px`;
            item.style.position = 'absolute';
            item.style.left = `${column * (columnWidth + gap)}px`;
            item.style.top = `${row * (columnWidth + gap)}px`;
        });

        grid.style.height = `${Math.ceil(items.length / columns) * (columnWidth + gap)}px`;
    };

    // Appliquer le layout Masonry
    window.addEventListener('load', masonryLayout);
    window.addEventListener('resize', masonryLayout);

    // Animation de chargement des images
    const loadImages = () => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    };

    // Démarrer l'animation après le chargement de la page
    window.addEventListener('load', loadImages);

    // Easter egg magique
    let clickCount = 0;
    const galleryGrid = document.querySelector('.gallery-grid');

    galleryGrid.addEventListener('click', (e) => {
        clickCount++;
        
        if (clickCount === 7) { // Nombre magique !
            const magicSparkle = document.createElement('div');
            magicSparkle.className = 'magic-sparkle';
            magicSparkle.style.left = `${e.clientX}px`;
            magicSparkle.style.top = `${e.clientY}px`;
            document.body.appendChild(magicSparkle);

            // Animation magique
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'rotate(360deg) scale(1.1)';
                    setTimeout(() => {
                        item.style.transform = 'rotate(0deg) scale(1)';
                    }, 1000);
                }, index * 100);
            });

            clickCount = 0;
        }
    });
}); 