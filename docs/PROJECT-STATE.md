# Project State

## Product objective
Fast, free, Persian/Dari-first mobile calculator for everyday calculations.

## Product specification
Authoritative Product Specification supplied 2026-09-22.

## Technology stack
- React Native 0.86
- Expo SDK 57
- TypeScript
- Expo Router
- AsyncStorage local persistence
- Local-first architecture
- No backend / authentication / billing for MVP

## Architecture decision
Flutter was replaced before substantive feature implementation because the local Flutter toolchain was unavailable/heavy for the user's development environment. Product requirements and phase outcomes remain unchanged.

## Current phase
Phase 6 — Production Readiness

## Phase 1 completed outcomes
- Expo/React Native project foundation
- RTL-first application layout
- Three-destination bottom navigation
- Persian and Dari language variants
- Persian/Latin numeral formatting utility
- Light/dark/system appearance foundation
- Settings foundation
- Reusable calculator/tool controls
- Calculator shell, Tools, History, Settings screens
- TypeScript strict configuration

## Phase 2 completed outcomes
- Safe on-device expression parser with no eval/arbitrary code execution
- Addition, subtraction, multiplication and division
- Operator precedence
- Unary negative values
- Decimal input protection
- Contextual percentage behavior
- ± sign toggle
- AC and backspace
- Live result preview
- Divide-by-zero and malformed-expression messages
- Floating-point cleanup
- Input protection for repeated decimals and consecutive operators

## Phase 3 implemented outcomes
- Local calculation history
- Automatic save only when = finalizes a calculation
- History capped at 500 newest entries
- Reuse result from history
- Reuse full expression from history
- Delete individual history items
- Clear all history from History and Settings
- Date/time shown for history entries
- Persistent calculator draft restoration
- Persistent scientific/basic mode
- Persistent DEG/RAD setting
- Persistent language, numeral, appearance and haptic preferences
- Scientific mode without clearing current expression
- Scientific mode automatically switches to a landscape two-panel keypad
- Compact scientific calculator icon toggles simple/scientific modes
- Parentheses
- sin, cos and tan
- log and ln
- square root
- x² and xʸ
- π and e
- factorial
- reciprocal
- DEG/RAD with DEG as default
- Scientific domain and overflow error handling

## Phase 4 implemented outcomes
- Percentage calculator with four modes: percent of value, ratio percentage, percentage increase and percentage decrease
- Discount calculator with original price, discount percentage and optional quantity
- Discount outputs for saved amount, final price, quantity total and total savings
- Offline unit converter with length, mass, area, volume, temperature, speed, data size and time
- Immediate unit conversion and source/target swap
- Age calculator supporting Solar Hijri and Gregorian input
- Exact age in years, months and days
- Total age in days and next-birthday information
- Date difference calculator with exact calendar difference and total days
- Date arithmetic for days, weeks, months and years
- Add/subtract date operations
- Calendar-date arithmetic that does not use local-time timestamps for date differences
- Validated localized numeric/date inputs and Persian/Dari-first result presentation

## Phase 5 implemented outcomes
- Persian/Dari terminology pass across everyday tools
- Dari-specific percentage terminology and result wording
- Persian/Latin numeral presentation preserved independently from stored numeric values
- Persian decimal and grouping separators in Persian numeral mode
- Canonical normalization of Persian, Arabic-Indic and Latin digits and separators
- Localized decimal key presentation
- Persian (Iran) vs Dari/Afghanistan locale selection for history timestamps
- Solar Hijri/Gregorian tool labels and date presentation refinement
- Semantic screen-reader labels for calculator operators and scientific functions
- Accessibility selected-state semantics for settings and tool choices
- Visible selected-state checkmarks so state is not communicated by color alone
- Expanded invisible touch targets for compact/scientific keys
- Large-text resilience improvements for tool result rows and calculator labels
- LTR mathematical expressions/results preserved inside RTL application screens
- Tool input accessibility labels and canonical digit handling

## Phase 6 implemented outcomes
- Storage-write failures no longer interrupt active calculations
- Corrupted stored history remains filtered during restoration
- App-level render error boundary prevents raw stack traces from becoming the user experience
- Clear-all history now requires destructive-action confirmation from History and Settings
- Lightweight automated regression test runner added
- Automated calculation engine coverage for arithmetic, precedence, decimals, negatives, percentages, powers and scientific functions
- Automated Persian/Arabic-Indic/Latin numeral normalization coverage
- Automated Gregorian leap-year, Solar Hijri conversion and month-end date coverage
- Automated conversion-family and common unit conversion coverage
- Combined `npm run verify` command for typecheck + regression tests
- MVP release version set to 1.0.0 with initial Android/iOS build numbers
- EAS preview and production build profiles added
- Privacy documentation added
- Persian/Dari store-listing metadata drafted
- Release/regression checklist added for all seven critical journeys
- Security/privacy release checks documented
- Final production asset and store-submission blockers explicitly documented

## Verification status
Phase 1 TypeScript checking passed locally on 2026-09-22.
Phase 2 was implemented and pulled locally.
Phase 3 is implemented and has been exercised on-device during UI refinement; full acceptance verification remains pending.
Phase 4 TypeScript checking passed locally on 2026-09-22; device runtime verification is in progress.
Phase 5 source is implemented; local TypeScript and device runtime verification are pending after pull.
Phase 6 source is implemented.
Automated verification passed locally on 2026-09-22: TypeScript check passed and all 13 regression tests passed with 0 failures.
Final physical-device regression and release asset/store preparation remain pending.

## Known limitations / release blockers
- Age/date tools use typed year/month/day entry rather than a graphical date picker to keep the MVP dependency-light and offline.
- Large-text and screen-reader behavior still require real-device acceptance testing.
- History is local-only by product design.
- Production icon, Android adaptive/themed icon, splash icon and Google Play feature graphic are now generated by the project and wired into app configuration; they still require final visual review.
- Real Google Play phone screenshots are not yet captured.
- Privacy policy page is prepared but GitHub Pages (or another public host) still needs to be enabled and verified before submission.
- Developer/support email still needs to be entered in Play Console.
- Signed Android production build, physical-device regression, Play policy questionnaires and account-level release steps remain manual release operations.

## Next milestone
Run release verification, create/install the preview APK, complete physical-device testing, capture real Play screenshots, then build and submit the production AAB.
