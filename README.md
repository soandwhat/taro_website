# Таро у Тапочках - Інструкція по використанню

## Статус проекту

✅ **Landing 1** (Домашній затишок) - **ГОТОВИЙ**
- Desktop версія: `landing-1/desktop/`
- Mobile версія: `landing-1/mobile/`

⏳ **Landing 2** - В очікуванні
⏳ **Landing 3** - В очікуванні

---

## Швидкий старт

### 1. Налаштування конфігурації

**ВАЖЛИВО:** Перш ніж запускати лендінг, потрібно замінити контактні дані у файлах JavaScript.

#### Відкрийте файли:
- `landing-1/desktop/script.js`
- `landing-1/mobile/script.js`

#### Знайдіть розділ `CONFIG` та замініть дані:

```javascript
const CONFIG = {
    // Ваш Telegram username (наприклад: @taro_u_tapochkah)
    telegram: '@your_username',

    // Ваш WhatsApp номер (без + та пробілів)
    whatsapp: '380XXXXXXXXX',

    // Ваш Viber номер (без + та пробілів)
    viber: '380XXXXXXXXX',

    // Email (опціонально)
    email: 'your.email@example.com'
};
```

### 2. Налаштування відправки форми

У файлі `script.js` знайдіть функцію `sendFormData()` та виберіть один з варіантів:

#### Варіант 1: Telegram Bot (Рекомендовано)

