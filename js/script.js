// Hero Video Optimierungen
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video-bg');
    
    if (heroVideo) {
        // Video Performance Optimierungen
        heroVideo.addEventListener('loadstart', function() {
            console.log('🎬 Hero Video lädt...');
        });
        
        heroVideo.addEventListener('canplay', function() {
            console.log('✅ Hero Video bereit');
            this.style.opacity = '0.7';
        });
        
        // Pausiere Video wenn Tab nicht aktiv (Performance)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(e => console.log('Video autoplay verhindert:', e));
            }
        });
        
        // Pausiere bei schwacher Verbindung
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
                heroVideo.style.display = 'none';
                console.log('📱 Langsame Verbindung - Video deaktiviert');
            }
        }
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax und Header Scroll Effekte
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    // Header Background Change
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(184, 134, 11, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // Parallax Effekt für Hero Background
    if (heroBg) {
        const parallaxSpeed = scrolled * 0.5;
        heroBg.style.transform = `translate(-10%, ${-10 + parallaxSpeed * 0.05}%) scale(${1 + scrolled * 0.0001})`;
    }
    
    // Hero Content Parallax
    if (heroContent && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / window.innerHeight) * 1.5;
        const translateY = scrolled * 0.3;
        heroContent.style.opacity = Math.max(opacity, 0);
        heroContent.style.transform = `translateY(${translateY}px)`;
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Thailand-inspirierte Scroll Animationen
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Gestaffelte Animation für Thailand-Effekt
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }, index * 100);
        }
    });
}, observerOptions);

// Farb-Wellen-Effekt beim Scrollen
function createColorWave() {
    const wave = document.createElement('div');
    wave.className = 'color-wave';
    wave.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3), rgba(255, 107, 53, 0.2), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: waveExpand 2s ease-out forwards;
    `;
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 2000);
}

// CSS für Wave-Animation hinzufügen
const waveStyle = document.createElement('style');
waveStyle.textContent = `
    @keyframes waveExpand {
        from {
            transform: scale(0) rotate(0deg);
            opacity: 0.8;
        }
        to {
            transform: scale(3) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(waveStyle);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .contact-card, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// MPM Thai Massage - Luxury Contact Form with reCAPTCHA v3
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        // Form submission with reCAPTCHA and PHP backend
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            
            // Client-side validation
            if (!name || name.length < 2) {
                showNotification('Name ist erforderlich (mindestens 2 Zeichen).', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }
            
            // Phone validation (Swiss format)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (!phone || !phoneRegex.test(phone)) {
                showNotification('Bitte geben Sie eine gültige Telefonnummer ein.', 'error');
                return;
            }
            
            if (!service) {
                showNotification('Bitte wählen Sie einen Service aus.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
            submitBtn.disabled = true;
            
            // reCAPTCHA v3 Integration
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LeEkugrAAAAAN-KmyInALIADajtjDwWlP8-wELX', {action: 'contact_form'}).then(function(token) {
                        formData.append('recaptcha_token', token);
                        submitFormData(formData, submitBtn, originalText, contactForm);
                    }).catch(function(error) {
                        console.error('reCAPTCHA Error:', error);
                        showNotification('reCAPTCHA-Fehler. Bitte versuchen Sie es erneut.', 'error');
                        resetButton(submitBtn, originalText);
                    });
                });
            } else {
                console.warn('reCAPTCHA nicht geladen, sende ohne Token');
                submitFormData(formData, submitBtn, originalText, contactForm);
            }
        });
        
        // Hilfsfunktionen für Formular-Verarbeitung
        function submitFormData(formData, submitBtn, originalText, contactForm) {
            fetch('send-email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err));
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    showNotification(data.message, 'success');
                    resetForm(contactForm);
                } else {
                    showNotification(data.message || 'Es gab einen Fehler beim Senden.', 'error');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                let errorMessage = 'Entschuldigung, es gab ein Problem beim Senden Ihrer Nachricht.';
                
                if (error.message) {
                    errorMessage = error.message;
                } else if (typeof error === 'string') {
                    errorMessage = error;
                }
                
                showNotification(errorMessage, 'error');
            })
            .finally(() => {
                resetButton(submitBtn, originalText);
            });
        }
        
        function resetButton(submitBtn, originalText) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        
        function resetForm(contactForm) {
            contactForm.reset();
            
            // Reset form visual state
            const labels = contactForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = '#666';
            });
            
            // Remove filled classes
            const inputGroups = contactForm.querySelectorAll('.input-group');
            inputGroups.forEach(group => {
                group.classList.remove('filled', 'focused');
            });
        }
        
        // Enhanced input interactions
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Spezielle Behandlung für Select-Box
                if (this.tagName.toLowerCase() === 'select') {
                    if (this.value && this.value !== '') {
                        this.parentElement.classList.add('filled');
                    } else {
                        this.parentElement.classList.remove('filled');
                    }
                } else {
                    // Normale Input-Felder
                    if (this.value && this.value.trim() !== '') {
                        this.parentElement.classList.add('filled');
                    } else {
                        this.parentElement.classList.remove('filled');
                    }
                }
            });
            
            // Change-Event für Select-Box
            if (input.tagName.toLowerCase() === 'select') {
                input.addEventListener('change', function() {
                    if (this.value && this.value !== '') {
                        this.parentElement.classList.add('filled');
                    } else {
                        this.parentElement.classList.remove('filled');
                    }
                });
            }
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                const inputGroup = this.parentElement;
                inputGroup.classList.remove('error');
                
                // Remove any existing error messages
                const existingError = inputGroup.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
            });
        });
        
        // Initial state check für bereits gefüllte Felder
        inputs.forEach(input => {
            if (input.tagName.toLowerCase() === 'select') {
                if (input.value && input.value !== '') {
                    input.parentElement.classList.add('filled');
                }
            } else {
                if (input.value && input.value.trim() !== '') {
                    input.parentElement.classList.add('filled');
                }
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'success':
            notification.style.backgroundColor = '#27ae60';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Phone Number Formatting
function formatPhoneNumber(phoneNumber) {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format Swiss phone numbers
    if (cleaned.startsWith('41')) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
    }
    
    return phoneNumber;
}

// Click to Call Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// WhatsApp Link Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp clicks (for analytics if needed)
            console.log('WhatsApp link clicked');
        });
    });
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading Animation
window.addEventListener('load', function() {
    // Hide loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Prevent default behavior for empty links
document.addEventListener('DOMContentLoaded', function() {
    const emptyLinks = document.querySelectorAll('a[href="#impressum"], a[href="#datenschutz"]');
    
    emptyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Diese Seite ist noch nicht verfügbar.', 'info');
        });
    });
});

// Scroll to Top Functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Update Copyright Year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Maus-Parallax für Thailand-Effekt
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Service Cards bewegen sich leicht mit der Maus
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const moveX = (mouseX - 0.5) * (10 + index * 2);
        const moveY = (mouseY - 0.5) * (5 + index);
        card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
    
    // Hero-Elemente reagieren auf Mausbewegung
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 20;
        heroTitle.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    }
});

// Zufällige Farb-Partikel beim Scrollen
let lastScrollTime = 0;
window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScrollTime > 500) { // Alle 500ms
        createColorWave();
        lastScrollTime = now;
    }
});

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    updateCopyrightYear();
    
    // Thailand-Begrüßung
    console.log('🇹🇭 สวัสดี! MPM Thai Massage Website loaded successfully!');
    
    // Initiale Farb-Animation
    setTimeout(createColorWave, 1000);
});