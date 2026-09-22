# Persian/Dari Calculator

Flutter mobile calculator built from the approved Persian/Dari Calculator Product Specification.

## Current implementation

Phase 1 — Foundation and Persian-First Design System.

## One-time local setup

If this repository does not yet contain generated Flutter platform folders such as `android/` and `ios/`, run this once from the repository root:

```powershell
flutter create . --platforms=android,ios
flutter pub get
flutter analyze
flutter test
flutter run
```

The existing `lib/`, `test/`, and project configuration are the application source of truth. Review any Flutter-generated changes before committing them.

## Normal update workflow

After the initial setup, completed phases are published to the repository's `main` branch.

Update your local project with:

```powershell
git pull origin main
flutter pub get
```

Then run the app:

```powershell
flutter run
```

If a phase adds native configuration or dependencies, its handoff will state any additional command explicitly.
