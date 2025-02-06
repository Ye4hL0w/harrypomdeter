document.addEventListener('DOMContentLoaded', function() {
    // Animation du texte du hero
    const heroTitle = document.querySelector('.news-hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split('').map(char => 
            `<span style="display: inline-block;">${char}</span>`
        ).join('');

        const chars = heroTitle.querySelectorAll('span');
        chars.forEach((char, i) => {
            char.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.05}s`;
        });
    }

    // Animation des articles tendances
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach((item, index) => {
        item.style.animation = `slideInRight 0.5s ease forwards ${index * 0.1}s`;
    });

    // Gestion de la newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Animation de succès
                const button = this.querySelector('button');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Inscrit !';
                button.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = '';
                    this.reset();
                }, 2000);
            } else {
                // Animation d'erreur
                const input = this.querySelector('input');
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            }
        });
    }

    // Validation email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Animation au scroll pour les articles
    const animateArticles = () => {
        const articles = document.querySelectorAll('.news-card');
        articles.forEach(article => {
            const articleTop = article.getBoundingClientRect().top;
            const articleBottom = article.getBoundingClientRect().bottom;
            
            if (articleTop < window.innerHeight - 100 && articleBottom > 0) {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateArticles);
    animateArticles();

    // Effet de parallaxe pour l'image de l'article vedette
    const featuredImage = document.querySelector('.featured-article .article-image img');
    if (featuredImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            featuredImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // Animation des boutons "Lire la suite"
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = 'translateX(0)';
        });
    });

    // Easter egg
    let magicSequence = [];
    const magicWord = 'news';
    
    document.addEventListener('keypress', (e) => {
        magicSequence.push(e.key);
        magicSequence = magicSequence.slice(-4);
        
        if (magicSequence.join('') === magicWord) {
            const articles = document.querySelectorAll('.news-card');
            articles.forEach((article, index) => {
                setTimeout(() => {
                    article.style.transform = 'rotate(360deg) scale(1.1)';
                    setTimeout(() => {
                        article.style.transform = 'rotate(0deg) scale(1)';
                    }, 500);
                }, index * 100);
            });
            magicSequence = [];
        }
    });
});

// Animations personnalisées
const keyframes = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyframes;
document.head.appendChild(styleSheet); 