import { useRef, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle
} from "react-native";

type AnimatedPressableProps = Omit<PressableProps, "style" | "children"> & {
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  children?:
    | ReactNode
    | ((state: PressableStateCallbackType) => ReactNode);
  pressedScale?: number;
};

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

export function AnimatedPressable({
  style,
  children,
  onPressIn,
  onPressOut,
  disabled,
  pressedScale = 0.96,
  ...props
}: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);
  const state = { pressed };

  const animateTo = (value: number, duration: number) => {
    Animated.timing(scale, {
      toValue: value,
      duration,
      easing: value < 1 ? Easing.out(Easing.quad) : Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  };

  return (
    <AnimatedPressableBase
      {...props}
      disabled={disabled}
      onPressIn={(event) => {
        if (!disabled) {
          setPressed(true);
          animateTo(pressedScale, 105);
        }
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        animateTo(1, 185);
        onPressOut?.(event);
      }}
      style={[
        typeof style === "function" ? style(state) : style,
        { transform: [{ scale }] }
      ]}
    >
      {typeof children === "function" ? children(state) : children}
    </AnimatedPressableBase>
  );
}
