import 'package:flutter/material.dart';

import '../../../app/app_state.dart';
import '../../../core/localization/app_localizations.dart';
import '../../../shared/widgets/app_section_card.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({required this.state, super.key});

  final AppState state;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(l10n.t('settings'))),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(18, 8, 18, 36),
        children: [
          AppSectionCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _SectionTitle(l10n.t('language')),
                const SizedBox(height: 12),
                SegmentedButton<AppLanguage>(
                  segments: [
                    ButtonSegment(value: AppLanguage.dari, label: Text(l10n.t('dari'))),
                    ButtonSegment(value: AppLanguage.persian, label: Text(l10n.t('persian'))),
                  ],
                  selected: {state.language},
                  onSelectionChanged: (value) => state.setLanguage(value.first),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          AppSectionCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _SectionTitle(l10n.t('numerals')),
                const SizedBox(height: 12),
                SegmentedButton<NumeralStyle>(
                  segments: [
                    ButtonSegment(value: NumeralStyle.persian, label: Text(l10n.t('persianDigits'))),
                    ButtonSegment(value: NumeralStyle.latin, label: Text(l10n.t('latinDigits'))),
                  ],
                  selected: {state.numeralStyle},
                  onSelectionChanged: (value) => state.setNumeralStyle(value.first),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          AppSectionCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _SectionTitle(l10n.t('appearance')),
                const SizedBox(height: 12),
                SegmentedButton<ThemeMode>(
                  segments: [
                    ButtonSegment(value: ThemeMode.system, label: Text(l10n.t('system'))),
                    ButtonSegment(value: ThemeMode.light, label: Text(l10n.t('light'))),
                    ButtonSegment(value: ThemeMode.dark, label: Text(l10n.t('dark'))),
                  ],
                  selected: {state.themeMode},
                  onSelectionChanged: (value) => state.setThemeMode(value.first),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          AppSectionCard(
            child: SwitchListTile.adaptive(
              contentPadding: EdgeInsets.zero,
              value: state.hapticsEnabled,
              onChanged: state.setHapticsEnabled,
              title: Text(l10n.t('haptics')),
            ),
          ),
          const SizedBox(height: 14),
          AppSectionCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _SectionTitle(l10n.t('privacy')),
                const SizedBox(height: 8),
                Text(l10n.t('privacyBody')),
                const SizedBox(height: 18),
                _SectionTitle(l10n.t('about')),
                const SizedBox(height: 8),
                Text(l10n.t('aboutBody')),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Text(
        text,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
      );
}
