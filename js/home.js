document.addEventListener('DOMContentLoaded', function() {
    // Animation du texte du hero
    const heroTitle = document.querySelector('.hero h1');
    const heroText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < heroText.length) {
            heroTitle.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);

    // Parallax effect pour le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Animation des feature cards au hover
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animation des news cards
    const newsCards = document.querySelectorAll('.news-card');
    const animateCards = () => {
        newsCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateCards);
    animateCards();

    // Compteur animé pour les statistiques (si présent)
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const count = parseInt(stat.innerText);
                const speed = target / 200;

                if (count < target) {
                    stat.innerText = Math.ceil(count + speed);
                    setTimeout(animateStats, 1);
                } else {
                    stat.innerText = target;
                }
            });
        };

        // Démarrer l'animation quand les stats sont visibles
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateStats();
                }
            });
            observer.observe(statsSection);
        }
    }

    // Gestion du preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Easter egg magique
    const magicSequence = [];
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        magicSequence.push(e.key);
        magicSequence.splice(-konami.length - 1, magicSequence.length - konami.length);
        
        if (magicSequence.join(',') === konami.join(',')) {
            document.body.style.animation = 'rainbow 5s infinite';
            const audio = new Audio('../sounds/magic.mp3');
            audio.play();
        }
    });
}); 