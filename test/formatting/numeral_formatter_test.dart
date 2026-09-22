import 'package:flutter_test/flutter_test.dart';
import 'package:hesab_farsi/app/app_state.dart';
import 'package:hesab_farsi/core/formatting/numeral_formatter.dart';

void main() {
  group('NumeralFormatter', () {
    test('normalizes Persian, Arabic-Indic and Latin digits', () {
      expect(NumeralFormatter.normalizeDigits('۱۲3٤٥'), '12345');
    });

    test('renders Persian digits', () {
      expect(NumeralFormatter.displayDigits('12,500.4', NumeralStyle.persian), '۱۲,۵۰۰.۴');
    });

    test('renders Latin digits from Persian input', () {
      expect(NumeralFormatter.displayDigits('۱۲۵۰۰', NumeralStyle.latin), '12500');
    });
  });
}
