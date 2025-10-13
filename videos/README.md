# Video Assets für MPM Thai Massage

## 🎬 Benötigte Videos

### Hero-Video: `massage.mp4`
- **Auflösung:** 1920x1080 oder höher
- **Format:** MP4 (H.264 Codec)
- **Dauer:** 15-30 Sekunden Loop
- **Größe:** < 50MB für optimale Performance
- **Inhalt:** Thai-Massage oder Spa-Atmosphäre

### Installation
1. Video-Datei als `massage.mp4` in den `videos/` Ordner legen
2. Das Video wird automatisch als Hintergrund geladen
3. Bei fehlendem Video wird das statische Bild als Fallback verwendet

### Optimierung
```bash
# Mit ffmpeg komprimieren (falls zu groß):
ffmpeg -i original.mp4 -vcodec h264 -acodec mp2 -b:v 1M -b:a 128k massage.mp4
```

### Hinweis
Das Video `massage.mp4` ist aufgrund der GitHub-Größenbeschränkung (100MB) nicht im Repository enthalten. Für die Produktion muss das Video separat hochgeladen werden.