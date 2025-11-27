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
              <Feather name="book-open" size={24} color="#89ABE3" />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <ThemedText style={styles.lessonCardTitle} bold>
                  {lesson.title}
                </ThemedText>
                <ThemedText style={styles.lessonCardDescription}>
                  {lesson.statement}
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
        <View style={{ paddingTop: 20 }}>
          <ThemedButton
            style={{
              backgroundColor: "#EA738D",
              marginHorizontal: "auto",
              minWidth: 192,
            }}
            title="Voltar!"
            onPress={() => navigator.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 48,
    color: "#89ABE3",
    textAlign: "center",
    marginVertical: 24,
  },
  description: {
    fontSize: 18,
    color: "#333333",
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
    color: "#89ABE3",
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
    borderColor: "#89ABE3",
    shadowColor: "#89ABE3",
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
    fontFamily: "ComicNeue_700Bold",
    color: "#333",
    marginBottom: 5,
  },
  lessonCardDescription: {
    fontSize: 16,
    fontFamily: "ComicNeue_400Regular",
    color: "#666",
  },
});
