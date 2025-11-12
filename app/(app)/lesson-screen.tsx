import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonScreen(props: any) {
  return (
    <SafeAreaView>
      <View>
        <Text>AssignmentsScreen</Text>
        <Text>{props.lessonId ?? "nope"}</Text>
      </View>
    </SafeAreaView>
  );
}
