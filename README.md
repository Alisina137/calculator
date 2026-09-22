# Persian/Dari Calculator

A Persian/Dari-first, RTL-first, offline-first mobile calculator built with React Native, Expo and TypeScript.

## MVP feature set

- standard calculator with live result
- scientific mode with DEG/RAD
- local calculation history
- percentage calculator
- discount calculator
- offline unit converter
- Solar Hijri and Gregorian age calculator
- date difference and date arithmetic
- Persian/Dari wording
- Persian/Latin numeral display
- light/dark/system appearance
- local persistence with no account or backend

## Stack

- React Native 0.86
- Expo SDK 57
- Expo Router
- TypeScript
- AsyncStorage

## Local setup

```powershell
cd C:\projects\calculator
npm install
npx expo start --clear
```

## Verification

Run the complete automated source verification:

```powershell
npm run verify
```

This runs:

1. TypeScript checking
2. core regression tests for calculation, numerals, dates and unit conversion

## Release builds

Preview Android:

```powershell
npx eas-cli build --profile preview --platform android
```

Production Android:

```powershell
npx eas-cli build --profile production --platform android
```

See:

- `docs/PRIVACY.md`
- `docs/STORE-METADATA.md`
- `docs/RELEASE-CHECKLIST.md`
- `docs/PROJECT-STATE.md`

## Google Play release preparation

Run:

```powershell
npm install
npm run verify:release
```

The repository now configures:

- Android API 36 through Expo SDK 57
- generated launcher/adaptive/themed icons
- configured splash screen
- Google Play 512×512 icon
- Google Play 1024×500 feature graphic
- preview APK profile
- production AAB profile
- internal and production EAS submission profiles
- privacy policy and Play Console declarations guide

See `docs/GOOGLE-PLAY-SUBMISSION.md`.

Final publishing still requires real-device testing/screenshots and Play Console account-level actions.
