import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssignmentsScreen from "./assignments-screen";
import LessonScreen from "./lesson-screen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="assignments"
        component={AssignmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="lesson" component={LessonScreen} />
    </Stack.Navigator>
  );
}
