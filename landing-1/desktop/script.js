// ========================================
// ТАРО У ТАПОЧКАХ - Main JavaScript
// ========================================

// Configuration
const CONFIG = {
    telegram: '@your_username',
    whatsapp: '380XXXXXXXXX',
    viber: '380XXXXXXXXX',
    email: 'your.email@example.com',
    telegram_bot_token: 'YOUR_BOT_TOKEN',
    telegram_chat_id: 'YOUR_CHAT_ID'
};

// ========================================
// Particles.js Configuration
// ========================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#fd79a8', '#a29bfe', '#ffffff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#a29bfe',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ========================================
// AOS (Animate On Scroll) Initialization
// ========================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ========================================
// Swiper (Reviews Slider) Initialization
// ========================================
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.reviewsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                }
            }
        });
    }
}

// ========================================
// Animated Counter for Stats
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = +target.getAttribute('data-count');
                let currentValue = 0;

                const increment = targetValue / speed;

                const updateCounter = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                        target.textContent = Math.ceil(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue;
                    }
                };

                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Modal for Review Images
// ========================================
function initReviewModal() {
    const modal = document.getElementById('reviewModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const viewBtns = document.querySelectorAll('.view-full-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const reviewCard = btn.closest('.review-card');
            const reviewImage = reviewCard.querySelector('.review-image');
            modalImage.src = reviewImage.src;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ========================================
// Messenger Links Setup
// ========================================
function setupMessengerLinks() {
    // Telegram
    const telegramLinks = document.querySelectorAll(
        '#telegramBtn, #telegramContact, #telegramFooter'
    );
    telegramLinks.forEach(link => {
        link.href = `https://t.me/${CONFIG.telegram.replace('@', '')}`;
    });

    // WhatsApp
    const whatsappLinks = document.querySelectorAll(
        '#whatsappBtn, #whatsappContact, #whatsappFooter'
    );
    whatsappLinks.forEach(link => {
        const message = encodeURIComponent('Вітаю! Хочу замовити розклад таро.');
        link.href = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
    });

    // Viber
    const viberLinks = document.querySelectorAll(
        '#viberBtn, #viberContact, #viberFooter'
    );
    viberLinks.forEach(link => {
        link.href = `viber://chat?number=%2B${CONFIG.viber}`;
    });
}

// ========================================
// Contact Form Handling
// ========================================
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        if (!validateForm(formData)) {
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Відправка...</span>';
        submitButton.disabled = true;

        try {
            await sendFormData(formData);

            successMessage.classList.add('show');
            form.reset();

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

        } catch (error) {
            console.error('Помилка відправки форми:', error);
            alert('Виникла помилка при відправці форми. Будь ласка, зв\'яжіться зі мною через месенджери.');
        } finally {
            submitButton.innerHTML = originalButtonHTML;
            submitButton.disabled = false;
        }
    });
}

// ========================================
// Form Validation
// ========================================
function validateForm(data) {
    if (data.name.trim().length < 2) {
        showAlert('Будь ласка, введіть ваше ім\'я (мінімум 2 символи)', 'error');
        return false;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        showAlert('Будь ласка, введіть коректний номер телефону', 'error');
        return false;
    }

    if (!data.service) {
        showAlert('Будь ласка, оберіть послугу', 'error');
        return false;
    }

    return true;
}