1. Створіть бота через [@BotFather](https://t.me/BotFather)
2. Отримайте токен бота
3. Отримайте ваш Chat ID через [@userinfobot](https://t.me/userinfobot)
4. Замініть у коді:

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

#### Варіант 2: Email (EmailJS)

1. Зареєструйтеся на [EmailJS.com](https://www.emailjs.com/)
2. Налаштуйте email сервіс
3. Розкоментуйте відповідний код у `sendFormData()`

#### Варіант 3: FormSubmit

1. Використайте [FormSubmit.co](https://formsubmit.co/)
2. Просто вкажіть ваш email
3. Розкоментуйте відповідний код

---

## Як запустити локально

### Метод 1: Просто відкрити файл

1. Відкрийте файл `landing-1/desktop/index.html` у браузері
2. Або `landing-1/mobile/index.html` для перегляду мобільної версії

### Метод 2: Використовуючи локальний сервер

#### Якщо є Python:
```bash
# Python 3
cd landing-1/desktop
python -m http.server 8000
```

Відкрийте http://localhost:8000

#### Якщо є Node.js:
```bash
npx http-server landing-1/desktop -p 8000
```

#### Якщо є VS Code:
Встановіть розширення "Live Server" та запустіть через контекстне меню.

---

## Розміщення на хостингу

### Рекомендовані безкоштовні хостинги:

#### 1. **Netlify** (Рекомендовано)

1. Зареєструйтеся на [Netlify.com](https://www.netlify.com/)
2. Перетягніть папку `landing-1/desktop` у вікно браузера
3. Отримайте посилання типу `yoursite.netlify.app`
4. Повторіть для mobile версії

**Переваги:** Безкоштовно, швидко, HTTPS, CDN

#### 2. **GitHub Pages**

```bash
# Ініціалізуйте git репозиторій
git init
git add .
git commit -m "Initial commit"

# Створіть репозиторій на GitHub
# Завантажте код
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Увімкніть GitHub Pages в налаштуваннях репозиторію
```

Сайт буде доступний за адресою: `https://username.github.io/repo/`

#### 3. **Vercel**

1. Зареєструйтеся на [Vercel.com](https://vercel.com/)
2. Підключіть GitHub репозиторій або завантажте файли
3. Деплой відбудеться автоматично

---

## Додавання зображень

### 1. Підготуйте зображення:

- **hero-bg.jpg** - Фонове зображення (1920x1080px)
- **tarot-cards.jpg** - Фото карт таро (800x600px)
- **profile.jpg** - Ваше фото (400x400px)

### 2. Оптимізуйте зображення:

Використайте один з сервісів:
- [TinyPNG.com](https://tinypng.com/) - стиснення
- [Squoosh.app](https://squoosh.app/) - конвертація в WebP

### 3. Розмістіть файли:

```
assets/
  images/
    hero-bg.jpg
    tarot-cards.jpg
    profile.jpg
```

### 4. Оновіть CSS:

У файлі `style.css` замініть background на:

```css
.hero {
    background-image: url('../../assets/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
}
```

---

## Налаштування реклами

### Facebook Ads

1. У `index.html` додайте Facebook Pixel перед `</head>`:

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### TikTok Pixel

```html
<!-- TikTok Pixel Code -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('YOUR_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>
```

---

## Тестування перед запуском

### Чеклист перевірки:

- [ ] Всі контактні дані замінені (Telegram, WhatsApp, Viber)
- [ ] Налаштована відправка форми (Telegram Bot / Email)
- [ ] Форма працює (перевірте відправку тестової заявки)
- [ ] Всі кнопки месенджерів працюють
- [ ] Зображення додані та оптимізовані
- [ ] Тексти перевірені на помилки
- [ ] Сайт протестований на мобільному
- [ ] Швидкість завантаження < 3 секунди
- [ ] HTTPS працює (важливо для реклами Facebook)

### Інструменти для тестування:

1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
3. **GTmetrix**: https://gtmetrix.com/

---

## Створення варіантів для A/B тестування

### Landing 2 та Landing 3

Після того, як Landing 1 буде готовий і протестований, можна створити варіанти 2 та 3:

1. Скопіюйте папку `landing-1` в `landing-2` та `landing-3`
2. Змініть:
   - Кольорову схему в CSS
   - Заголовки та тексти
   - Розташування елементів
   - CTA кнопки (текст та стиль)

**Що тестувати:**
- Різні заголовки (емоційний vs раціональний)
- Різні кольори (пастельні vs темні)
- Різні CTA ("Замовити розклад" vs "Дізнатися майбутнє")
- Розташування форми (зверху vs знизу)

---

## Часті питання (FAQ)

### Як змінити ціни на послуги?

Відредагуйте файл `index.html` в секції `.services`:

```html
<p class="service-price">НОВА_ЦІНА грн</p>
```

Також оновіть ціни у формі в `<select id="service">`.

### Як додати нову послугу?

1. Скопіюйте блок `.service-card` в `index.html`
2. Змініть назву, опис та ціну
3. Додайте опцію в `<select id="service">`
4. Оновіть функцію `getServiceName()` у `script.js`

### Як змінити кольорову схему?

У файлі `style.css` змініть змінні в `:root`:

```css
:root {
    --primary-color: #НОВИЙ_КОЛІР;
    --accent-color: #НОВИЙ_КОЛІР;
    --warm-beige: #НОВИЙ_КОЛІР;
}
```

### Чому форма не відправляється?

1. Перевірте, чи замінили `TELEGRAM_BOT_TOKEN` та `TELEGRAM_CHAT_ID`
2. Відкрийте Console в браузері (F12) та подивіться на помилки
3. Перевірте, чи працює інтернет
4. Спробуйте відправити тестове повідомлення напряму через API Telegram

---

## Підтримка та питання

Якщо виникли питання або проблеми:

1. Перевірте Console (F12) на наявність помилок
2. Переконайтеся, що всі файли на місці
3. Перевірте, що всі дані в CONFIG замінені

---

## Наступні кроки

1. ✅ Налаштуйте контактні дані
2. ✅ Налаштуйте відправку форми
3. ✅ Додайте зображення
4. ✅ Протестуйте локально
5. ✅ Розмістіть на хостингу
6. ✅ Налаштуйте пікселі для реклами
7. ✅ Запустіть рекламу
8. ⏳ Створіть Landing 2 та Landing 3
9. ⏳ Проведіть A/B тестування
10. ⏳ Оптимізуйте на основі результатів

---

**Успіхів з просуванням "Таро у Тапочках"!** 🔮✨
