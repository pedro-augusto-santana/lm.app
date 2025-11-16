import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function AssignmentDetailsScreen() {
  const route = useRoute();
  const assignment = route.params?.assignment as any;
  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title} bold>
          {assignment.title}
        </ThemedText>
        <ThemedText style={styles.description}>
          {assignment.description}
        </ThemedText>

        <View style={styles.lessonsContainer}>
          <ThemedText style={styles.lessonsTitle} bold>
            Lições:
          </ThemedText>
          {assignment.lessons.map((lesson: any) => (
            <View key={lesson.id} style={styles.lessonCard}>
              <Feather name="book-open" size={24} color="#87aade" />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <ThemedText style={styles.lessonCardTitle} bold>
                  {lesson.title}
                </ThemedText>
                <ThemedText style={styles.lessonCardDescription}>
                  {lesson.description}
                </ThemedText>
              </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F5FE",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 48,
    color: "#005a9c",
    textAlign: "center",
    marginVertical: 24,
  },
  description: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  lessonsContainer: {
    marginBottom: 30,
    flex: 1,
  },
  lessonsTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#005a9c",
    marginBottom: 20,
  },
  lessonCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#b3e5fc",
    shadowColor: "#005a9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  lessonCardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  lessonCardDescription: {
    fontSize: 16,
    color: "#666",
  },
});
