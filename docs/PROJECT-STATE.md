# Project State

## Product objective
Fast, free, Persian/Dari-first mobile calculator for everyday calculations.

## Product specification
Authoritative Product Specification supplied 2026-09-22.

## Technology stack
- Flutter / Dart
- Material 3
- Native Flutter localization delegates
- Local-only architecture for MVP
- No backend / authentication / billing

## Current phase
Phase 1 — Foundation and Persian-First Design System

## Completed outcomes
- RTL-first application shell
- Three-destination bottom navigation
- Persian (fa-IR) and Dari (fa-AF) variants
- Persian/Latin numeral conversion utility
- Light/dark/system theme controls
- Haptics preference foundation
- Reusable section/tool controls
- Calculator, Tools, History, Settings production-facing shells
- Phase 1 unit tests authored

## Verification status
Implemented; runtime verification pending because Flutter/Dart SDK is unavailable in the execution environment used to produce this package.

## Known limitations
- Calculator evaluation is intentionally excluded from Phase 1 and begins in Phase 2.
- Scientific mode and specialized tool calculations are intentionally not active yet.
- Settings persistence is not yet wired to local storage; persistence/state restoration is completed with later persistence phases.

## Next phase
Phase 2 — Core Calculator
