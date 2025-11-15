import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { useRoute } from "@react-navigation/native";

export default function AssignmentDetailsScreen() {
  const route = useRoute();
  const assignment = route.params?.assignment as any;
  const navigator = useNavigation();

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <ThemedText
          style={{
            letterSpacing: -0.5,
            paddingVertical: 24,
            fontSize: 24,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {assignment.title}
        </ThemedText>
        <Text
          style={{
            fontSize: 16,
            opacity: 0.5,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {assignment.description}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <ThemedText style={{ fontWeight: "600", fontSize: 18 }}>
            Lições:
          </ThemedText>
          {assignment.lessons.map((lesson: any) => (
            <View
              key={lesson.id}
              style={{
                backgroundColor: "#f9fafb",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {lesson.title}
              </Text>
              <Text style={{ fontSize: 14, opacity: 0.7 }}>
                {lesson.description}
              </Text>
            </View>
          ))}
        </View>

        <ThemedButton
          title="Começar!"
          onPress={() =>
            navigator.navigate("lesson-screen", { lessons: assignment.lessons })
          }
          brand
        />
      </View>
    </SafeAreaView>
  );
}