// ========================================
// Send Form Data
// ========================================
async function sendFormData(data) {
    const message = `
🔮 Нова заявка з сайту "Таро у Тапочках"

👤 Ім'я: ${data.name}
📱 Телефон: ${data.phone}
🎯 Послуга: ${getServiceName(data.service)}
💬 Повідомлення: ${data.message || 'Немає'}

📅 Дата: ${new Date().toLocaleString('uk-UA')}
    `.trim();

    const url = `https://api.telegram.org/bot${CONFIG.telegram_bot_token}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CONFIG.telegram_chat_id,
            text: message
        })
    });

    if (!response.ok) {
        throw new Error('Помилка відправки в Telegram');
    }
}

// ========================================
// Helper Functions
// ========================================
function getServiceName(serviceValue) {
    const services = {
        'diagnosis': 'Повна діагностика - 500 грн',
        'protection': 'Захист - 1 500 грн',
        'wax': 'Чистка воском - від 3 000 грн',
        'candles': 'Віджиг свічками - від 3 000 грн',
        'lead': 'Чистка свинцем - від 13 000 грн',
        'ritual': 'Ритуали - від 2 500 грн'
    };
    return services[serviceValue] || serviceValue;
}

function showAlert(message, type = 'info') {
    // Create custom alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 3000);
}

// ========================================
// Phone Input Formatting
// ========================================
function setupPhoneFormatting() {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0 && !value.startsWith('380')) {
            if (value.startsWith('0')) {
                value = '38' + value;
            } else if (value.startsWith('80')) {
                value = '3' + value;
            }
        }

        let formatted = '+';
        if (value.length > 0) {
            formatted += value.substring(0, 3);
        }
        if (value.length > 3) {
            formatted += ' ' + value.substring(3, 5);
        }
        if (value.length > 5) {
            formatted += ' ' + value.substring(5, 8);
        }
        if (value.length > 8) {
            formatted += ' ' + value.substring(8, 10);
        }
        if (value.length > 10) {
            formatted += ' ' + value.substring(10, 12);
        }

        e.target.value = formatted;
    });

    phoneInput.value = '+380 ';

    phoneInput.addEventListener('focus', function(e) {
        if (e.target.value === '') {
            e.target.value = '+380 ';
        }
    });
}

// ========================================
// Smooth Scroll
// ========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// FAQ Accordion
// ========================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Закриваємо інші елементи
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Переключаємо поточний
            item.classList.toggle('active');
        });
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// ========================================
// Analytics Tracking
// ========================================
function trackEvent(eventName, eventData = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }

    console.log('📊 Event tracked:', eventName, eventData);
}

function setupAnalytics() {
    // Track messenger clicks
    document.querySelectorAll('.social-btn, .messenger-btn, .footer-social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const messenger = this.classList.contains('telegram') ? 'Telegram' :
                            this.classList.contains('whatsapp') ? 'WhatsApp' :
                            this.classList.contains('viber') ? 'Viber' :
                            this.classList.contains('tiktok') ? 'TikTok' : 'Unknown';

            trackEvent('messenger_click', {
                messenger: messenger,
                location: this.closest('section')?.id || 'header'
            });
        });
    });

    // Track form submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function() {
        const service = document.getElementById('service').value;
        trackEvent('form_submit', {
            service: getServiceName(service)
        });
    });

    // Track service card clicks
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            trackEvent('service_interest', {
                service: serviceTitle
            });
        });
    });

    // Track scroll depth
    let scrollTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        Object.keys(scrollTracked).forEach(depth => {
            if (scrollPercent >= depth && !scrollTracked[depth]) {
                scrollTracked[depth] = true;
                trackEvent('scroll_depth', {
                    depth: `${depth}%`
                });
            }
        });
    });
}

// ========================================
// Page Load Performance
// ========================================
function trackPageLoad() {
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page load time: ${pageLoadTime}ms`);

            trackEvent('page_performance', {
                load_time: pageLoadTime
            });
        }
    });
}

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', function(e) {
    console.error('❌ Error:', e.error);
    trackEvent('javascript_error', {
        message: e.error?.message || 'Unknown error'
    });
});

// ========================================
// Dynamic CSS Animations
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Initialize Everything on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔮 Таро у Тапочках - Ініціалізація...');

    // Initialize all features
    initParticles();
    initAOS();
    initSwiper();
    animateCounters();
    initNavbar();
    initBackToTop();
    initReviewModal();
    initFaqAccordion();
    setupMessengerLinks();
    setupContactForm();
    setupPhoneFormatting();
    setupSmoothScroll();
    setupMobileMenu();
    setupAnalytics();
    trackPageLoad();

    console.log('✅ Таро у Тапочках - Все готово!');
    console.log('⚠️ ВАЖЛИВО: Не забудьте замінити CONFIG на реальні дані!');
});

// ========================================
// Service Worker for PWA (Optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('✅ Service Worker registered'))
        //     .catch(error => console.log('❌ Service Worker registration failed:', error));
    });
}

// ========================================
// Export for Testing
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        getServiceName,
        CONFIG
    };
}
