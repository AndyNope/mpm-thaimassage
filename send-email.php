<?php
// MPM Thai Massage - Kontaktformular Backend
// Domain: mpm-thai-massage.ch

// Sicherheits-Header
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS für AJAX-Anfragen (nur von eigener Domain)
$allowed_origins = [
    'https://mpm-thai-massage.ch',
    'https://www.mpm-thai-massage.ch',
    'http://localhost:8000' // Für lokale Entwicklung
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Nur POST-Anfragen erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Nur POST-Anfragen erlaubt']);
    exit;
}

// Rate Limiting (einfache Implementierung)
session_start();
$current_time = time();
$last_submission = $_SESSION['last_form_submission'] ?? 0;
$time_limit = 60; // 1 Minute zwischen Submissions

if (($current_time - $last_submission) < $time_limit) {
    http_response_code(429);
    echo json_encode([
        'success' => false, 
        'message' => 'Bitte warten Sie ' . ($time_limit - ($current_time - $last_submission)) . ' Sekunden vor der nächsten Anfrage.'
    ]);
    exit;
}

// Eingabedaten validieren und sanitisieren
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validate_phone($phone) {
    // Schweizer Telefonnummern und internationale Formate
    return preg_match('/^[\+]?[0-9\s\-\(\)]{10,15}$/', $phone);
}

// Formular-Daten extrahieren
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validierung
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name ist erforderlich (mindestens 2 Zeichen)';
}

if (empty($email) || !validate_email($email)) {
    $errors[] = 'Gültige E-Mail-Adresse ist erforderlich';
}

if (empty($phone) || !validate_phone($phone)) {
    $errors[] = 'Gültige Telefonnummer ist erforderlich';
}

if (empty($service)) {
    $errors[] = 'Bitte wählen Sie einen Service aus';
}

// Honeypot-Feld für Spam-Schutz (unsichtbar im HTML)
if (!empty($_POST['website'])) {
    $errors[] = 'Spam erkannt';
}

// reCAPTCHA v3 Verifikation
function verify_recaptcha($token, $action = 'contact_form') {
    $secret_key = '6LeEkugrAAAAAGh1E6JmtCsg-P1dax5MPRYcUhcg'; // reCAPTCHA Secret Key
    
    if (empty($token)) {
        return ['success' => false, 'error' => 'Kein reCAPTCHA Token'];
    }
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secret_key,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        return ['success' => false, 'error' => 'reCAPTCHA Verbindungsfehler'];
    }
    
    $response = json_decode($result, true);
    
    if (!$response['success']) {
        return ['success' => false, 'error' => 'reCAPTCHA Verifikation fehlgeschlagen'];
    }
    
    // Score prüfen (0.0 - 1.0, höher = wahrscheinlich menschlich)
    $min_score = 0.5; // Anpassbar je nach Bedarf
    if (isset($response['score']) && $response['score'] < $min_score) {
        return ['success' => false, 'error' => 'reCAPTCHA Score zu niedrig: ' . $response['score']];
    }
    
    // Action prüfen
    if (isset($response['action']) && $response['action'] !== $action) {
        return ['success' => false, 'error' => 'reCAPTCHA Action stimmt nicht überein'];
    }
    
    return ['success' => true, 'score' => $response['score'] ?? 'unbekannt'];
}

// reCAPTCHA Token validieren
$recaptcha_token = $_POST['recaptcha_token'] ?? '';
$recaptcha_result = verify_recaptcha($recaptcha_token, 'contact_form');

if (!$recaptcha_result['success']) {
    $errors[] = 'Sicherheitsprüfung fehlgeschlagen: ' . $recaptcha_result['error'];
    
    // Log für verdächtige Aktivitäten
    error_log("reCAPTCHA failed for IP " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . ": " . $recaptcha_result['error']);
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// E-Mail konfiguration
$to = 'info@mpm-thai-massage.ch';
$subject = 'Neue Terminanfrage von mpm-thai-massage.ch';

// Service-Namen für bessere Lesbarkeit
$service_names = [
    'thai-massage' => 'Thai Massage',
    'herbal-stamp' => 'Kräuter-Stempel Massage',
    'combo' => 'Kombination'
];
$service_display = $service_names[$service] ?? $service;

// E-Mail-Inhalt (HTML)
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #c9a96e 0%, #d4af37 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #c9a96e; }
        .field strong { color: #1a1a1a; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🏮 MPM Thai Massage</h2>
            <p>Neue Terminanfrage erhalten</p>
        </div>
        
        <div class='content'>
            <div class='field'>
                <strong>👤 Name:</strong><br>
                $name
            </div>
            
            <div class='field'>
                <strong>📧 E-Mail:</strong><br>
                <a href='mailto:$email'>$email</a>
            </div>
            
            <div class='field'>
                <strong>📱 Telefon:</strong><br>
                <a href='tel:$phone'>$phone</a>
            </div>
            
            <div class='field'>
                <strong>💆‍♀️ Gewünschter Service:</strong><br>
                $service_display
            </div>
            
            " . (!empty($message) ? "
            <div class='field'>
                <strong>💬 Nachricht:</strong><br>
                " . nl2br($message) . "
            </div>
            " : "") . "
            
            <div class='field'>
                <strong>🕐 Eingegangen am:</strong><br>
                " . date('d.m.Y H:i:s') . "
            </div>
            
            <div class='field'>
                <strong>🌐 IP-Adresse:</strong><br>
                " . ($_SERVER['REMOTE_ADDR'] ?? 'Unbekannt') . "
            </div>
        </div>
        
        <div class='footer'>
            <p>Diese E-Mail wurde automatisch über das Kontaktformular auf mpm-thai-massage.ch gesendet.</p>
            <p>Antworten Sie direkt auf diese E-Mail, um den Kunden zu kontaktieren.</p>
        </div>
    </div>
</body>
</html>
";

// E-Mail-Header
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: noreply@mpm-thai-massage.ch',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 3',
    'Return-Path: noreply@mpm-thai-massage.ch'
];

// E-Mail senden
$mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Session-Zeit für Rate Limiting aktualisieren
    $_SESSION['last_form_submission'] = $current_time;
    
    // Erfolgreiche Antwort
    echo json_encode([
        'success' => true,
        'message' => 'Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
    ]);
    
    // Optional: Log für Statistiken
    $log_entry = date('Y-m-d H:i:s') . " - Neue Anfrage von: $name ($email) - Service: $service_display\n";
    file_put_contents('form_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
    
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Entschuldigung, es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.'
    ]);
    
    // Error Log
    error_log("Mail sending failed for: $name ($email)");
}
?>