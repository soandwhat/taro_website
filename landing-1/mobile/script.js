// ========================================
// ТАРО У ТАПОЧКАХ - Mobile Version JS
// ========================================

// Configuration
const CONFIG = {
    telegram: 'taroutapockah',
    whatsapp: '380633895103',
    viber: '380633895103',
    email: 'your.email@example.com'
};

// ========================================
// Swiper (Reviews Slider) Initialization
// ========================================
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.reviewsSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.2,
                    spaceBetween: 24,
                }
            }
        });
    }
}

// ========================================
// Messenger Links Setup
// ========================================
function setupMessengerLinks() {
    // Telegram
    const telegramLinks = document.querySelectorAll('#telegramContact');
    telegramLinks.forEach(link => {
        link.href = `https://t.me/${CONFIG.telegram}`;
    });

    // WhatsApp
    const whatsappLinks = document.querySelectorAll('#whatsappContact');
    whatsappLinks.forEach(link => {
        const message = encodeURIComponent('Вітаю! Хочу замовити розклад таро.');
        link.href = `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
    });

    // Viber
    const viberLinks = document.querySelectorAll('#viberContact');
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
        submitButton.innerHTML = 'Відправка...';
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
    // Создаем FormData для отправки на PHP
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('service', data.service);
    formData.append('message', data.message || '');
    formData.append('landing', 'Landing 1 (Mobile)');

    const response = await fetch('../desktop/send-form.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.error) {
        throw new Error(result.error);
    }

    if (!result.success) {
        throw new Error('Помилка відправки форми');
    }

    return result;
}

// ========================================
// Helper Functions
// ========================================
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 16px;
        right: 16px;
        background: ${type === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideDown 0.3s ease;
        font-weight: 600;
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
                const headerHeight = 64; // mobile header height
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
    document.querySelectorAll('.messenger-btn, .tiktok-link').forEach(btn => {
        btn.addEventListener('click', function() {
            const messenger = this.classList.contains('telegram') ? 'Telegram' :
                            this.classList.contains('whatsapp') ? 'WhatsApp' :
                            this.classList.contains('viber') ? 'Viber' : 'TikTok';

            trackEvent('messenger_click', {
                messenger: messenger,
                device: 'mobile'
            });
        });
    });

    // Track form submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function() {
        const service = document.getElementById('service').value;
        trackEvent('form_submit', {
            service: service,
            device: 'mobile'
        });
    });

    // Track service card clicks
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            trackEvent('service_interest', {
                service: serviceTitle,
                device: 'mobile'
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
                    depth: `${depth}%`,
                    device: 'mobile'
                });
            }
        });
    });
}

// ========================================
// Dynamic CSS Animations
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Initialize Everything on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔮 Таро у Тапочках (Mobile) - Ініціалізація...');

    // Initialize all features
    initSwiper();
    initFaqAccordion();
    initBackToTop();
    setupMessengerLinks();
    setupContactForm();
    setupPhoneFormatting();
    setupSmoothScroll();
    setupAnalytics();

    console.log('✅ Таро у Тапочках (Mobile) - Все готово!');
});

// ========================================
// Export for Testing
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        CONFIG
    };
}
