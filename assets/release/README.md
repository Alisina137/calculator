# Generated Release Assets

Run:

```powershell
npm run assets:generate
```

This creates:

- `icon.png` — 1024×1024 launcher/master icon
- `play-store-icon.png` — 512×512 Google Play listing icon
- `adaptive-foreground.png` — Android adaptive foreground
- `adaptive-monochrome.png` — Android 13+ themed icon layer
- `splash-icon.png` — transparent splash icon
- `play-feature-graphic.png` — 1024×500 Google Play feature graphic

The PNG files are generated locally during `npm install` through the project's `postinstall` script.

Before uploading to Google Play, visually inspect the generated icon and feature graphic and confirm they match the final app branding.
