import { StyleSheet, Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  bold?: boolean;
}

export default function ThemedText(props: ThemedTextProps) {
  const fontFamily = props.bold ? "ComicNeue_700Bold" : "ComicNeue_400Regular";
  return <Text {...props} style={[{ fontFamily }, props.style]} />;
}
