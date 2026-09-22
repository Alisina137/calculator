import 'package:flutter/material.dart';

import '../../../core/localization/app_localizations.dart';
import '../../../shared/widgets/tool_tile.dart';

class ToolsScreen extends StatelessWidget {
  const ToolsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return SafeArea(
      bottom: false,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(18, 16, 18, 120),
        children: [
          Text(l10n.t('tools'), style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          Text(l10n.t('everydayTools'), style: Theme.of(context).textTheme.bodyLarge),
          const SizedBox(height: 18),
          ToolTile(icon: Icons.percent_rounded, title: l10n.t('percentage'), subtitle: l10n.t('percentageDesc')),
          const SizedBox(height: 12),
          ToolTile(icon: Icons.sell_outlined, title: l10n.t('discount'), subtitle: l10n.t('discountDesc')),
          const SizedBox(height: 12),
          ToolTile(icon: Icons.swap_horiz_rounded, title: l10n.t('unitConverter'), subtitle: l10n.t('unitConverterDesc')),
          const SizedBox(height: 12),
          ToolTile(icon: Icons.cake_outlined, title: l10n.t('age'), subtitle: l10n.t('ageDesc')),
          const SizedBox(height: 12),
          ToolTile(icon: Icons.calendar_month_outlined, title: l10n.t('date'), subtitle: l10n.t('dateDesc')),
        ],
      ),
    );
  }
}
