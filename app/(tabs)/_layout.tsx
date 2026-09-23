import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

type TabVisual = {
  label: string;
  icon: {
    ios: string;
    android: string;
    web: string;
  };
};

function AnimatedNavItem({
  active,
  visual,
  activeColor,
  inactiveColor,
  activeBackground,
  pressedBackground,
  onPress,
  onLongPress
}: {
  active: boolean;
  visual: TabVisual;
  activeColor: string;
  inactiveColor: string;
  activeBackground: string;
  pressedBackground: string;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const press = useRef(new Animated.Value(0)).current;

  const animateTo = (value: 0 | 1) => {
    Animated.timing(press, {
      toValue: value,
      duration: value === 1 ? 55 : 110,
      easing: value === 1 ? Easing.out(Easing.quad) : Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  };

  const contentScale = press.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.94]
  });

  const contentTranslateY = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const pressHighlightOpacity = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const pressHighlightScale = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1]
  });

  const color = active ? activeColor : inactiveColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={visual.label}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => animateTo(1)}
      onPressOut={() => animateTo(0)}
      style={styles.tabButton}
    >
      {active ? (
        <View
          pointerEvents="none"
          style={[styles.activePill, { backgroundColor: activeBackground }]}
        />
      ) : null}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.pressPill,
          {
            backgroundColor: pressedBackground,
            opacity: pressHighlightOpacity,
            transform: [{ scale: pressHighlightScale }]
          }
        ]}
      />

      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [
              { scale: contentScale },
              { translateY: contentTranslateY }
            ]
          }
        ]}
      >
        <SymbolView
          name={visual.icon}
          size={active ? 25 : 23}
          tintColor={color}
        />
        <Text style={[styles.tabLabel, { color }]}>
          {visual.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function AnimatedTabBar({ state, navigation }: any) {
  const { language, resolvedTheme } = useAppPreferences();
  const { scientificMode } = useCalculator();
  const insets = useSafeAreaInsets();
  const colors = colorsFor(resolvedTheme);

  if (scientificMode) return null;

  const visuals: Record<string, TabVisual> = {
    index: {
      label: t(language, "calculator"),
      icon: {
        ios: "plus.forwardslash.minus",
        android: "calculate",
        web: "calculate"
      }
    },
    tools: {
      label: t(language, "tools"),
      icon: {
        ios: "wrench.and.screwdriver",
        android: "construction",
        web: "construction"
      }
    },
    history: {
      label: t(language, "history"),
      icon: {
        ios: "clock.arrow.circlepath",
        android: "history",
        web: "history"
      }
    }
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64 + Math.max(insets.bottom, 10),
          paddingBottom: Math.max(insets.bottom, 10),
          paddingLeft: Math.max(insets.left, 8),
          paddingRight: Math.max(insets.right, 8)
        }
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const active = state.index === index;
        const visual = visuals[route.name];
        if (!visual) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!active && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <AnimatedNavItem
            key={route.key}
            active={active}
            visual={visual}
            activeColor={colors.primary}
            inactiveColor={colors.muted}
            activeBackground={colors.primarySoft}
            pressedBackground={colors.primarySoft}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tools" />
      <Tabs.Screen name="history" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 7,
    gap: 4
  },
  tabButton: {
    flex: 1,
    minHeight: 48,
    marginHorizontal: 2,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  activePill: {
    position: "absolute",
    left: 7,
    right: 7,
    top: 2,
    bottom: 2,
    borderRadius: 16
  },
  pressPill: {
    position: "absolute",
    left: 7,
    right: 7,
    top: 2,
    bottom: 2,
    borderRadius: 16
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    writingDirection: "rtl"
  }
});
