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
Phase 1 — Foundation and Persian-First Design System

## Completed outcomes
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

## Verification status
Implemented in source. Runtime verification should be performed locally with npm install, npm run typecheck, and Expo Go.

## Known limitations
- Calculation evaluation is intentionally excluded from Phase 1 and begins in Phase 2.
- Scientific calculations and specialized tool calculations are intentionally inactive in Phase 1.
- Preference persistence is deferred until local persistence is introduced.

## Next phase
Phase 2 — Core Calculator
