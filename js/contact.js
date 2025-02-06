document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la carte
    const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonnées de Paris

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ajout du marqueur personnalisé
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<i class="fas fa-magic"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    const marker = L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map);
    marker.bindPopup("<b>École de Magie</b><br>Harry & Dom").openPopup();

    // Animation du texte du hero
    const heroTitle = document.querySelector('.contact-hero h1');
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

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Réinitialisation des états de validation
            resetValidation();

            // Validation des champs
            let isValid = true;
            const fields = {
                name: { regex: /^[a-zA-ZÀ-ÿ\s]{2,}$/, message: 'Veuillez entrer un nom valide' },
                email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Veuillez entrer une adresse email valide' },
                subject: { regex: /.{3,}/, message: 'Le sujet doit contenir au moins 3 caractères' },
                message: { regex: /.{10,}/, message: 'Le message doit contenir au moins 10 caractères' }
            };

            Object.keys(fields).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const { regex, message } = fields[fieldName];

                if (!regex.test(field.value.trim())) {
                    showError(field, message);
                    isValid = false;
                }
            });

            if (isValid) {
                // Animation de succès
                const button = contactForm.querySelector('button');
                const originalContent = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                button.disabled = true;

                // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                    button.style.backgroundColor = '#4CAF50';

                    // Réinitialisation du formulaire après 2 secondes
                    setTimeout(() => {
                        contactForm.reset();
                        button.innerHTML = originalContent;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });

        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });

            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // Animation des info-cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
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

    // Fonctions utilitaires
    function showError(field, message) {
        field.classList.add('is-invalid');
        
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        
        field.parentNode.appendChild(feedback);
    }

    function resetValidation() {
        const invalidInputs = contactForm.querySelectorAll('.is-invalid');
        const feedbacks = contactForm.querySelectorAll('.invalid-feedback');
        
        invalidInputs.forEach(input => input.classList.remove('is-invalid'));
        feedbacks.forEach(feedback => feedback.remove());
    }

    function validateField(field) {
        const fields = {
            name: { regex: /^[a-zA-ZÀ-ÿ\s]{2,}$/, message: 'Veuillez entrer un nom valide' },
            email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Veuillez entrer une adresse email valide' },
            subject: { regex: /.{3,}/, message: 'Le sujet doit contenir au moins 3 caractères' },
            message: { regex: /.{10,}/, message: 'Le message doit contenir au moins 10 caractères' }
        };

        const { regex, message } = fields[field.id];
        const isValid = regex.test(field.value.trim());

        if (!isValid) {
            if (!field.classList.contains('is-invalid')) {
                showError(field, message);
            }
        } else {
            field.classList.remove('is-invalid');
            const feedback = field.parentNode.querySelector('.invalid-feedback');
            if (feedback) {
                feedback.remove();
            }
        }
    }

    // Easter egg
    let clickCount = 0;
    const contactSection = document.querySelector('.contact-form-section');

    contactSection.addEventListener('click', (e) => {
        clickCount++;
        
        if (clickCount === 7) {
            const sparkles = document.createElement('div');
            sparkles.className = 'magic-sparkles';
            sparkles.style.left = `${e.clientX}px`;
            sparkles.style.top = `${e.clientY}px`;
            document.body.appendChild(sparkles);

            // Animation magique
            const formInputs = document.querySelectorAll('.form-control');
            formInputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.transform = 'rotate(360deg) scale(1.1)';
                    setTimeout(() => {
                        input.style.transform = 'rotate(0deg) scale(1)';
                    }, 500);
                }, index * 100);
            });

            clickCount = 0;
            
            setTimeout(() => {
                sparkles.remove();
            }, 1000);
        }
    });
}); 