# Google reCAPTCHA v3 Setup für MPM Thai Massage

## ✅ **ERFOLGREICH KONFIGURIERT!**

**Status:** reCAPTCHA v3 ist aktiv und schützt das Kontaktformular.

## 🔐 reCAPTCHA v3 Konfiguration

### 1. Google reCAPTCHA Konto erstellen

1. **Google reCAPTCHA Admin Console:** https://www.google.com/recaptcha/admin/create
2. **Neuen Site Key erstellen:**
   - **Label:** MPM Thai Massage Kontaktformular
   - **reCAPTCHA-Typ:** reCAPTCHA v3
   - **Domains:** 
     - `mpm-thai-massage.ch`
     - `www.mpm-thai-massage.ch`
     - `localhost` (für Tests)

3. **Keys erhalten:**
   - **Site Key** (öffentlich)
   - **Secret Key** (privat, nur Server)

### 2. Website-Konfiguration

#### HTML-Datei aktualisieren (index.html)
```html
<!-- Ersetze YOUR_SITE_KEY_HERE mit dem echten Site Key -->
<script src="https://www.google.com/recaptcha/api.js?render=DEIN_SITE_KEY_HIER" async defer></script>
```

#### JavaScript aktualisieren (js/script.js)
```javascript
// Ersetze YOUR_SITE_KEY_HERE mit dem echten Site Key (2 Stellen)
grecaptcha.execute('DEIN_SITE_KEY_HIER', {action: 'contact_form'})
```

#### PHP-Backend aktualisieren (send-email.php)
```php
// Ersetze YOUR_SECRET_KEY_HERE mit dem echten Secret Key
$secret_key = 'DEIN_SECRET_KEY_HIER';
```

### 3. Keys einfügen - Automatische Ersetzung

Verwenden Sie diese Befehle im Terminal (im Website-Ordner):

```bash
# Site Key ersetzen (ersetze DEIN_ECHTER_SITE_KEY mit dem echten Key)
sed -i 's/YOUR_SITE_KEY_HERE/DEIN_ECHTER_SITE_KEY/g' index.html
sed -i 's/YOUR_SITE_KEY_HERE/DEIN_ECHTER_SITE_KEY/g' js/script.js

# Secret Key ersetzen (ersetze DEIN_ECHTER_SECRET_KEY mit dem echten Key)
sed -i 's/YOUR_SECRET_KEY_HERE/DEIN_ECHTER_SECRET_KEY/g' send-email.php
```

### 4. Sicherheitseinstellungen

#### reCAPTCHA Score-Schwellenwerte
```php
// In send-email.php anpassen:
$min_score = 0.5; // Werte:
// 0.9+ = Sehr wahrscheinlich menschlich
// 0.7+ = Wahrscheinlich menschlich  
// 0.5+ = Neutral (empfohlen)
// 0.3+ = Verdächtig
// 0.1- = Sehr wahrscheinlich Bot
```

#### Domains-Whitelist prüfen
- Nur registrierte Domains können reCAPTCHA verwenden
- Wildcard-Subdomains: `*.mpm-thai-massage.ch`

### 5. Testing & Debugging

#### Test-Modus aktivieren
```php
// Temporär in send-email.php für Tests:
error_reporting(E_ALL);
ini_set('display_errors', 1);

// reCAPTCHA Debug-Info
echo json_encode([
    'recaptcha_score' => $recaptcha_result['score'] ?? 'unknown',
    'recaptcha_success' => $recaptcha_result['success']
]);
exit; // Entfernen nach Tests
```

#### Browser-Konsole prüfen
```javascript
// In Browser-Dev-Tools nach Fehlern suchen:
// - reCAPTCHA loading errors
// - CORS-Probleme
// - API Key-Fehler
```

### 6. Monitoring & Analytics

#### reCAPTCHA Admin Dashboard
- **URL:** https://www.google.com/recaptcha/admin
- **Statistiken:** Anfragen, Erfolgsrate, verdächtige Aktivitäten
- **Alerts:** Ungewöhnliche Aktivitäten

#### Log-Dateien überwachen
```bash
# reCAPTCHA-Fehler in PHP-Logs suchen
grep -i "recaptcha" /var/log/php_errors.log

# Form-Submissions mit Scores
tail -f form_submissions.log | grep "reCAPTCHA"
```

### 7. Fallback-Strategien

#### Wenn reCAPTCHA nicht verfügbar
```javascript
// JavaScript-Fallback bereits implementiert:
// - Honeypot-Feld als Backup
// - Rate Limiting im PHP
// - Input-Validierung
```

#### Backup-Spam-Schutz
```php
// In send-email.php bereits vorhanden:
// - Rate Limiting (1 pro Minute)
// - Honeypot-Feld
// - IP-Logging
// - Input-Sanitization
```

### 8. DSGVO-Konformität

#### Datenschutz-Hinweise
- reCAPTCHA-Hinweis im Formular bereits hinzugefügt
- Links zu Google-Datenschutz vorhanden
- Cookie-Banner optional ergänzen

#### Datenschutzerklärung erweitern
```html
<!-- Beispiel für Datenschutzerklärung -->
<h3>Google reCAPTCHA</h3>
<p>Diese Website verwendet Google reCAPTCHA v3 zum Schutz vor Spam und Missbrauch. 
Dabei werden Daten an Google übertragen und ausgewertet. Weitere Informationen 
finden Sie in der <a href="https://policies.google.com/privacy">Google Datenschutzerklärung</a>.</p>
```

### 9. Troubleshooting

#### Häufige Probleme:

**Problem:** "reCAPTCHA nicht geladen"
**Lösung:** 
- Site Key prüfen
- Domain in reCAPTCHA Admin registriert?
- HTTPS verwenden

**Problem:** "reCAPTCHA Score zu niedrig"
**Lösung:**
- Schwellenwert anpassen (0.3 statt 0.5)
- User-Verhalten analysieren
- Falsche Positive reduzieren

**Problem:** "CORS-Fehler"
**Lösung:**
- Domain korrekt registriert?
- HTTPS aktiviert?
- Subdomain-Wildcard verwenden

### 10. Performance-Optimierung

#### Lazy Loading
```html
<!-- Optional: reCAPTCHA erst bei Bedarf laden -->
<script>
function loadRecaptcha() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=SITE_KEY';
    document.head.appendChild(script);
}
// Bei Formular-Fokus laden
document.querySelector('#contact-form').addEventListener('focus', loadRecaptcha, {once: true});
</script>
```

---

## ✅ Checkliste vor Go-Live

- [ ] Site Key und Secret Key eingefügt
- [ ] Domain in reCAPTCHA Admin registriert
- [ ] SSL-Zertifikat aktiv
- [ ] Formular getestet (erfolgreich + fehlgeschlagen)
- [ ] Browser-Konsole auf Fehler geprüft
- [ ] reCAPTCHA Admin Dashboard kontrolliert
- [ ] Datenschutz-Hinweise aktualisiert
- [ ] Score-Schwellenwert angepasst
- [ ] Monitoring eingerichtet

**🎯 Nach dem Setup sollte das Kontaktformular sicher vor Spam geschützt sein!**