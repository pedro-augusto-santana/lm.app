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
    backgroundColor: "#89ABE3",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "ComicNeue_700Bold",
    letterSpacing: -0.25,
    fontSize: 22,
    color: "white",
  },
});

export default function ThemedButton(props: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={[style.default, props.style]}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      <Text style={[style.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}
