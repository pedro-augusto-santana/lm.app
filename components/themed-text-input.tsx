import { StyleSheet, TextInput, TextInputProps } from "react-native";

const style = StyleSheet.create({
  default: {
    letterSpacing: -0.25,
    fontSize: 18,
    fontFamily: "ComicNeue_400Regular",
    lineHeight: 24,
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#89ABE3',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: '#333333'
  }
});

interface ThemedTextInputProps extends TextInputProps {}
export default function ThemedTextInput(props: ThemedTextInputProps) {
  return <TextInput {...props} style={[style.default, props.style]} />;
}
