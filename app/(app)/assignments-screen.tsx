import { useNavigation } from "expo-router";
import { Button } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssignmentsScreen() {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text>AssignmentsScreen</Text>
        <Button
          title="vai"
          onPress={function () {
            navigator.navigate("lesson", { lessonId: 123 });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
