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

## Current release status

Phase 6 production-readiness source work is implemented. Final store submission still requires production icon/splash assets, public privacy-policy hosting, store screenshots/contact details, a signed production build and final physical-device regression testing.
