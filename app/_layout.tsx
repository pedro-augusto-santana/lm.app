import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./login-screen";
import HomeNavigator from "./(app)/_layout";
const Stack = createNativeStackNavigator();
export default function RootLayout() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="app"
        component={HomeNavigator}
        options={{ headerBackVisible: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
