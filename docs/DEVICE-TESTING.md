# Physical Device Testing — MVP

## Goal

Verify the signed/release-like app on a real Android phone before store submission.

## Required device pass

### 1. Launch and persistence
- Cold launch the app.
- Confirm Calculator is the initial screen.
- Enter an unfinished expression, background the app, reopen it, and confirm the draft remains.
- Kill the app completely, reopen it, and confirm persisted settings/history still load.

### 2. Standard calculator
- 12 + 8 = 20
- 44 ÷ 11 = 4
- 0.1 + 0.2 displays cleanly
- repeated decimal input does not create malformed numbers
- consecutive operators remain recoverable
- division by zero shows a localized error
- long expressions do not crash

### 3. History
- Finalize a calculation.
- Confirm it appears in History.
- Reuse result.
- Reuse expression.
- Delete one entry.
- Clear all and confirm the destructive confirmation dialog appears.

### 4. Scientific mode
- Enter an expression before enabling scientific mode and confirm it is preserved.
- Rotate to scientific landscape mode.
- Confirm every scientific and standard keypad row is fully visible.
- Test sin(30) in DEG = 0.5.
- Test sqrt(81) = 9.
- Test 5! = 120.
- Toggle DEG/RAD and confirm it persists.

### 5. Everyday tools
- Percentage: 15% of 2000 = 300.
- Discount: 2000 at 20% = 1600, saving 400.
- Unit conversion: 1 km = 1000 m.
- Age: valid Solar Hijri date returns a valid age.
- Age: future birth date produces a friendly error.
- Date difference: same date returns zero.
- Date arithmetic: Gregorian 2024/01/31 + 1 month = 2024/02/29.

### 6. Localization
- Switch Persian ↔ Dari.
- Confirm Persian uses درصد and Dari uses فیصدی where applicable.
- Switch Persian ↔ Latin numerals.
- Confirm only presentation changes; numeric results remain identical.
- Paste mixed Persian/Latin digits into tool fields.

### 7. RTL/LTR
- Persian/Dari labels remain RTL.
- Mathematical expressions/results remain LTR.
- No controls overlap in portrait or landscape.
- No page-level horizontal scrolling appears.

### 8. Appearance
- Test Light.
- Test Dark.
- Test System.
- Change system theme while the app is open.

### 9. Accessibility
- Enable large system text.
- Confirm calculator and tool screens remain usable.
- Confirm selected choices remain visible with the checkmark.
- With TalkBack, verify operator labels such as ضرب and تقسیم.
- Verify scientific functions announce meaningful names.
- Verify touch targets remain easy to use.

### 10. Offline
- Enable airplane mode.
- Restart the app.
- Confirm standard/scientific calculator, percentage, discount, unit conversion, age, date, history and settings all work.

## Pass criteria

The physical-device pass is complete when:
- no crash occurs;
- no clipped keypad rows remain;
- no raw NaN/Infinity/stack trace is visible;
- all critical calculations return expected values;
- offline use works;
- Persian/Dari and numeral modes work;
- history persists;
- accessibility and RTL behavior are acceptable.
