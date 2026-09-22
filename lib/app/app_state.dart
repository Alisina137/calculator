import 'package:flutter/material.dart';

enum AppLanguage { persian, dari }

enum NumeralStyle { persian, latin }

class AppState extends ChangeNotifier {
  AppLanguage _language = AppLanguage.dari;
  NumeralStyle _numeralStyle = NumeralStyle.persian;
  ThemeMode _themeMode = ThemeMode.system;
  bool _hapticsEnabled = true;

  AppLanguage get language => _language;
  NumeralStyle get numeralStyle => _numeralStyle;
  ThemeMode get themeMode => _themeMode;
  bool get hapticsEnabled => _hapticsEnabled;

  Locale get locale => switch (_language) {
        AppLanguage.persian => const Locale('fa', 'IR'),
        AppLanguage.dari => const Locale('fa', 'AF'),
      };

  void setLanguage(AppLanguage value) {
    if (_language == value) return;
    _language = value;
    notifyListeners();
  }

  void setNumeralStyle(NumeralStyle value) {
    if (_numeralStyle == value) return;
    _numeralStyle = value;
    notifyListeners();
  }

  void setThemeMode(ThemeMode value) {
    if (_themeMode == value) return;
    _themeMode = value;
    notifyListeners();
  }

  void setHapticsEnabled(bool value) {
    if (_hapticsEnabled == value) return;
    _hapticsEnabled = value;
    notifyListeners();
  }
}
