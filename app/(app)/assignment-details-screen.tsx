import { useNavigation } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

interface Alternative {
  id: number;
  text: string;
}

interface QuizzData {
  question: string;
  alternatives: Alternative[];
  answer: string;
}

interface CompleteData {
  word: string;
  hints: string[];
}

interface Lesson {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  title: string;
  tags: string;
  description: string;
  statement: string;
  lesson_type: "complete" | "quizz";
  image: string | null;
  data: QuizzData | CompleteData;
  author: number;
}

interface Assignment {
  id: number;
  created_at: string;
  updated_at: string;
  assignment_id: number;
  user_id: number;
  status: "pending" | "open" | "finished";
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function AssignmentDetailsScreen() {
  const route = useRoute();
  const assignment = route.params?.assignment as Assignment;
  const status = route.params?.status ?? "pending";
  const navigator = useNavigation();

  function mapStatus(status: string) {
    const map: any = {
      pending: "Nova",
      open: "Fazendo",
      finished: "Feita",
    };
    return map[status] ?? "N/A";
  }

  function mapLabelStyle(status: string): {
    color: string;
    icon: keyof typeof Feather.glyphMap;
  } {
    const map: any = {
      pending: { color: "#7AC142", icon: "gift" },
      open: { color: "#FFD700", icon: "edit-3" },
      finished: { color: "#EA738D", icon: "check-circle" },
    };
    return map[status] ?? { color: "#ccc", icon: "alert-circle" };
  }

  const getLessonAnswer = (lesson: Lesson) => {
    if (lesson.lesson_type === "complete") {
      return (lesson.data as CompleteData).word;
    } else if (lesson.lesson_type === "quizz") {
      const quizzData = lesson.data as QuizzData;
      const correctAnswerId = quizzData.answer;
      const correctAnswer = quizzData.alternatives.find(
        (alt) => String(alt.id) === correctAnswerId,
      );
      return correctAnswer ? correctAnswer.text : "N/A";
    }
    return "N/A";
  };

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
          <View style={styles.cardHeader}>
            <ThemedText style={styles.lessonsTitle} bold>
              Lições:
            </ThemedText>
            {status && (
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: mapLabelStyle(status).color,
                  },
                ]}
              >
                <Feather
                  name={mapLabelStyle(status).icon}
                  size={16}
                  color="white"
                />
                <ThemedText style={styles.statusText}>
                  {mapStatus(status)}
                </ThemedText>
              </View>
            )}
          </View>
          {assignment.lessons.map((lesson: Lesson) => (
            <View key={lesson.id} style={styles.lessonCard}>
              <Feather name="book-open" size={24} color="#89ABE3" />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <ThemedText style={styles.lessonCardTitle} bold>
                  {lesson.title}
                </ThemedText>
                <ThemedText style={styles.lessonCardDescription}>
                  {lesson.statement}
                </ThemedText>
                {status == "finished" && (
                  <ThemedText style={styles.answerText}>
                    RESPOSTA: {getLessonAnswer(lesson)}
                  </ThemedText>
                )}
              </View>
            </View>
          ))}
        </View>

        <ThemedButton
          title={status == "pending" ? "Começar!" : "Você já fez essa tarefinha"}
          onPress={() => {
            // Alert.alert("teste", status);
            if (status !== "pending") return;
            return navigator.navigate("lesson-screen", {
              lessons: assignment.lessons,
            })
          }
          }
          disabled={status !== "pending"}
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
  answerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7AC142",
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    color: "white",
    fontFamily: "ComicNeue_700Bold",
    fontSize: 16,
  },
});
