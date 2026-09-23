import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
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
  primaryColor,
  onPress,
  onLongPress
}: {
  active: boolean;
  visual: TabVisual;
  activeColor: string;
  inactiveColor: string;
  primaryColor: string;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(90);
  const [animating, setAnimating] = useState(false);

  const runAnimation = () => {
    progress.stopAnimation();
    progress.setValue(0);
    setAnimating(true);

    Animated.sequence([
      Animated.timing(progress, {
        toValue: 0.72,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start(() => {
      setAnimating(false);
      progress.setValue(0);
    });
  };

  const scale = progress.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [1, Math.max(width / 20, 1), Math.max(width / 20, 1)]
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.08, 0.72, 1],
    outputRange: [0, 1, 1, 0]
  });

  const normalColor = active ? activeColor : inactiveColor;
  const contentColor = animating ? "#FFFFFF" : normalColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={visual.label}
      onPress={() => {
        runAnimation();
        onPress();
      }}
      onLongPress={onLongPress}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabButton}
    >
      <View pointerEvents="none" style={styles.rippleClip}>
        <Animated.View
          style={[
            styles.ripple,
            {
              backgroundColor: primaryColor,
              opacity,
              transform: [{ scale }]
            }
          ]}
        />
      </View>

      <View style={styles.tabContent}>
        <SymbolView
          name={visual.icon}
          size={active ? 25 : 23}
          tintColor={contentColor}
        />
        <Text style={[styles.tabLabel, { color: contentColor }]}>
          {visual.label}
        </Text>
      </View>
    </Pressable>
  );
}

function AnimatedTabBar({ state, descriptors, navigation }: any) {
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
          height: 62 + Math.max(insets.bottom, 10),
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
            primaryColor={colors.primary}
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
      screenOptions={{
        headerShown: false
      }}
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
    paddingTop: 8
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  rippleClip: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  ripple: {
    width: 20,
    height: 20,
    borderRadius: 10
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
