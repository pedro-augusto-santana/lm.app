import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonScreen({ route }: any) {
  const { lessons } = route.props;

  return (
    <SafeAreaView>
      <View>
        <Text>Lição</Text>
        <Text>{JSON.stringify(lessons) ?? 'nope'}</Text>
      </View>
    </SafeAreaView>
  );
}
