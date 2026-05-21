# Мій день — PWA

Персональний AI-помічник. Фронтенд (PWA на GitHub Pages).

## Деплой

1. Створити репозиторій `my-day-app` на GitHub
2. Завантажити всі файли (`index.html`, `sw.js`, `manifest.json`, `icons/`)
3. Settings → Pages → Source: `main` branch, root `/`
4. В `index.html` встановити `const API = 'https://my-day-bot-production.up.railway.app'`

## Файли

```
index.html      — весь додаток (чат, дашборд, налаштування, шифрування, auth)
sw.js           — Service Worker (офлайн + push)
manifest.json   — PWA-маніфест
icons/
  icon-192.png  — іконка 192×192
  icon-512.png  — іконка 512×512
```

## Безпека

- Passkey (WebAuthn) — біометричний вхід
- AES-256-GCM — наскрізне шифрування
- PBKDF2 (600 000 ітерацій) — захист ключа PIN-кодом
- Ключ шифрування в IndexedDB, обгорнутий PIN
- Жодних даних у localStorage
