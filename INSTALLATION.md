# MPM Thai Massage - Installationsanleitung

## 🚀 Website-Installation auf mpm-thai-massage.ch

### 📋 Voraussetzungen
- PHP 7.4 oder höher
- Mail-Server Unterstützung (SMTP)
- HTTPS-SSL-Zertifikat

### 📁 Dateien hochladen
Laden Sie alle Dateien in das Root-Verzeichnis Ihres Webservers hoch:

```
/public_html/ (oder htdocs/)
├── index.html
├── send-email.php
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── hero-thai.jpg
    ├── thai-massage-alt.jpg
    ├── spa-herbs.jpg
    └── about-us.png
```

### ⚙️ PHP-Konfiguration

#### 1. E-Mail-Einstellungen prüfen
Stellen Sie sicher, dass PHP `mail()` funktioniert:

```php
// Test-E-Mail senden (test-mail.php)
<?php
$test = mail('info@mpm-thai-massage.ch', 'Test', 'PHP Mail funktioniert!');
echo $test ? 'Mail erfolgreich gesendet!' : 'Mail-Fehler!';
?>
```

#### 2. SMTP-Konfiguration (optional, empfohlen)
Für bessere Zustellbarkeit können Sie PHPMailer verwenden:

```bash
# Via Composer installieren
composer require phpmailer/phpmailer
```

### 🔒 Sicherheitseinstellungen

#### 1. .htaccess erstellen
```apache
# .htaccess für zusätzliche Sicherheit
RewriteEngine On

# HTTPS erzwingen
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Schutz vor direktem Zugriff auf PHP-Dateien (außer send-email.php)
<Files "*.php">
    Order Deny,Allow
    Deny from all
</Files>

<Files "send-email.php">
    Order Allow,Deny
    Allow from all
</Files>

# Log-Dateien schützen
<Files "*.log">
    Order Deny,Allow
    Deny from all
</Files>

# Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

#### 2. PHP-Berechtigungen
```bash
# Dateiberechtigungen setzen
chmod 644 *.html *.php
chmod 644 css/*.css
chmod 644 js/*.js
chmod 644 images/*
chmod 755 . css js images
```

### 📧 E-Mail-Konfiguration

#### Domain-E-Mail einrichten
1. **E-Mail-Account erstellen:** `info@mpm-thai-massage.ch`
2. **SPF-Record hinzufügen:** `v=spf1 a mx ~all`
3. **DKIM aktivieren** (falls verfügbar)

### 🔐 Google reCAPTCHA v3 Setup

#### 1. reCAPTCHA Keys generieren
1. **Admin Console:** https://www.google.com/recaptcha/admin/create
2. **Domain registrieren:** `mpm-thai-massage.ch`
3. **Keys erhalten:** Site Key (öffentlich) + Secret Key (privat)

#### 2. Keys in Code einfügen
```bash
# Site Key ersetzen (3x)
sed -i 's/YOUR_SITE_KEY_HERE/ECHTER_SITE_KEY/g' index.html
sed -i 's/YOUR_SITE_KEY_HERE/ECHTER_SITE_KEY/g' js/script.js

# Secret Key ersetzen (1x)
sed -i 's/YOUR_SECRET_KEY_HERE/ECHTER_SECRET_KEY/g' send-email.php
```

**📋 Detaillierte Anleitung:** Siehe `RECAPTCHA_SETUP.md`

#### Spam-Schutz (mehrschichtig)
```php
// In send-email.php bereits implementiert:
- Google reCAPTCHA v3 (Haupt-Schutz)
- Rate Limiting (1 Submission pro Minute)
- Honeypot-Feld (Bot-Erkennung)
- Input-Validierung & XSS-Schutz
- IP-Logging für Analyse
```

### 🧪 Funktionstest

#### 1. Kontaktformular testen
1. Website öffnen: `https://mpm-thai-massage.ch`
2. Kontaktformular ausfüllen
3. Absenden und E-Mail-Eingang prüfen

#### 2. Debug-Modus aktivieren (optional)
```php
// Am Anfang von send-email.php hinzufügen
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### 📊 Monitoring & Logs

#### Log-Dateien prüfen
```bash
# Form-Submissions anzeigen
tail -f form_submissions.log

# PHP-Fehler-Logs
tail -f /var/log/php_errors.log
```

#### Google Analytics einbinden (optional)
```html
<!-- Vor </head> in index.html -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 🎯 Go-Live Checkliste

- [ ] Alle Dateien hochgeladen
- [ ] PHP-Mail funktioniert
- [ ] SSL-Zertifikat installiert
- [ ] .htaccess konfiguriert
- [ ] E-Mail-Account erstellt
- [ ] Kontaktformular getestet
- [ ] Mobile Ansicht geprüft
- [ ] Google Search Console eingerichtet
- [ ] Backup erstellt

### 🔧 Wartung

#### Regelmäßige Aufgaben
- **Wöchentlich:** Log-Dateien prüfen
- **Monatlich:** Backup erstellen
- **Bei Bedarf:** PHP/CMS Updates

#### Support-Kontakt
Bei Problemen:
1. PHP-Error-Logs prüfen
2. Browser-Konsole checken
3. Hosting-Support kontaktieren

---

## 🌟 Zusätzliche Features (optional)

### Google Maps Integration
```html
<!-- Iframe für Standort -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." 
        width="100%" height="300" style="border:0;" allowfullscreen="" 
        loading="lazy"></iframe>
```

### WhatsApp Business API
- WhatsApp Business Account erstellen
- API-Integration für automatische Antworten

### Online-Terminbuchung
- Calendly Integration
- Eigenes Buchungssystem entwickeln

---

**🎉 Viel Erfolg mit der neuen MPM Thai Massage Website!**