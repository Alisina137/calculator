# Generated Release Assets

Run:

```powershell
npm run assets:generate
```

This creates:

- `icon.png` — 1024×1024 full app/store icon
- `adaptive-foreground.png` — Android adaptive foreground
- `adaptive-monochrome.png` — Android 13+ themed icon layer
- `splash-icon.png` — transparent splash icon

The PNG files are generated locally during `npm install` through the project's `postinstall` script and are referenced by `app.json`.
