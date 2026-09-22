import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';

class AppLocalizations {
  const AppLocalizations(this.locale);

  final Locale locale;

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  bool get isDari => locale.countryCode == 'AF';

  String t(String key) => (isDari ? _dari : _persian)[key] ?? _persian[key] ?? key;

  static const Map<String, String> _persian = {
    'appName': 'حساب فارسی',
    'calculator': 'ماشین حساب',
    'tools': 'ابزارها',
    'history': 'تاریخچه',
    'settings': 'تنظیمات',
    'scientific': 'علمی',
    'basicMode': 'ساده',
    'historyEmptyTitle': 'هنوز محاسبه‌ای ذخیره نشده',
    'historyEmptyBody': 'پس از نهایی کردن محاسبه‌ها، آن‌ها اینجا نمایش داده می‌شوند.',
    'everydayTools': 'ابزارهای روزمره',
    'percentage': 'درصد',
    'percentageDesc': 'درصد یک عدد، افزایش و کاهش درصدی',
    'discount': 'تخفیف',
    'discountDesc': 'قیمت نهایی و میزان صرفه‌جویی',
    'unitConverter': 'تبدیل واحد',
    'unitConverterDesc': 'طول، وزن، دما و واحدهای پرکاربرد',
    'age': 'محاسبه سن',
    'ageDesc': 'سن دقیق با تاریخ شمسی یا میلادی',
    'date': 'محاسبه تاریخ',
    'dateDesc': 'فاصله بین تاریخ‌ها و افزودن یا کم کردن زمان',
    'appearance': 'ظاهر',
    'language': 'زبان',
    'numerals': 'نوع اعداد',
    'haptics': 'بازخورد لمسی',
    'system': 'سیستم',
    'light': 'روشن',
    'dark': 'تیره',
    'persian': 'فارسی',
    'dari': 'دری',
    'persianDigits': 'اعداد فارسی ۱۲۳',
    'latinDigits': 'اعداد لاتین 123',
    'on': 'روشن',
    'off': 'خاموش',
    'about': 'درباره برنامه',
    'aboutBody': 'یک ابزار سریع، ساده و فارسی/دری برای محاسبات روزمره.',
    'privacy': 'حریم خصوصی',
    'privacyBody': 'محاسبات اصلی روی دستگاه انجام می‌شوند و برای استفاده عادی حساب کاربری لازم نیست.',
    'calculatorHint': 'عبارت شما',
  };

  static const Map<String, String> _dari = {
    'appName': 'حساب دری',
    'calculator': 'ماشین حساب',
    'tools': 'ابزارها',
    'history': 'تاریخچه',
    'settings': 'تنظیمات',
    'scientific': 'علمی',
    'basicMode': 'ساده',
    'historyEmptyTitle': 'هنوز محاسبه‌ای ذخیره نشده',
    'historyEmptyBody': 'پس از نهایی‌کردن محاسبه‌ها، آن‌ها در این بخش نشان داده می‌شوند.',
    'everydayTools': 'ابزارهای روزمره',
    'percentage': 'فیصدی',
    'percentageDesc': 'فیصدی یک عدد، افزایش و کاهش فیصدی',
    'discount': 'تخفیف',
    'discountDesc': 'قیمت نهایی و مقدار صرفه‌جویی',
    'unitConverter': 'تبدیل واحد',
    'unitConverterDesc': 'طول، وزن، دما و واحدهای پرکاربرد',
    'age': 'محاسبه سن',
    'ageDesc': 'سن دقیق با تاریخ هجری شمسی یا میلادی',
    'date': 'محاسبه تاریخ',
    'dateDesc': 'فاصله میان تاریخ‌ها و افزودن یا کم‌کردن زمان',
    'appearance': 'نمایش',
    'language': 'زبان',
    'numerals': 'نوع اعداد',
    'haptics': 'بازخورد لمسی',
    'system': 'سیستم',
    'light': 'روشن',
    'dark': 'تیره',
    'persian': 'فارسی',
    'dari': 'دری',
    'persianDigits': 'اعداد فارسی ۱۲۳',
    'latinDigits': 'اعداد لاتین 123',
    'on': 'روشن',
    'off': 'خاموش',
    'about': 'درباره برنامه',
    'aboutBody': 'یک ابزار سریع، ساده و فارسی/دری برای محاسبات روزمره.',
    'privacy': 'محرمیت',
    'privacyBody': 'محاسبات اصلی در دستگاه انجام می‌شوند و برای استفاده عادی حساب کاربری لازم نیست.',
    'calculatorHint': 'عبارت شما',
  };
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => locale.languageCode == 'fa';

  @override
  Future<AppLocalizations> load(Locale locale) =>
      SynchronousFuture(AppLocalizations(locale));

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}
