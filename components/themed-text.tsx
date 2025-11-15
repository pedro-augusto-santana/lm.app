import { StyleSheet, Text, TextProps } from "react-native";

const style = StyleSheet.create({
  default: {
    fontFamily: "Margarine",
  },
});

interface ThemedTextProps extends TextProps {}
export default function ThemedText(props: ThemedTextProps) {
  return <Text {...props} style={[props.style]} />;
}
