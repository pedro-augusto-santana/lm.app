import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssignmentsScreen from "./assignments-screen";
import LessonScreen from "./lesson-screen";
import AssignmentDetailsScreen from "./assignment-details-screen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="assignments-screen"
        component={AssignmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="assignment-details-screen"
        component={AssignmentDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="lesson-screen"
        component={LessonScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
