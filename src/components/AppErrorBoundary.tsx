import { Component, type ErrorInfo, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Do not expose stack traces or calculation contents to the user.
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={styles.page}>
        <Text style={styles.title}>مشکلی پیش آمد</Text>
        <Text style={styles.body}>
          برنامه نتوانست این بخش را نمایش دهد. دوباره تلاش کنید.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="تلاش دوباره"
          onPress={this.retry}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null
          ]}
        >
          <Text style={styles.buttonText}>تلاش دوباره</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F6F9"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    writingDirection: "rtl",
    color: "#2E6683"
  },
  body: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    writingDirection: "rtl",
    color: "#6F8794"
  },
  button: {
    marginTop: 20,
    minHeight: 48,
    minWidth: 140,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#789C49"
  },
  buttonPressed: {
    backgroundColor: "#668A3B"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    writingDirection: "rtl"
  }
});
