// ========================================
// ТАРО У ТАПОЧКАХ - Landing 3: Cozy Mystical
// Modern animations and interactivity
// ========================================

// Configuration
const CONFIG = {
    telegram: 'taroutapockah',
    whatsapp: '380633895103',
    viber: '380633895103'
};

// ========================================
// CARD OF THE DAY - Main Feature
// ========================================
let selectedCardIndex = null;
let cardAlreadySelected = false;

// Tarot cards data - loaded from tarot-cards.json
const TAROT_CARDS = [
    { id: 1, name: "Дурень", image: "cards/radiant_rider_waite_tarot_final_78_cards-57-page-00001-min.webp", meaning: "Початок нового шляху, свобода від обмежень. Сьогодні день для сміливих рішень та нових можливостей.", advice: "Довіртесь інтуїції та зробіть крок у невідоме. Не бійтеся ризикувати." },
    { id: 2, name: "Маг", image: "cards/radiant_rider_waite_tarot_final_78_cards-58-page-00001-min.webp", meaning: "У вас є всі ресурси для успіху. День для активних дій та прояву талантів.", advice: "Використовуйте свої навички. Все необхідне вже у вас." },
    { id: 3, name: "Верховна Жриця", image: "cards/radiant_rider_waite_tarot_final_78_cards-59-page-00001-min.webp", meaning: "День інтуїції та таємниць. Прислухайтесь до внутрішнього голосу.", advice: "Не поспішайте з рішеннями. Мудрість приходить у тиші." },
    { id: 4, name: "Імператриця", image: "cards/radiant_rider_waite_tarot_final_78_cards-60-page-00001-min.webp", meaning: "Достаток, творчість, турбота. Час для краси та гармонії.", advice: "Подбайте про себе та близьких. Створіть затишок." },
    { id: 5, name: "Імператор", image: "cards/radiant_rider_waite_tarot_final_78_cards-61-page-00001-min.webp", meaning: "Структура, порядок, лідерство. День для важливих рішень.", advice: "Візьміть контроль над ситуацією. Будьте рішучими." },
    { id: 6, name: "Ієрофант", image: "cards/radiant_rider_waite_tarot_final_78_cards-62-page-00001-min.webp", meaning: "Традиції, навчання, духовна мудрість. Час звернутись до досвіду.", advice: "Шукайте поради у мудрих людей або традиціях." },
    { id: 7, name: "Закохані", image: "cards/radiant_rider_waite_tarot_final_78_cards-63-page-00001-min.webp", meaning: "День для стосунків та важливих виборів серця. Гармонія у партнерстві.", advice: "Прислухайтесь до серця у важливих рішеннях." },
    { id: 8, name: "Колісниця", image: "cards/radiant_rider_waite_tarot_final_78_cards-64-page-00001-min.webp", meaning: "Перемога, рух вперед, контроль. День для досягнень.", advice: "Рухайтесь до мети впевнено. Успіх близько." },
    { id: 9, name: "Сила", image: "cards/radiant_rider_waite_tarot_final_78_cards-65-page-00001-min.webp", meaning: "Внутрішня сила, мужність, терпіння. Ви здатні подолати перешкоди.", advice: "Будьте терплячими але непохитними. Справжня сила — у витримці." },
    { id: 10, name: "Відлюдник", image: "cards/radiant_rider_waite_tarot_final_78_cards-66-page-00001-min.webp", meaning: "Самопізнання, усамітнення, внутрішня мудрість. Час для роздумів.", advice: "Приділіть час собі. Відповіді всередині вас." },
    { id: 11, name: "Колесо Фортуни", image: "cards/radiant_rider_waite_tarot_final_78_cards-67-page-00001-min.webp", meaning: "Зміни, доля, нові можливості. Поворотний момент.", advice: "Прийміть зміни. Доля на вашому боці." },
    { id: 12, name: "Справедливість", image: "cards/radiant_rider_waite_tarot_final_78_cards-68-page-00001-min.webp", meaning: "Баланс, правда, кармічна справедливість. Час для чесності.", advice: "Діяйте справедливо. Правда виявиться." },
    { id: 13, name: "Повішений", image: "cards/radiant_rider_waite_tarot_final_78_cards-69-page-00001-min.webp", meaning: "Пауза, нове бачення, жертва заради вищої мети. Час переосмислення.", advice: "Подивіться на ситуацію під іншим кутом. Іноді треба відпустити." },
    { id: 14, name: "Смерть", image: "cards/radiant_rider_waite_tarot_final_78_cards-70-page-00001-min.webp", meaning: "Трансформація, завершення старого, початок нового. Не бійтесь змін.", advice: "Відпустіть те, що віджило. Попереду — нове життя." },
    { id: 15, name: "Поміркованість", image: "cards/radiant_rider_waite_tarot_final_78_cards-71-page-00001-min.webp", meaning: "Баланс, гармонія, терпіння. Час для злагодженості.", advice: "Шукайте золоту середину. Поєднуйте протилежності." },
    { id: 16, name: "Диявол", image: "cards/radiant_rider_waite_tarot_final_78_cards-72-page-00001-min.webp", meaning: "Обмеження, залежності, ілюзії. Усвідомлення того, що тримає вас.", advice: "Визнайте свої слабкості. Тільки так можна звільнитись." },
    { id: 17, name: "Вежа", image: "cards/radiant_rider_waite_tarot_final_78_cards-73-page-00001-min.webp", meaning: "Раптові зміни, руйнування ілюзій, прозріння. Час правди.", advice: "Прийміть несподівані зміни. Вони звільняють місце для нового." },
    { id: 18, name: "Зірка", image: "cards/radiant_rider_waite_tarot_final_78_cards-74-page-00001-min.webp", meaning: "Надія, натхнення, мрії. Ваші бажання можуть здійснитись.", advice: "Не втрачайте надії. Мрійте сміливо." },
    { id: 19, name: "Місяць", image: "cards/radiant_rider_waite_tarot_final_78_cards-75-page-00001-min.webp", meaning: "Інтуїція, підсвідомість, ілюзії. Зверніть увагу на сни.", advice: "Довіряйте інтуїції. Не все те, чим здається." },
    { id: 20, name: "Сонце", image: "cards/radiant_rider_waite_tarot_final_78_cards-76-page-00001-min.webp", meaning: "Радість, успіх, життєва енергія. День наповнений світлом.", advice: "Дійте сміливо! Всесвіт на вашому боці." },
    { id: 21, name: "Суд", image: "cards/radiant_rider_waite_tarot_final_78_cards-77-page-00001-min.webp", meaning: "Пробудження, прощення, нові можливості. Час відродження.", advice: "Звільніться від минулого. Прийміть своє покликання." },
    { id: 22, name: "Світ", image: "cards/radiant_rider_waite_tarot_final_78_cards-78-page-00001-min.webp", meaning: "Завершення циклу, досягнення, гармонія. Повнота буття.", advice: "Святкуйте свої перемоги! Ви пройшли довгий шлях." },
    { id: 23, name: "Туз Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-14-page-00001-min.webp", meaning: "Нові починання, творча енергія, натхнення. Час для нових проектів.", advice: "Беріться за нові справи. Енергія на піку." },
    { id: 24, name: "Двійка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-1-page-00001-min.webp", meaning: "Планування, рішення, вибір напрямку. Світ у ваших руках.", advice: "Плануйте сміливо. Час робити вибір." },
    { id: 25, name: "Трійка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-2-page-00001-min.webp", meaning: "Прогрес, розширення, дальше бачення. Плани починають втілюватись.", advice: "Дивіться вперед. Можливості на горизонті." },
    { id: 26, name: "Четвірка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-3-page-00001-min.webp", meaning: "Святкування, стабільність, гармонія. Час для радості.", advice: "Насолоджуйтесь моментом. Святкуйте досягнення." },
    { id: 27, name: "П'ятірка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-4-page-00001-min.webp", meaning: "Конфлікт, конкуренція, різні думки. Боротьба ідей.", advice: "Не втягуйтесь у безглузді суперечки. Зберігайте енергію." },
    { id: 28, name: "Шістка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-5-page-00001-min.webp", meaning: "Перемога, визнання, успіх. Ваші зусилля оцінені.", advice: "Приймайте похвалу. Ви це заслужили." },
    { id: 29, name: "Сімка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-6-page-00001-min.webp", meaning: "Захист позицій, стійкість, конкуренція. Відстоюйте своє.", advice: "Будьте рішучими. Не здавайтесь." },
    { id: 30, name: "Вісімка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-7-page-00001-min.webp", meaning: "Швидкий рух, новини, швидкий прогрес. Події розвиваються стрімко.", advice: "Діяйте швидко. Час прискорюється." },
    { id: 31, name: "Дев'ятка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-8-page-00001-min.webp", meaning: "Витривалість, стійкість, остання межа. Майже у фіналі.", advice: "Не здавайтесь зараз. Трохи ще потерпіти." },
    { id: 32, name: "Десятка Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-9-page-00001-min.webp", meaning: "Тягар відповідальності, перевантаження. Забагато на плечах.", advice: "Делегуйте частину справ. Не тягніть все самі." },
    { id: 33, name: "Паж Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-10-page-00001-min.webp", meaning: "Хороші новини, ентузіазм, пропозиції. Вісник можливостей.", advice: "Будьте відкритими до нового. Цікаві пропозиції." },
    { id: 34, name: "Лицар Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-11-page-00001-min.webp", meaning: "Дії, пригоди, імпульсивність. Час для сміливих вчинків.", advice: "Діяйте рішуче, але не забувайте про план." },
    { id: 35, name: "Королева Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-12-page-00001-min.webp", meaning: "Впевненість, харизма, творча енергія. Ваша сила — у природності.", advice: "Будьте собою. Ваша енергія надихає інших." },
    { id: 36, name: "Король Жезлів", image: "cards/radiant_rider_waite_tarot_final_78_cards-13-page-00001-min.webp", meaning: "Лідерство, візія, підприємництво. Час вести за собою.", advice: "Візьміть на себе відповідальність. Ви — лідер." },
    { id: 37, name: "Туз Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-28-page-00001-min.webp", meaning: "Нова любов, емоційне наповнення, духовне пробудження.", advice: "Відкрийте серце. Любов поруч." },
    { id: 38, name: "Двійка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-15-page-00001-min.webp", meaning: "Партнерство, єдність, взаємність. Гармонія у стосунках.", advice: "Цінуйте близьких. Разом — сильніше." },
    { id: 39, name: "Трійка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-16-page-00001-min.webp", meaning: "Дружба, святкування, спільність. Радість у колі близьких.", advice: "Проведіть час із друзями. Святкуйте життя." },
    { id: 40, name: "Четвірка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-17-page-00001-min.webp", meaning: "Апатія, нові пропозиції, переоцінка. Подивіться навколо.", advice: "Не пропустіть нові можливості через байдужість." },
    { id: 41, name: "П'ятірка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-18-page-00001-min.webp", meaning: "Розчарування, втрата, смуток. Але не все втрачено.", advice: "Зверніть увагу на те, що залишилось. Є підстава для надії." },
    { id: 42, name: "Шістка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-19-page-00001-min.webp", meaning: "Ностальгія, спогади, дитяча радість. Повернення до витоків.", advice: "Згадайте про прості радощі. Зв'яжіться зі старими друзями." },
    { id: 43, name: "Сімка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-20-page-00001-min.webp", meaning: "Ілюзії, вибір, багато варіантів. Не всі пропозиції реальні.", advice: "Будьте реалістичними. Не всі мрії варто втілювати." },
    { id: 44, name: "Вісімка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-21-page-00001-min.webp", meaning: "Відхід, пошук сенсу, залишення комфорту. Час іти далі.", advice: "Не бійтесь залишити те, що не приносить щастя." },
    { id: 45, name: "Дев'ятка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-22-page-00001-min.webp", meaning: "Задоволення, виконання бажань, емоційна повнота. Щастя.", advice: "Насолоджуйтесь моментом. Ви маєте багато." },
    { id: 46, name: "Десятка Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-23-page-00001-min.webp", meaning: "Сімейне щастя, гармонія, емоційне благополуччя.", advice: "Цінуйте сім'ю та близьких. Це найважливіше." },
    { id: 47, name: "Паж Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-24-page-00001-min.webp", meaning: "Емоційні новини, творчі ідеї, інтуїтивні підказки.", advice: "Прислухайтесь до внутрішнього голосу. Цікаві ідеї." },
    { id: 48, name: "Лицар Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-25-page-00001-min.webp", meaning: "Романтика, пропозиції, чарівність. Вісник кохання.", advice: "Будьте відкритими до романтики. Почуття щирі." },
    { id: 49, name: "Королева Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-26-page-00001-min.webp", meaning: "Емпатія, інтуїція, турбота. Глибина почуттів.", advice: "Довіряйте своїм емоціям. Ваша чутливість — сила." },
    { id: 50, name: "Король Кубків", image: "cards/radiant_rider_waite_tarot_final_78_cards-27-page-00001-min.webp", meaning: "Емоційна зрілість, мудрість, контроль почуттів.", advice: "Зберігайте спокій. Керуйте емоціями, не навпаки." },
    { id: 51, name: "Туз Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-42-page-00001-min.webp", meaning: "Ясність думки, правда, прорив. Прозріння.", advice: "Думайте чітко. Правда стане очевидною." },
    { id: 52, name: "Двійка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-29-page-00001-min.webp", meaning: "Складний вибір, пауза, ігнорування проблеми.", advice: "Не можна вічно уникати рішення. Зважте всі факти." },
    { id: 53, name: "Трійка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-30-page-00001-min.webp", meaning: "Емоційний біль, зрада, розлучення. Важкий період.", advice: "Дозвольте собі пережити біль. Це теж мине." },
    { id: 54, name: "Четвірка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-31-page-00001-min.webp", meaning: "Відпочинок, відновлення, медитація. Пауза необхідна.", advice: "Візьміть перерву. Відновіть сили." },
    { id: 55, name: "П'ятірка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-32-page-00001-min.webp", meaning: "Конфлікт, поразка, порожня перемога. Гіркий присмак.", advice: "Не всі битви варто виграти. Знайте коли відступити." },
    { id: 56, name: "Шістка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-33-page-00001-min.webp", meaning: "Перехід, рух вперед, залишення проблем позаду.", advice: "Час рухатись далі. Залиште минуле позаду." },
    { id: 57, name: "Сімка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-34-page-00001-min.webp", meaning: "Обман, хитрість, стратегія. Не всі карти на столі.", advice: "Будьте обережними. Перевіряйте інформацію." },
    { id: 58, name: "Вісімка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-35-page-00001-min.webp", meaning: "Відчуття пастки, обмеження, страхи. Але вихід є.", advice: "Обмеження частіше у голові. Подивіться ширше." },
    { id: 59, name: "Дев'ятка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-36-page-00001-min.webp", meaning: "Тривога, нічні страхи, хвилювання. Важко спати.", advice: "Поговоріть про свої страхи. Вони не такі страшні." },
    { id: 60, name: "Десятка Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-37-page-00001-min.webp", meaning: "Завершення циклу, крах, але і новий початок.", advice: "Все закінчується. Це дно — тепер тільки вгору." },
    { id: 61, name: "Паж Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-38-page-00001-min.webp", meaning: "Новини, допитливість, спостережливість. Будьте пильними.", advice: "Збирайте інформацію. Знання — сила." },
    { id: 62, name: "Лицар Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-39-page-00001-min.webp", meaning: "Рішучість, прямолінійність, швидкі дії. Атака.", advice: "Діяйте швидко і рішуче, але подумайте спочатку." },
    { id: 63, name: "Королева Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-40-page-00001-min.webp", meaning: "Незалежність, ясність, прямолінійність. Розум над емоціями.", advice: "Будьте об'єктивними. Думайте тверезо." },
    { id: 64, name: "Король Мечів", image: "cards/radiant_rider_waite_tarot_final_78_cards-41-page-00001-min.webp", meaning: "Інтелект, влада, об'єктивність. Авторитет розуму.", advice: "Використовуйте логіку. Ваш розум — найкраща зброя." },
    { id: 65, name: "Туз Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-56-page-00001-min.webp", meaning: "Нові фінансові можливості, матеріальний початок, процвітання.", advice: "Нова можливість для заробітку. Скористайтесь нею." },
    { id: 66, name: "Двійка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-43-page-00001-min.webp", meaning: "Баланс, жонглювання обов'язками, адаптація.", advice: "Знайдіть баланс між справами. Будьте гнучкими." },
    { id: 67, name: "Трійка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-44-page-00001-min.webp", meaning: "Командна робота, навички, визнання майстерності.", advice: "Співпрацюйте з іншими. Разом досягнете більшого." },
    { id: 68, name: "Четвірка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-45-page-00001-min.webp", meaning: "Контроль, жадібність, стабільність. Тримаєте міцно.", advice: "Безпека важлива, але не перегинайте з контролем." },
    { id: 69, name: "П'ятірка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-46-page-00001-min.webp", meaning: "Фінансові труднощі, самотність, але допомога поруч.", advice: "Не соромтесь просити допомоги. Вона є." },
    { id: 70, name: "Шістка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-47-page-00001-min.webp", meaning: "Щедрість, справедливий обмін, допомога іншим.", advice: "Ділитесь тим, що маєте. Все повернеться." },
    { id: 71, name: "Сімка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-48-page-00001-min.webp", meaning: "Очікування результатів, терпіння, оцінка прогресу.", advice: "Дайте часу. Плоди дозрівають." },
    { id: 72, name: "Вісімка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-49-page-00001-min.webp", meaning: "Майстерність, старанність, удосконалення навичок.", advice: "Працюйте над майстерністю. Деталі важливі." },
    { id: 73, name: "Дев'ятка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-50-page-00001-min.webp", meaning: "Самодостатність, розкіш, фінансова стабільність.", advice: "Насолоджуйтесь плодами праці. Ви заслужили." },
    { id: 74, name: "Десятка Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-51-page-00001-min.webp", meaning: "Матеріальна стабільність, спадщина, сімейний достаток.", advice: "Думайте про майбутнє покоління. Створюйте спадок." },
    { id: 75, name: "Паж Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-52-page-00001-min.webp", meaning: "Нові можливості навчання, старанність, практичність.", advice: "Вчіться новому. Практичні навички важливі." },
    { id: 76, name: "Лицар Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-53-page-00001-min.webp", meaning: "Відповідальність, надійність, наполегливість у роботі.", advice: "Будьте наполегливими. Крок за кроком до мети." },
    { id: 77, name: "Королева Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-54-page-00001-min.webp", meaning: "Практичність, турбота, фінансова незалежність.", advice: "Піклуйтесь про матеріальну базу і близьких." },
    { id: 78, name: "Король Пентаклів", image: "cards/radiant_rider_waite_tarot_final_78_cards-55-page-00001-min.webp", meaning: "Достаток, бізнес-хватка, матеріальний успіх.", advice: "Будуйте імперії. Ваша практичність приносить успіх." }
];

