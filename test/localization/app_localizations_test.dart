import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hesab_farsi/core/localization/app_localizations.dart';

void main() {
  test('Dari and Persian variants can differ without changing the language family', () {
    const dari = AppLocalizations(Locale('fa', 'AF'));
    const persian = AppLocalizations(Locale('fa', 'IR'));
    expect(dari.t('percentage'), 'فیصدی');
    expect(persian.t('percentage'), 'درصد');
  });
}
