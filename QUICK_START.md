# 🔮 Таро у Тапочках - Швидкий старт

## ✅ Що вже готово

### Landing 1 - "Домашній затишок" (ПОВНІСТЮ ГОТОВИЙ)

**Desktop версія:** `landing-1/desktop/`
- ✅ index.html - Повна HTML структура
- ✅ style.css - Пастельний дизайн з затишними кольорами
- ✅ script.js - Форма, месенджери, аналітика

**Mobile версія:** `landing-1/mobile/`
- ✅ index.html - Адаптована для телефонів
- ✅ style.css - Mobile-first дизайн
- ✅ script.js - Touch-оптимізація

### Функціонал

- ✅ Форма зв'язку з валідацією
- ✅ Кнопки Telegram, WhatsApp, Viber
- ✅ 6 послуг з цінами
- ✅ Адаптивний дизайн
- ✅ Анімації та плавна прокрутка
- ✅ Sticky messenger bar (mobile)
- ✅ Аналітика (Google Analytics, Facebook Pixel готові)

---

## ⚡ Швидкий запуск (3 кроки)

### Крок 1: Налаштуйте контакти (2 хвилини)

Відкрийте обидва файли:
- `landing-1/desktop/script.js`
- `landing-1/mobile/script.js`

Знайдіть рядок 8-13 та замініть:

```javascript
const CONFIG = {
    telegram: '@taro_u_tapochkah',     // ВАШ Telegram
    whatsapp: '380XXXXXXXXX',          // ВАШ WhatsApp
    viber: '380XXXXXXXXX',             // ВАШ Viber
};
```

### Крок 2: Налаштуйте форму (5 хвилин)

**Найпростіший спосіб - Telegram Bot:**

1. Відкрийте [@BotFather](https://t.me/BotFather) в Telegram
2. Напишіть `/newbot`
3. Дайте ім'я боту: "Таро у Тапочках Форма"
4. Дайте username: `taro_tapochkah_form_bot`
5. Скопіюйте TOKEN (наприклад: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

6. Відкрийте [@userinfobot](https://t.me/userinfobot)
7. Натисніть `/start`
8. Скопіюйте ваш ID (наприклад: `123456789`)

9. У `script.js` (рядок 106-107) замініть:

```javascript
const TELEGRAM_BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz';
const TELEGRAM_CHAT_ID = '123456789';
```

### Крок 3: Запустіть і перевірте

**Відкрийте файл у браузері:**
```
landing-1/desktop/index.html
```

**Перевірте:**
- ✅ Кнопки Telegram/WhatsApp/Viber відкриваються
- ✅ Форма відправляється (має прийти повідомлення в Telegram)
- ✅ Все виглядає гарно

---

## 🚀 Розміщення на хостингу (10 хвилин)

### Варіант 1: Netlify (Найпростіше)

1. Зайдіть на [netlify.com](https://www.netlify.com/)
2. Зареєструйтеся (можна через GitHub)
3. Перетягніть папку `landing-1/desktop` у вікно браузера
4. Готово! Отримаєте посилання типу `yoursite.netlify.app`

**Для мобільної версії:**
- Повторіть те саме з папкою `landing-1/mobile`
- Або налаштуйте редірект з мобільних пристроїв

### Варіант 2: GitHub Pages (Безкоштовно назавжди)

```bash
# У терміналі в папці проекту:
git init
git add .
git commit -m "Перший лендінг готовий"

# Створіть новий репозиторій на GitHub
# Завантажте код:
git remote add origin https://github.com/ВАШ_USERNAME/taro-landings.git
git branch -M main
git push -u origin main

# Увімкніть GitHub Pages в налаштуваннях репозиторію
# Settings → Pages → Source: main branch
```

Сайт буде за адресою: `https://ВАШ_USERNAME.github.io/taro-landings/landing-1/desktop/`

---

## 📊 Налаштування реклами

### Facebook Ads

1. У `index.html` перед `</head>` додайте ваш Facebook Pixel
2. Використайте посилання на ваш хостинг у рекламі
3. Почніть з бюджету 100-200 грн/день для тесту

### TikTok Ads

1. Додайте TikTok Pixel (код в README.md)
2. Створіть рекламну кампанію
3. Використайте відео з вашого TikTok каналу

### Instagram Ads

Використовуйте той самий Facebook Pixel (Instagram = Facebook).

---

## 🎨 Додайте зображення

### Що потрібно:

1. **hero-bg.jpg** (1920x1080) - Фон головної секції
   - Ідея: Картки таро, свічки, затишний стіл

2. **profile.jpg** (400x400) - Ваше фото
   - Професійне фото в домашній атмосфері

### Де взяти:

- Зробіть власні фото
- Або використайте безкоштовні з:
  - [Unsplash.com](https://unsplash.com/s/photos/tarot)
  - [Pixabay.com](https://pixabay.com/images/search/tarot/)

### Як додати:

1. Оптимізуйте на [TinyPNG.com](https://tinypng.com/)
2. Покладіть у папку `assets/images/`
3. Оновіть CSS (інструкція в README.md)

---

## 🎯 A/B Тестування (Коли будете готові)

**Landing 1** - Домашній затишок (пастельні кольори) ✅ ГОТОВИЙ

**Landing 2** - Містичний професіонал (темні кольори, фіолетові акценти)

**Landing 3** - Сучасний мінімалізм (чисті лінії, контрастні кольори)

**Як тестувати:**
1. Створіть 3 різні рекламні оголошення
2. Кожне веде на свій варіант лендінгу
3. Через тиждень подивіться статистику
4. Використовуйте той, що має найкращу конверсію

---

## 📋 Чеклист перед запуском

- [ ] Контакти замінені (Telegram, WhatsApp, Viber)
- [ ] Telegram Bot налаштований
- [ ] Форма працює (відправили тестову заявку)
- [ ] Зображення додані
- [ ] Тексти перевірені
- [ ] Протестовано на телефоні
- [ ] Розміщено на хостингу
- [ ] HTTPS працює
- [ ] Facebook Pixel доданий
- [ ] Реклама готова до запуску

---

## 🆘 Допомога

### Форма не відправляється?

1. Console (F12) → подивіться помилки
2. Перевірте TOKEN та CHAT_ID
3. Спробуйте відправити вручну через [API Telegram](https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=test)

### Кнопки месенджерів не працюють?

Перевірте, що замінили дані в CONFIG (рядок 8-13 у script.js).

### Сайт повільно завантажується?

1. Оптимізуйте зображення на [TinyPNG](https://tinypng.com/)
2. Перевірте на [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 📁 Структура проекту

```
first_desktop_website/
├── claude.md              # Документація проекту
├── README.md              # Повна інструкція
├── QUICK_START.md         # Цей файл (швидкий старт)
│
├── landing-1/             # ✅ ГОТОВИЙ
│   ├── desktop/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── mobile/
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── landing-2/             # ⏳ Очікує створення
│   └── (порожньо)
│
├── landing-3/             # ⏳ Очікує створення
│   └── (порожньо)
│
└── assets/                # Зображення, іконки, шрифти
    ├── images/
    ├── icons/
    └── fonts/
```

---

## 🎉 Готово!

Ваш перший лендінг **повністю готовий** до використання!

**Що далі:**

1. Налаштуйте контакти (5 хв)
2. Налаштуйте Telegram Bot (5 хв)
3. Розмістіть на хостингу (10 хв)
4. Запустіть рекламу
5. **Чекайте перші заявки!** 🔮✨

---

**Успіхів з просуванням "Таро у Тапочках"!**

*Якщо потрібна допомога зі створенням Landing 2 та Landing 3, просто попросіть!*
