document.addEventListener('DOMContentLoaded', function() {
    // Animation du texte du hero avec SplitType
    const heroTitle = document.querySelector('.about-hero h1');
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

    // Animation des cartes de personnages
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.character-image img');
            const info = this.querySelector('.character-info');
            
            image.style.transform = 'scale(1.1)';
            info.style.transform = 'translateY(-10px)';
            info.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.character-image img');
            const info = this.querySelector('.character-info');
            
            image.style.transform = 'scale(1)';
            info.style.transform = 'translateY(0)';
        });
    });

    // Animation de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight - 100 && itemBottom > 0) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    };

    window.addEventListener('scroll', animateTimeline);
    animateTimeline();

    // Parallax effect pour les images
    const storyImage = document.querySelector('.story-section img');
    if (storyImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.05;
            storyImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Animation des traits de caractère
    const traits = document.querySelectorAll('.character-traits li');
    traits.forEach((trait, index) => {
        trait.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.2}s`;
    });

    // Easter egg magique sur les cartes de personnages
    characterCards.forEach(card => {
        let clickCount = 0;
        let clickTimer;

        card.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 3) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-magic';
                icon.style.position = 'absolute';
                icon.style.top = '50%';
                icon.style.left = '50%';
                icon.style.transform = 'translate(-50%, -50%)';
                icon.style.fontSize = '3rem';
                icon.style.color = '#fff';
                icon.style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
                icon.style.animation = 'magicPoof 1s ease-out forwards';
                
                this.appendChild(icon);
                
                setTimeout(() => {
                    icon.remove();
                }, 1000);
                
                clickCount = 0;
            }
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        });
    });
});

// Animations personnalisées
const keyframes = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes magicPoof {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyframes;
document.head.appendChild(styleSheet); 