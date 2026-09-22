import 'package:flutter/material.dart';

import '../../../app/app_state.dart';
import '../../../core/formatting/numeral_formatter.dart';
import '../../../core/localization/app_localizations.dart';

class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({required this.state, super.key});

  final AppState state;

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  String _expression = '';

  void _append(String token) {
    setState(() => _expression += token);
  }

  void _backspace() {
    if (_expression.isEmpty) return;
    setState(() => _expression = _expression.substring(0, _expression.length - 1));
  }

  void _clear() => setState(() => _expression = '');

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final style = widget.state.numeralStyle;
    final display = _expression.isEmpty
        ? NumeralFormatter.displayDigits('0', style)
        : NumeralFormatter.displayDigits(_expression, style);

    return SafeArea(
      bottom: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 12, 18, 8),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    l10n.t('calculator'),
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
                  ),
                ),
                IconButton(
                  tooltip: l10n.t('scientific'),
                  onPressed: null,
                  icon: const Icon(Icons.science_outlined),
                ),
              ],
            ),
            Expanded(
              child: Align(
                alignment: Alignment.bottomLeft,
                child: SingleChildScrollView(
                  reverse: true,
                  scrollDirection: Axis.horizontal,
                  child: Semantics(
                    liveRegion: true,
                    label: l10n.t('calculatorHint'),
                    child: Text(
                      display,
                      textDirection: TextDirection.ltr,
                      style: Theme.of(context).textTheme.displayMedium?.copyWith(fontWeight: FontWeight.w500),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            _Keypad(
              numeralStyle: style,
              onToken: _append,
              onBackspace: _backspace,
              onClear: _clear,
            ),
          ],
        ),
      ),
    );
  }
}

class _Keypad extends StatelessWidget {
  const _Keypad({
    required this.numeralStyle,
    required this.onToken,
    required this.onBackspace,
    required this.onClear,
  });

  final NumeralStyle numeralStyle;
  final ValueChanged<String> onToken;
  final VoidCallback onBackspace;
  final VoidCallback onClear;

  @override
  Widget build(BuildContext context) {
    const rows = [
      ['AC', '⌫', '%', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '−'],
      ['1', '2', '3', '+'],
      ['±', '0', '.', '='],
    ];

    return Column(
      children: [
        for (final row in rows)
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Row(
              children: [
                for (final key in row)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 5),
                      child: _KeyButton(
                        label: RegExp(r'^\d$').hasMatch(key)
                            ? NumeralFormatter.displayDigits(key, numeralStyle)
                            : key,
                        emphasized: key == '=',
                        enabled: key != '=' && key != '±' && key != '%',
                        onPressed: () {
                          if (key == 'AC') {
                            onClear();
                          } else if (key == '⌫') {
                            onBackspace();
                          } else {
                            onToken(key);
                          }
                        },
                      ),
                    ),
                  ),
              ],
            ),
          ),
      ],
    );
  }
}

class _KeyButton extends StatelessWidget {
  const _KeyButton({
    required this.label,
    required this.onPressed,
    required this.enabled,
    this.emphasized = false,
  });

  final String label;
  final VoidCallback onPressed;
  final bool enabled;
  final bool emphasized;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return SizedBox(
      height: 58,
      child: FilledButton(
        onPressed: enabled ? onPressed : null,
        style: FilledButton.styleFrom(
          backgroundColor: emphasized ? scheme.primary : scheme.surfaceContainerHighest,
          foregroundColor: emphasized ? scheme.onPrimary : scheme.onSurface,
          disabledBackgroundColor: emphasized ? scheme.primary.withValues(alpha: 0.55) : scheme.surfaceContainerHighest,
          disabledForegroundColor: emphasized ? scheme.onPrimary.withValues(alpha: 0.8) : scheme.onSurfaceVariant,
        ),
        child: Text(label, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w600)),
      ),
    );
  }
}
