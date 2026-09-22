import 'package:flutter/material.dart';

import '../core/localization/app_localizations.dart';
import '../features/calculator/presentation/calculator_screen.dart';
import '../features/history/presentation/history_screen.dart';
import '../features/settings/presentation/settings_screen.dart';
import '../features/tools/presentation/tools_screen.dart';
import 'app_state.dart';

class AppShell extends StatefulWidget {
  const AppShell({required this.state, super.key});
  final AppState state;

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final pages = [
      CalculatorScreen(state: widget.state),
      const ToolsScreen(),
      const HistoryScreen(),
    ];

    return Scaffold(
      appBar: _index == 0
          ? null
          : AppBar(
              toolbarHeight: 56,
              automaticallyImplyLeading: false,
              actions: [
                IconButton(
                  tooltip: l10n.t('settings'),
                  onPressed: _openSettings,
                  icon: const Icon(Icons.settings_outlined),
                ),
                const SizedBox(width: 8),
              ],
            ),
      body: IndexedStack(index: _index, children: pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (value) => setState(() => _index = value),
        destinations: [
          NavigationDestination(icon: const Icon(Icons.calculate_outlined), selectedIcon: const Icon(Icons.calculate), label: l10n.t('calculator')),
          NavigationDestination(icon: const Icon(Icons.grid_view_outlined), selectedIcon: const Icon(Icons.grid_view_rounded), label: l10n.t('tools')),
          NavigationDestination(icon: const Icon(Icons.history_outlined), selectedIcon: const Icon(Icons.history_rounded), label: l10n.t('history')),
        ],
      ),
      floatingActionButton: _index == 0
          ? FloatingActionButton.small(
              tooltip: l10n.t('settings'),
              onPressed: _openSettings,
              child: const Icon(Icons.settings_outlined),
            )
          : null,
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
    );
  }

  void _openSettings() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => SettingsScreen(state: widget.state)),
    );
  }
}
