//TO DO:
/*
refazer toggleTheme
fazer paleta dark
*/


// Logo Upload Functionality
function addLogo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleLogoUpload;
    input.click();
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const logoImg = document.getElementById('logoImage');
            logoImg.src = e.target.result;
            logoImg.alt = 'PoClick Logo';
            announceToScreenReader('Logo atualizada com sucesso');
        };
        reader.readAsDataURL(file);
    }
}

// Prototype Upload Functionality
function uploadPrototype() {
    document.getElementById('prototypeUpload').click();
}

function handlePrototypeUpload(event) {
    const files = event.target.files;
    const prototypeVisual = document.querySelector('.prototype-visual');

    if (files.length > 0) {
        // Clear existing content
        prototypeVisual.innerHTML = '<h4>Protótipos do Projeto</h4>';

        // Create carousel container
        const carousel = document.createElement('div');
        carousel.className = 'prototype-carousel';
        carousel.style.cssText = `
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                    padding: 20px 0;
                    scroll-behavior: smooth;
                `;

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgContainer = document.createElement('div');
                imgContainer.style.cssText = `
                            flex: 0 0 auto;
                            width: 200px;
                            height: 300px;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: var(--shadow);
                            transition: transform 0.3s ease;
                        `;

                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `Protótipo ${index + 1}`;
                img.style.cssText = `
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            cursor: pointer;
                        `;

                img.onclick = () => openImageModal(e.target.result, `Protótipo ${index + 1}`);
                imgContainer.onmouseover = () => imgContainer.style.transform = 'scale(1.05)';
                imgContainer.onmouseout = () => imgContainer.style.transform = 'scale(1)';

                imgContainer.appendChild(img);
                carousel.appendChild(imgContainer);
            };
            reader.readAsDataURL(file);
        });

        prototypeVisual.appendChild(carousel);
        announceToScreenReader(`${files.length} protótipos adicionados com sucesso`);
    }
}

// Image Modal for full view
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
            `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                background: none;
                border: none;
                color: white;
                font-size: 3rem;
                cursor: pointer;
                z-index: 2001;
            `;

    closeBtn.onclick = () => document.body.removeChild(modal);
    modal.onclick = () => document.body.removeChild(modal);
    img.onclick = (e) => e.stopPropagation();

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}
const navLinks = document.querySelector('.nav-links');
const links = navLinks.querySelectorAll("li");
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

links.forEach(e => {
    e.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});



// Theme Toggle
function toggleTheme() {
    const html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    toggleThemeIcon();
}

function toggleThemeIcon() {
    const icon = document.querySelector("#icon");
    if (icon.classList.contains("fa-moon")) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
}

// Form Submission
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        })
        .catch(error => {
            alert('Erro ao enviar mensagem. Tente novamente.');
            console.error('Error:', error);
        });
}


//CONSERTAR
// Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .accessibility-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Counter Animation for Statistics (if needed in the future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);

        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy Loading for Images (if needed)
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// Focus Management for Accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Print Styles (for better printing experience)
window.addEventListener('beforeprint', function () {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing');
});

// Performance Optimization: Debounce Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized Scroll Handler
const optimizedScrollHandler = debounce(function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker Registration for PWA (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Service worker would be registered here for offline functionality
        console.log('PWA capabilities available');
    });
}

// Analytics and User Interaction Tracking (placeholder)
function trackUserInteraction(action, element) {
    // This would integrate with analytics services
    console.log(`User interaction: ${action} on ${element}`);
}

// Enhanced Error Handling
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to monitoring service
});

// Accessibility Announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
    // Announce page load to screen readers
    announceToScreenReader('PoClick - Página carregada com sucesso');

    // Set focus to main content on page load
    document.querySelector('main') && document.querySelector('main').focus();

    console.log('PoClick website initialized successfully');
});