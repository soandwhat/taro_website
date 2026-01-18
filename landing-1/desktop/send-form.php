<?php
header('Content-Type: application/json; charset=utf-8');

// === Настройки ===
$to_email = 'taroutapockah@gmail.com';
$subject  = 'Нова заявка з сайту Таро у Тапочках';
$from_name = 'Таро у Тапочках';
$from_email = 'no-reply@yourdomain.com';

// === Получение данных ===
$name     = isset($_POST['name'])     ? trim($_POST['name'])     : '';
$phone    = isset($_POST['phone'])    ? trim($_POST['phone'])    : '';
$service  = isset($_POST['service'])  ? trim($_POST['service'])  : '';
$message  = isset($_POST['message'])  ? trim($_POST['message'])  : '';
$landing  = isset($_POST['landing'])  ? trim($_POST['landing'])  : 'Landing 1';

// === Валидация обязательных полей ===
if (empty($name) || empty($phone) || empty($service)) {
    echo json_encode(['error' => 'Усі обов\'язкові поля мають бути заповнені.']);
    exit;
}

// === Защита от спама ===
if (!filter_var($phone, FILTER_VALIDATE_REGEXP, ["options" => ["regexp" => "/^\+?[0-9\s\-\(\)]{7,}$/"]])) {
    echo json_encode(['error' => 'Некоректний номер телефону.']);
    exit;
}

// === Преобразование значения service в читабельный вид ===
$service_names = [
    'diagnosis'  => 'Повна діагностика - 500 грн',
    'protection' => 'Захист - 1 500 грн',
    'wax'        => 'Чистка воском - від 3 000 грн',
    'candles'    => 'Віджиг свічками - від 3 000 грн',
    'lead'       => 'Чистка свинцем - від 13 000 грн',
    'ritual'     => 'Ритуали - від 2 500 грн'
];

$service_display = isset($service_names[$service]) ? $service_names[$service] : $service;

// === Формирование сообщения ===
$email_message = "
Нова заявка з сайту Таро у Тапочках

Лендінг: $landing

Ім'я: $name
Телефон: $phone
Послуга: $service_display
";

if (!empty($message)) {
    $email_message .= "
Повідомлення:
$message
";
}

// === Заголовки письма ===
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode($from_name) . "?= <$from_email>\r\n";
$headers .= "Reply-To: $from_email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// === Отправка письма ===
if (mail($to_email, "=?UTF-8?B?" . base64_encode($subject) . "?=", $email_message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Не вдалося надіслати лист. Спробуйте пізніше.']);
}
?>
