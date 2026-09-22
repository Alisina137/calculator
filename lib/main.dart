import 'package:flutter/material.dart';

import 'app/app.dart';
import 'app/app_state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(CalculatorApp(state: AppState()));
}