function initCardOfDay() {
    // Check if cards are loaded
    if (!TAROT_CARDS || TAROT_CARDS.length === 0) {
        console.error('❌ Tarot cards not loaded! Cannot initialize card of the day.');
        return;
    }

    const cards = document.querySelectorAll('.spread-card');
    const spreadHint = document.getElementById('spreadHint');
    const cardResult = document.getElementById('cardResult');
    const resetBtn = document.getElementById('resetCard');

    // Reset button - must be initialized BEFORE checking saved card
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('cardOfDay');
        localStorage.removeItem('cardOfDayDate');
        location.reload();
    });

    // Check if card was already selected today
    const today = new Date().toDateString();
    const savedCard = localStorage.getItem('cardOfDay');
    const savedDate = localStorage.getItem('cardOfDayDate');

    console.log('Checking localStorage:');
    console.log('- today:', today);
    console.log('- savedCard:', savedCard ? 'exists' : 'null');
    console.log('- savedDate:', savedDate);

    // Validate saved card data
    if (savedCard) {
        try {
            const card = JSON.parse(savedCard);
            // Check if card object has all required fields
            if (!card.name || !card.image || !card.meaning || !card.advice) {
                console.warn('Invalid card data in localStorage, clearing...');
                localStorage.removeItem('cardOfDay');
                localStorage.removeItem('cardOfDayDate');
                location.reload();
                return;
            }
            // Check if image path matches name (basic validation)
            const cardIndex = TAROT_CARDS.findIndex(c => c.name === card.name);
            if (cardIndex !== -1 && TAROT_CARDS[cardIndex].image !== card.image) {
                console.warn('Card data mismatch detected, clearing...');
                localStorage.removeItem('cardOfDay');
                localStorage.removeItem('cardOfDayDate');
                location.reload();
                return;
            }
        } catch (e) {
            console.error('Error parsing saved card:', e);
            localStorage.removeItem('cardOfDay');
            localStorage.removeItem('cardOfDayDate');
            location.reload();
            return;
        }
    }

    if (savedCard && savedDate === today) {
        // Show saved card
        const card = JSON.parse(savedCard);
        showCardResult(card);
        cards.forEach(c => c.style.display = 'none');
        spreadHint.style.display = 'none';
        cardAlreadySelected = true;
        return;
    }

    // Shuffle cards for visual effect
    const shuffledIndices = shuffleArray([...Array(TAROT_CARDS.length).keys()]);
    console.log('Shuffled indices (first 10):', shuffledIndices.slice(0, 10));
    console.log('Total shuffled indices:', shuffledIndices.length);

    cards.forEach((card, index) => {
        const cardIndex = shuffledIndices[index % shuffledIndices.length];
        card.dataset.cardIndex = cardIndex;
        console.log(`Card ${index} assigned tarot index ${cardIndex}`);
    });

    cards.forEach((card, index) => {
        console.log(`Setting up click handler for card ${index}`);

        card.addEventListener('click', () => {
            console.log('Card clicked!');

            if (cardAlreadySelected) {
                console.log('Card already selected, ignoring click');
                return;
            }

            // Get random card
            const cardIndex = parseInt(card.dataset.cardIndex);
            console.log('Selected card index:', cardIndex);

            if (cardIndex < 0 || cardIndex >= TAROT_CARDS.length) {
                console.error('Invalid card index:', cardIndex);
                return;
            }

            const selectedCard = TAROT_CARDS[cardIndex];
            console.log('Selected card:', selectedCard.name);

            // Add card image to front before flip
            const cardFront = card.querySelector('.spread-card-front .card-content');
            cardFront.innerHTML = `<img src="${selectedCard.image}" alt="${selectedCard.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;

            // Animate selection
            card.classList.add('flipped');

            // Hide other cards
            cards.forEach((c, i) => {
                if (c !== card) {
                    gsap.to(c, {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: 'power2.in'
                    });
                }
            });

            // Create particles effect
            createParticles(card);

            // Show result after animation
            setTimeout(() => {
                spreadHint.style.display = 'none';
                cards.forEach(c => c.style.display = 'none');

                showCardResult(selectedCard);

                // Save to localStorage
                localStorage.setItem('cardOfDay', JSON.stringify(selectedCard));
                localStorage.setItem('cardOfDayDate', today);
                cardAlreadySelected = true;
            }, 1200);
        });

        // Hover effect
        card.addEventListener('mouseenter', () => {
            if (!cardAlreadySelected) {
                gsap.to(card, {
                    y: -15,
                    rotateZ: Math.random() * 4 - 2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!cardAlreadySelected && !card.classList.contains('flipped')) {
                gsap.to(card, {
                    y: 0,
                    rotateZ: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

function showCardResult(card) {
    const cardResult = document.getElementById('cardResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultMeaning = document.getElementById('resultMeaning');
    const resultAdvice = document.getElementById('resultAdvice');
    const resultIcon = document.querySelector('.result-icon');

    resultTitle.textContent = card.name;
    resultMeaning.textContent = card.meaning;
    resultAdvice.textContent = card.advice;

    // Update card image
    if (card.image) {
        resultIcon.innerHTML = `<img src="${card.image}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">`;
    }

    cardResult.classList.add('show');

    // Animate result appearance
    gsap.from(cardResult, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out'
    });
}

function createParticles(sourceElement) {
    const particlesContainer = document.getElementById('cardParticles');
    const rect = sourceElement.getBoundingClientRect();
    const containerRect = particlesContainer.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2 - containerRect.left;
    const centerY = rect.top + rect.height / 2 - containerRect.top;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 100;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;

        gsap.to(particle, {
            x: targetX - centerX,
            y: targetY - centerY,
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });

        gsap.set(particle, { opacity: 1, scale: 1 });
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ========================================
// CURSOR FOLLOWER
// ========================================
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    const dot = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.cursor-glow');

    if (!cursor || window.innerWidth < 768) {
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Dot follows faster
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        // Glow follows slower
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .spread-card, .service-card, .faq-question');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(glow, { scale: 1.5, opacity: 0.3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(glow, { scale: 1, opacity: 0.5, duration: 0.3 });
        });
    });
}

// ========================================
// GSAP SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Section titles reveal
    gsap.utils.toArray('.title-reveal').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Section labels
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.from(label, {
            scrollTrigger: {
                trigger: label,
                start: 'top 90%'
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Service cards stagger
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // About section
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        gsap.from(aboutImage, {
            scrollTrigger: {
                trigger: aboutImage,
                start: 'top 80%'
            },
            x: -80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 80%'
            },
            x: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Value items
    gsap.utils.toArray('.value-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            },
            x: 50,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // FAQ items
    gsap.utils.toArray('.faq-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Messenger items
    gsap.utils.toArray('.messenger-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            },
            x: -40,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Contact form
    const formCard = document.querySelector('.form-card');
    if (formCard) {
        gsap.from(formCard, {
            scrollTrigger: {
                trigger: formCard,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Parallax for floating elements
    gsap.utils.toArray('.floating-shape').forEach((shape, i) => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: (i + 1) * -100,
            ease: 'none'
        });
    });
}

// ========================================
// HERO ANIMATIONS
// ========================================
function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });

    // Hero badge
    tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    });

    // Title lines
    tl.from('.title-line', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.3');

    // Description
    tl.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4');

    // Stats
    tl.from('.hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');

    // CTA buttons - убрана анимация opacity для стабільного відображення
    // tl.from('.hero-cta .btn', {
    //     y: 30,
    //     opacity: 0,
    //     duration: 0.5,
    //     stagger: 0.1,
    //     ease: 'power3.out'
    // }, '-=0.3');

    // Card stack
    tl.from('.hero-card-stack', {
        scale: 0.8,
        opacity: 0,
        rotateY: -30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8');

    // Stars
    tl.from('.star', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)'
    }, '-=0.5');

    // Scroll indicator
    tl.from('.hero-scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');
}

// ========================================
// ANIMATED COUNTER
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        let counted = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    animateCounter(counter, target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
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
// FAQ ACCORDION
// ========================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });
}

// ========================================
// SWIPER SLIDER
// ========================================
function initSwiper() {
    if (typeof Swiper === 'undefined') return;

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

// ========================================
// REVIEW MODAL
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ========================================
// MESSENGER LINKS
// ========================================
function setupMessengerLinks() {
    // Telegram
    const telegramLinks = document.querySelectorAll('#telegramContact, #telegramFooter');
    telegramLinks.forEach(link => {
        link.href = `https://t.me/${CONFIG.telegram}`;
    });

    // WhatsApp
    const whatsappLinks = document.querySelectorAll('#whatsappContact, #whatsappFooter');
    const whatsappMessage = encodeURIComponent('Вітаю! Хочу замовити розклад таро.');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsapp}?text=${whatsappMessage}`;
    });

    // Viber
    const viberLinks = document.querySelectorAll('#viberContact, #viberFooter');
    viberLinks.forEach(link => {
        link.href = `viber://chat?number=%2B${CONFIG.viber}`;
    });
}

