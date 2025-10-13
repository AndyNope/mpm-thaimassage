# MPM Thai Massage Website 🌸

Eine moderne, luxuriöse Website für MPM Thai Massage in Weinfelden, Schweiz.

## ✨ Features

### 🎨 **Modern & Luxuriös**
- Responsive Design für alle Geräte
- Thailand-inspirierte Farbpalette (Gold & Schwarz)
- Smooth Animations & Parallax-Effekte
- Video-Hintergrund im Hero-Bereich

### 🔒 **Sicherheit & Spam-Schutz**
- Google reCAPTCHA v3 Integration
- Rate Limiting (1 Formular/Minute)
- XSS & CSRF Schutz
- Sichere PHP-Konfiguration

### 📱 **Performance & SEO**
- Mobile-First Design
- Optimierte .htaccess (Gzip, Caching)
- Clean URLs ohne .html
- SSL-Ready & HTTPS-Redirect

### 🛠️ **Technologie Stack**
- **Frontend:** HTML5, CSS3, JavaScript ES6
- **Backend:** PHP 7.4+
- **Sicherheit:** Google reCAPTCHA v3
- **Styling:** Custom CSS mit Flexbox/Grid
- **Icons:** Font Awesome 6
- **Fonts:** Google Fonts (Poppins)

## 📁 Projektstruktur

```
mpm-massage/
├── index.html              # Hauptseite
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutzerklärung
├── success.html            # Erfolgsmeldung
├── 404.html               # 404 Fehlerseite
├── send-email.php         # PHP Backend für Kontaktformular
├── .htaccess              # Server-Konfiguration
├── css/
│   └── style.css          # Haupt-Stylesheet
├── js/
│   └── script.js          # JavaScript Funktionalität
├── images/                # Bilder & Assets
├── videos/                # Hero-Video
└── docs/
    ├── INSTALLATION.md    # Installations-Anleitung
    └── RECAPTCHA_SETUP.md # reCAPTCHA Setup-Guide
```

## 🚀 Installation

### 1. Repository klonen
```bash
git clone https://github.com/AndyNope/mpm-thaimassage.git
cd mpm-thaimassage
```

### 2. Lokaler Entwicklungsserver
```bash
# Python (empfohlen)
python3 -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (mit live-server)
npx live-server
```

### 3. Produktion
1. Dateien auf Webserver hochladen
2. SSL-Zertifikat aktivieren
3. Domain `mpm-thai-massage.ch` konfigurieren
4. reCAPTCHA Keys konfigurieren (bereits gesetzt)

## 🔧 Konfiguration

### reCAPTCHA (bereits konfiguriert ✅)
- Site Key und Secret Key sind bereits implementiert
- Funktioniert für Domain: `mpm-thai-massage.ch`

### E-Mail Setup
```php
// In send-email.php konfigurieren:
$to_email = "info@mpm-thai-massage.ch";
$from_email = "noreply@mpm-thai-massage.ch";
```

### SSL & Domain
- .htaccess leitet automatisch auf HTTPS um
- Clean URLs ohne .html Extension

## 🎯 Live Demo

**Website:** [mpm-thai-massage.ch](https://mpm-thai-massage.ch) *(coming soon)*

### Hauptbereiche:
- **Hero:** Video-Hintergrund mit Call-to-Action
- **Services:** Thai-Massage Dienstleistungen
- **Team:** Über uns Sektion
- **Gallery:** Bildergalerie
- **Contact:** Sicheres Kontaktformular mit reCAPTCHA

## 📱 Responsive Design

- **Desktop:** Vollständige Feature-Set
- **Tablet:** Optimierte Navigation & Layout
- **Mobile:** Touch-optimiert, reduzierte Animationen

## 🛡️ Sicherheitsfeatures

- **reCAPTCHA v3:** Unsichtbarer Bot-Schutz
- **Rate Limiting:** Spam-Prävention
- **Input Validation:** XSS-Schutz
- **HTTPS Only:** SSL-Verschlüsselung
- **Security Headers:** CSP, HSTS, etc.

## 📊 Performance

- **Gzip Compression:** ~70% kleinere Dateien
- **Browser Caching:** 1 Monat für Assets
- **Optimierte Bilder:** WebP/JPEG mit Komprimierung
- **Minimaler JavaScript:** Vanilla JS, keine Frameworks

## 🤝 Beitragen

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/neue-funktion`)
3. Änderungen committen (`git commit -am 'Neue Funktion hinzugefügt'`)
4. Branch pushen (`git push origin feature/neue-funktion`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt ist für MPM Thai Massage erstellt. Alle Rechte vorbehalten.

## 📞 Support

**MPM Thai Massage**
- **Adresse:** Felsenstrasse 13, 8570 Weinfelden
- **Telefon:** +41 79 846 75 99
- **E-Mail:** info@mpm-thai-massage.ch

---

**Made with ❤️ for authentic Thai massage experience**