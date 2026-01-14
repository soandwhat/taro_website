// ========================================
// Mobile Version - Таро у Тапочках
// ========================================

// Configuration - ВАЖЛИВО: Замініть на реальні дані!
const CONFIG = {
    telegram: '@your_username',
    whatsapp: '380XXXXXXXXX',
    viber: '380XXXXXXXXX',
    email: 'your.email@example.com'
};

// ========================================
// Messenger Links Setup
// ========================================

function setupMessengerLinks() {
    // Telegram
    const telegramLinks = document.querySelectorAll(
        '#telegramQuick, #telegramBar'
    );
    telegramLinks.forEach(link => {
        link.href = `https://t.me/${CONFIG.telegram.replace('@', '')}`;
    });

    // WhatsApp
    const whatsappLinks = document.querySelectorAll(
        '#whatsappQuick, #whatsappBar'
    );
    whatsappLinks.forEach(link => {
        const message = encodeURIComponent('Вітаю! Хочу замовити розклад таро.');
        link.href = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
    });

    // Viber
    const viberLinks = document.querySelectorAll(
        '#viberQuick, #viberBar'
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
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Відправка...';
        submitButton.disabled = true;

        try {
            await sendFormData(formData);

            successMessage.classList.add('show');
            form.reset();

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

        } catch (error) {
            console.error('Помилка відправки форми:', error);
            alert('Виникла помилка при відправці форми. Будь ласка, зв\'яжіться зі мною через месенджери.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// ========================================
// Form Validation
// ========================================

function validateForm(data) {
    if (data.name.trim().length < 2) {
        showError('Будь ласка, введіть ваше ім\'я (мінімум 2 символи)');
        return false;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        showError('Будь ласка, введіть коректний номер телефону');
        return false;
    }

    if (!data.service) {
        showError('Будь ласка, оберіть послугу');
        return false;
    }

    return true;
}

function showError(message) {
    alert(message);
}

// ========================================
// Send Form Data
// ========================================

async function sendFormData(data) {
    // Telegram Bot Integration
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

    const message = `
🔮 Нова заявка з мобільного сайту "Таро у Тапочках"

👤 Ім'я: ${data.name}
📱 Телефон: ${data.phone}
🎯 Послуга: ${getServiceName(data.service)}
💬 Повідомлення: ${data.message || 'Немає'}

📅 Дата: ${new Date().toLocaleString('uk-UA')}
📱 Пристрій: Mobile
    `.trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
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
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offset = 20;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Hide Messenger Bar on Scroll Down
// ========================================

function setupMessengerBarBehavior() {
    let lastScrollTop = 0;
    const messengerBar = document.querySelector('.messenger-bar');
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Show/hide based on scroll direction
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    messengerBar.style.transform = 'translateY(100%)';
                } else {
                    // Scrolling up
                    messengerBar.style.transform = 'translateY(0)';
                }

                lastScrollTop = scrollTop;
                ticking = false;
            });

            ticking = true;
        }
    });

    // Add transition
    messengerBar.style.transition = 'transform 0.3s ease-in-out';
}

// ========================================
// Prevent iOS Safari Bounce on Form Focus
// ========================================

function preventBounce() {
    let isScrolling = false;

    document.addEventListener('touchstart', function() {
        isScrolling = true;
    });

    document.addEventListener('touchend', function() {
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Prevent bounce when focusing on inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!isScrolling) {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// ========================================
// Analytics
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
    document.querySelectorAll('.quick-btn, .messenger-bar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const messenger = this.classList.contains('telegram') ? 'Telegram' :
                            this.classList.contains('whatsapp') ? 'WhatsApp' :
                            this.classList.contains('viber') ? 'Viber' : 'Unknown';

            trackEvent('messenger_click', {
                messenger: messenger,
                location: this.classList.contains('quick-btn') ? 'hero' : 'sticky_bar'
            });
        });
    });

    // Track form submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function() {
        trackEvent('form_submit', {
            device: 'mobile'
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
}

// ========================================
// Detect if running in standalone mode (PWA)
// ========================================

function detectStandaloneMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone ||
                        document.referrer.includes('android-app://');

    if (isStandalone) {
        console.log('📱 Running in standalone mode (PWA)');
        document.body.classList.add('standalone-mode');
    }
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    setupMessengerLinks();
    setupContactForm();
    setupPhoneFormatting();
    setupSmoothScroll();
    setupMessengerBarBehavior();
    preventBounce();
    setupAnalytics();
    detectStandaloneMode();

    console.log('✅ Таро у Тапочках - Mobile Landing готовий!');
    console.log('⚠️ ВАЖЛИВО: Замініть конфігурацію в script.js на реальні дані!');
});

// ========================================
// Performance Monitoring
// ========================================

window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page load time: ${pageLoadTime}ms`);

        trackEvent('page_performance', {
            load_time: pageLoadTime,
            device: 'mobile'
        });
    }
});

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', function(e) {
    console.error('❌ Error:', e.error);
    trackEvent('javascript_error', {
        message: e.error?.message || 'Unknown error',
        device: 'mobile'
    });
});

// ========================================
// Orientation Change Handler
// ========================================

window.addEventListener('orientationchange', function() {
    console.log('📱 Orientation changed to:', window.orientation);

    // Optionally reload or adjust layout
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 100);
});

// ========================================
// Export for testing
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        getServiceName,
        CONFIG
    };
}