// ========================================
// CONTACT FORM
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
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="btn-text">Відправка...</span>';
        submitButton.disabled = true;

        try {
            await sendFormData(formData);

            successMessage.classList.add('show');
            form.reset();

            // Reset phone field
            document.getElementById('phone').value = '+380 ';

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

        } catch (error) {
            console.error('Form error:', error);
            showNotification('Виникла помилка. Спробуйте зв\'язатися через месенджер.', 'error');
        } finally {
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
        }
    });
}

function validateForm(data) {
    if (data.name.trim().length < 2) {
        showNotification('Будь ласка, введіть ваше ім\'я', 'error');
        return false;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
        showNotification('Будь ласка, введіть коректний номер телефону', 'error');
        return false;
    }

    if (!data.service) {
        showNotification('Будь ласка, оберіть послугу', 'error');
        return false;
    }

    return true;
}

async function sendFormData(data) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('service', data.service);
    formData.append('message', data.message || '');
    formData.append('landing', 'Landing 3 (Desktop - Cozy Mystical)');

    const response = await fetch('send-form.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.error || !result.success) {
        throw new Error(result.error || 'Unknown error');
    }

    return result;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'error' ? '#C4726C' : '#5C4A72'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 16px;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// ========================================
// PHONE INPUT FORMATTING
// ========================================
function setupPhoneFormatting() {
    const phoneInput = document.getElementById('phone');

    phoneInput.value = '+380 ';

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
        if (value.length > 0) formatted += value.substring(0, 3);
        if (value.length > 3) formatted += ' ' + value.substring(3, 5);
        if (value.length > 5) formatted += ' ' + value.substring(5, 8);
        if (value.length > 8) formatted += ' ' + value.substring(8, 10);
        if (value.length > 10) formatted += ' ' + value.substring(10, 12);

        e.target.value = formatted;
    });

    phoneInput.addEventListener('focus', function(e) {
        if (e.target.value === '') {
            e.target.value = '+380 ';
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ========================================
// SERVICE CARD TILT EFFECT
// ========================================
function initCardTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// ========================================
// CSS ANIMATIONS
// ========================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
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
document.head.appendChild(styleSheet);

// ========================================
// INITIALIZE EVERYTHING
// ========================================
// Debug function - expose to window for testing
window.debugTarot = function() {
    console.log('=== TAROT DEBUG INFO ===');
    console.log('TAROT_CARDS loaded:', !!TAROT_CARDS);
    console.log('TAROT_CARDS length:', TAROT_CARDS ? TAROT_CARDS.length : 'N/A');
    console.log('cardAlreadySelected:', cardAlreadySelected);
    console.log('LocalStorage cardOfDay:', localStorage.getItem('cardOfDay'));
    console.log('LocalStorage cardOfDayDate:', localStorage.getItem('cardOfDayDate'));

    const cards = document.querySelectorAll('.spread-card');
    console.log('Spread cards found:', cards.length);
    cards.forEach((card, i) => {
        console.log(`  Card ${i}: cardIndex=${card.dataset.cardIndex}, displayed=${card.style.display !== 'none'}`);
    });
};

// Reset function - expose to window for testing
window.resetTarotCards = function() {
    console.log('Resetting tarot cards...');
    localStorage.removeItem('cardOfDay');
    localStorage.removeItem('cardOfDayDate');
    location.reload();
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Таро у Тапочках - Landing 3: Cozy Mystical');
    console.log('Initializing...');
    console.log('💡 Debug commands available:');
    console.log('  - window.debugTarot() - show current state');
    console.log('  - window.resetTarotCards() - clear and reload');

    // IMPORTANT: Clear old card data with wrong mappings
    const needsClear = !localStorage.getItem('cardsFixed_v5');
    if (needsClear) {
        console.log('🧹 Clearing old card data with wrong mappings...');
        localStorage.removeItem('cardOfDay');
        localStorage.removeItem('cardOfDayDate');
        localStorage.removeItem('cardsFixed_v2');
        localStorage.removeItem('cardsFixed_v3');
        localStorage.removeItem('cardsFixed_v4');
        localStorage.setItem('cardsFixed_v5', 'true');
        console.log('✅ Old data cleared');
    } else {
        console.log('✅ Cards already fixed to v5');
    }

    // Also clear if data is corrupted
    const savedCard = localStorage.getItem('cardOfDay');
    if (savedCard) {
        try {
            const card = JSON.parse(savedCard);
            if (!card.name || !card.image || !card.meaning || !card.advice) {
                console.log('⚠️ Corrupted card data detected, clearing...');
                localStorage.removeItem('cardOfDay');
                localStorage.removeItem('cardOfDayDate');
            }
        } catch (e) {
            console.log('⚠️ Invalid JSON in localStorage, clearing...');
            localStorage.removeItem('cardOfDay');
            localStorage.removeItem('cardOfDayDate');
        }
    }

    console.log(`✅ Tarot cards loaded: ${TAROT_CARDS.length} cards`);

    // Core features
    initNavbar();
    initBackToTop();
    setupSmoothScroll();
    setupMobileMenu();

    // Animations
    initCursorFollower();
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    initMagneticButtons();
    initCardTilt();

    // Card of the day
    initCardOfDay();

    // Interactive elements
    initFaqAccordion();
    initSwiper();
    initReviewModal();

    // Forms and links
    setupMessengerLinks();
    setupContactForm();
    setupPhoneFormatting();

    // Форсированное отображение кнопок hero (защита от GSAP)
    setTimeout(() => {
        const heroButtons = document.querySelectorAll('.hero-cta .btn');
        heroButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
            btn.style.display = 'inline-flex';
        });
        console.log('Hero buttons forced visible:', heroButtons.length);
    }, 100);

    console.log('All features initialized!');
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'none';
    } else {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'block';
    }
});
