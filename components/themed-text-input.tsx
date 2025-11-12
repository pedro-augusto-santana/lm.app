import { StyleSheet, TextInput, TextInputProps } from "react-native";

const style = StyleSheet.create({
  default: {
    letterSpacing: -0.25,
    fontSize: 18,
    fontFamily: "Inter",
    lineHeight: 40,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e0e7ec',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    color: '#4a5568'
  }
});

interface ThemedTextInputProps extends TextInputProps {}
export default function ThemedTextInput(props: ThemedTextInputProps) {
  return <TextInput {...props} style={[style.default, props.style]} />;
}
