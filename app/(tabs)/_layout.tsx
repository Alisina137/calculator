import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useRef, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useCalculator } from "@/context/CalculatorContext";
import { t } from "@/i18n/translations";
import { colorsFor } from "@/theme/colors";

function AnimatedTabButton({
  children,
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
  primaryColor
}: {
  children: ReactNode;
  onPress?: (event: any) => void;
  onLongPress?: (event: any) => void;
  accessibilityState?: any;
  accessibilityLabel?: string;
  testID?: string;
  primaryColor: string;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(80);

  const runAnimation = () => {
    progress.stopAnimation();
    progress.setValue(0);

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
    ]).start();
  };

  const scale = progress.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [1, Math.max(width / 20, 1), Math.max(width / 20, 1)]
  });

  const rippleOpacity = progress.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 1, 0]
  });

  const contentOpacity = progress.interpolate({
    inputRange: [0, 0.12, 0.76, 1],
    outputRange: [1, 0, 0, 1]
  });

  const whiteContentOpacity = progress.interpolate({
    inputRange: [0, 0.12, 0.76, 1],
    outputRange: [0, 1, 1, 0]
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onLongPress={onLongPress}
      onPress={(event) => {
        runAnimation();
        onPress?.(event);
      }}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.tabButton}
    >
      <View style={styles.animationClip}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ripple,
            {
              backgroundColor: primaryColor,
              opacity: rippleOpacity,
              transform: [{ scale }]
            }
          ]}
        />
      </View>

      <Animated.View style={[styles.tabContent, { opacity: contentOpacity }]}>
        {children}
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[styles.whiteFlash, { opacity: whiteContentOpacity }]}
      />
    </Pressable>
  );
}

export default function TabsLayout() {
  const { language, resolvedTheme } = useAppPreferences();
  const { scientificMode } = useCalculator();
  const insets = useSafeAreaInsets();
  const colors = colorsFor(resolvedTheme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarButton: (props) => (
          <AnimatedTabButton
            {...props}
            primaryColor={colors.primary}
          />
        ),
        tabBarStyle: scientificMode
          ? { display: "none" }
          : {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              height: 62 + Math.max(insets.bottom, 10),
              paddingBottom: Math.max(insets.bottom, 10),
              paddingTop: 8,
              paddingLeft: Math.max(insets.left, 8),
              paddingRight: Math.max(insets.right, 8)
            },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          writingDirection: "rtl"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t(language, "calculator"),
          tabBarIcon: ({ focused, color }) => (
            <SymbolView
              name={{
                ios: "plus.forwardslash.minus",
                android: "calculate",
                web: "calculate"
              }}
              size={focused ? 25 : 23}
              tintColor={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="tools"
        options={{
          title: t(language, "tools"),
          tabBarIcon: ({ focused, color }) => (
            <SymbolView
              name={{
                ios: "wrench.and.screwdriver",
                android: "construction",
                web: "construction"
              }}
              size={focused ? 25 : 23}
              tintColor={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: t(language, "history"),
          tabBarIcon: ({ focused, color }) => (
            <SymbolView
              name={{
                ios: "clock.arrow.circlepath",
                android: "history",
                web: "history"
              }}
              size={focused ? 25 : 23}
              tintColor={color}
            />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  animationClip: {
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
    justifyContent: "center"
  },
  whiteFlash: {
    ...StyleSheet.absoluteFillObject
  }
});
