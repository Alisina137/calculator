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
- Local-first architecture
- No backend / authentication / billing for MVP

## Architecture decision
Flutter was replaced before substantive feature implementation because the local Flutter toolchain was unavailable/heavy for the user's development environment. Product requirements and phase outcomes remain unchanged.

## Current phase
Phase 2 — Core Calculator

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

## Phase 2 implemented outcomes
- Safe on-device expression parser with no eval/arbitrary code execution
- Addition, subtraction, multiplication and division
- Operator precedence
- Unary negative values
- Decimal input protection
- Contextual percentage behavior
- ± sign toggle for the current operand
- AC and backspace
- Live result preview
- Equals/finalization state prepared for Phase 3 persistence
- Divide-by-zero and malformed-expression messages
- Large/small number formatting with floating-point cleanup
- Input protection for repeated decimals and consecutive operators
- Persian, Arabic-Indic and Latin digit normalization remains compatible with calculation input

## Phase 2 expected behavior examples
- 2 + 3 × 4 = 14
- 10 ÷ 4 = 2.5
- 0.1 + 0.2 displays 0.3 after formatting cleanup
- 200 × 10% = 20
- 100 + 10% = 110
- 100 − 10% = 90
- division by zero displays a localized user-facing error
- incomplete expressions never expose parser exceptions

## Verification status
Phase 1 TypeScript checking passed locally on 2026-09-22.
Phase 2 source is implemented. Local TypeScript/runtime verification is pending after pull.

## Known limitations
- Finalized calculations are held in memory only; persistent history begins in Phase 3.
- Scientific mode begins in Phase 3.
- Preference persistence is deferred until local persistence work.

## Next phase
Phase 3 — History and Scientific Mode
