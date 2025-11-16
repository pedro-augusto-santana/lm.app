import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./login-screen";
import HomeNavigator from "./(app)/_layout";
import { useFonts, ComicNeue_400Regular, ComicNeue_700Bold } from "@expo-google-fonts/comic-neue";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ComicNeue_400Regular,
    ComicNeue_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
