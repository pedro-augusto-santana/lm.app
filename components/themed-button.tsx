import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ThemedButtonProps = TouchableOpacityProps & {
  onPress: Function;
  title: string;
  brand?: boolean;
};

const style = StyleSheet.create({
  default: {
    backgroundColor: "#87aade",
    color: "white",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 15,
    fontWeight: "600",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "ComicNeue_700Bold",
    letterSpacing: -0.25,
    fontSize: 20,
    color: "white",
  },
});

export default function ThemedButton(props: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={style.default} // Apply the container style
      onPress={props.onPress}
      activeOpacity={0.7} // Optional: Adjust the feedback when pressed
    >
      <Text style={[style.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}
