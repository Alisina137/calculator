import '../../app/app_state.dart';

class NumeralFormatter {
  const NumeralFormatter._();

  static const _latin = '0123456789';
  static const _persian = '۰۱۲۳۴۵۶۷۸۹';
  static const _arabicIndic = '٠١٢٣٤٥٦٧٨٩';

  static String normalizeDigits(String input) {
    final buffer = StringBuffer();
    for (final rune in input.runes) {
      final character = String.fromCharCode(rune);
      final persianIndex = _persian.indexOf(character);
      if (persianIndex >= 0) {
        buffer.write(_latin[persianIndex]);
        continue;
      }
      final arabicIndex = _arabicIndic.indexOf(character);
      if (arabicIndex >= 0) {
        buffer.write(_latin[arabicIndex]);
        continue;
      }
      buffer.write(character);
    }
    return buffer.toString();
  }

  static String displayDigits(String input, NumeralStyle style) {
    final normalized = normalizeDigits(input);
    if (style == NumeralStyle.latin) return normalized;

    final buffer = StringBuffer();
    for (final rune in normalized.runes) {
      final character = String.fromCharCode(rune);
      final index = _latin.indexOf(character);
      buffer.write(index >= 0 ? _persian[index] : character);
    }
    return buffer.toString();
  }
}
