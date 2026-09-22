# MVP Release Checklist

## Automated verification

Run:

```powershell
npm run verify
```

This must pass before creating a production build.

## Critical regression journeys

### Journey 1 — Calculator and history
- Launch app.
- Calculate `12 × 8`.
- Press equals.
- Open History.
- Confirm the entry exists.
- Reuse the result.
- Return to calculator and confirm the reused value is correct.

### Journey 2 — Percentage
- Open Tools → Percentage.
- Calculate 15% of 2000.
- Confirm result is 300.
- Return to Tools without a crash.

### Journey 3 — Discount
- Original price: 2000.
- Discount: 20%.
- Quantity: 1.
- Confirm saving is 400 and final price is 1600.

### Journey 4 — Solar Hijri age
- Open Age.
- Select Solar Hijri.
- Enter a valid birth date and today's calculation date.
- Confirm a valid years/months/days result appears.
- Enter a future birth date and confirm a friendly validation error appears.

### Journey 5 — Numeral style
- Perform a calculation in Persian numeral mode.
- Switch to Latin numerals.
- Confirm the displayed digits change but the numeric result does not.
- Switch back and confirm the same result remains.

### Journey 6 — Dark mode
- Switch appearance to Dark.
- Check Calculator, Tools, History, Settings and all five tool screens.
- Confirm text remains readable and selected states are visible without relying only on color.

### Journey 7 — Scientific mode
- Enter an expression.
- Enable scientific mode.
- Confirm the expression is preserved.
- Test sin(30) in DEG mode and confirm 0.5.
- Switch DEG/RAD and confirm the setting persists after navigating away and back.

## Edge-case regression

- division by zero shows a localized error, never Infinity/NaN;
- repeated decimal entry does not create malformed numbers;
- consecutive operators remain recoverable;
- long expressions do not crash;
- Persian, Latin and mixed digits normalize correctly;
- Arabic decimal/group separators normalize correctly;
- history handles corrupted entries by skipping them;
- clearing all history requires confirmation;
- Gregorian leap day works;
- Solar Hijri conversion works around New Year;
- month-end date arithmetic clamps safely;
- same-date difference returns zero;
- invalid/future age dates produce friendly errors;
- rotate into and out of scientific mode;
- test a small phone, large-font mode and a tablet if available;
- background and resume the app during an unfinished calculation;
- change system theme while the app is open.

## Accessibility regression

- calculator symbols have meaningful screen-reader labels;
- selected choices announce selected state;
- selected choices have a visible checkmark;
- primary touch targets remain practical at large font sizes;
- calculator expressions/results stay LTR;
- Persian/Dari labels remain RTL;
- no required state is communicated by color only.

## Privacy/security regression

- no account is required;
- core tools function with internet disabled;
- no arbitrary-code evaluation is used by the calculation engine;
- no credentials/API keys are present in the repository;
- no raw stack trace, NaN or Infinity is shown in normal UI;
- calculation contents are not sent to analytics.

## Build verification

Preview build:

```powershell
npx eas-cli build --profile preview --platform android
```

Production Android build:

```powershell
npx eas-cli build --profile production --platform android
```

Production iOS build, when Apple signing is available:

```powershell
npx eas-cli build --profile production --platform ios
```

## Release assets still required

Do not submit to a store until these are completed and wired into `app.json`:

- 1024 × 1024 production app icon,
- Android adaptive icon foreground/background,
- splash artwork,
- Play Store screenshots,
- App Store screenshots.

## Store readiness still required

- publish the privacy policy at a public URL;
- add final developer/support contact information;
- complete Play Store Data safety;
- complete App Store privacy questionnaire;
- confirm content rating;
- verify package/bundle IDs;
- verify signing credentials;
- test the signed production build on a physical Android device before submission.
