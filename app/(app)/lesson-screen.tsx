import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useLessonFlow } from "@/hooks/use-lesson-flow";
import FeedbackModal from "@/components/feedback-modal";

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

export default function LessonScreen() {
  const route = useRoute();
  const lessons = route.params?.lessons as Lesson[];

  const {
    currentPage,
    currentLesson,
    answers,
    inputRefs,
    isFeedbackVisible,
    isCorrect,
    handleWordChange,
    handleOptionSelect,
    handleNext,
    handleModalClose,
  } = useLessonFlow(lessons);

  const renderLesson = () => {
    if (currentLesson.lesson_type === "complete") {
      const { word, hints } = currentLesson.data as CompleteData;
      const wordArray = word.split("");

      return (
        <View style={styles.lessonContent}>
          <View style={styles.imageAndStatementContainer}>
            {currentLesson.image && (
              <Image
                source={{ uri: currentLesson.image }}
                style={styles.lessonImage}
              />
            )}
            <ThemedText style={styles.statement}>
              {currentLesson.statement}
            </ThemedText>
          </View>
          <View style={styles.wordContainer}>
            {wordArray.map((char: string, index: number) => {
              const isHint = hints.includes(String(index));
              return (
                <TextInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={[styles.letterBox, isHint && styles.hintBox]}
                  value={
                    isHint
                      ? char
                      : (answers[currentLesson.id] &&
                          answers[currentLesson.id][index]) ||
                        ""
                  }
                  onChangeText={(text) => handleWordChange(text, index)}
                  maxLength={1}
                  editable={!isHint}
                  autoCapitalize="characters"
                />
              );
            })}
          </View>
        </View>
      );
    } else if (currentLesson.lesson_type === "quizz") {
      const { alternatives } = currentLesson.data as QuizzData;

      return (
        <View style={styles.lessonContent}>
          <ThemedText style={styles.statement}>
            {currentLesson.statement}
          </ThemedText>
          <View style={styles.optionsContainer}>
            {alternatives.map(
              (alternative: { id: number; text: string }, index: number) => {
                const isSelected = answers[currentLesson.id] === alternative.id;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionCard,
                      isSelected && styles.selectedOptionCard,
                    ]}
                    onPress={() => handleOptionSelect(alternative.id)}
                  >
                    <ThemedText style={styles.optionText}>
                      {alternative.text}
                    </ThemedText>
                    {isSelected && (
                      <Feather name="check-circle" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>
      );
    }
    return (
      <ThemedText style={{ fontFamily: "Inter" }}>
        Lesson type not supported yet
      </ThemedText>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <ThemedText style={styles.title} bold>
            {currentLesson.title}
          </ThemedText>
          {renderLesson()}
          <View style={styles.navigationButtons}>
            <ThemedButton
              title={
                currentPage === lessons.length - 1 ? "Finalizar" : "Próximo"
              }
              onPress={handleNext}
              brand
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <FeedbackModal
        isVisible={isFeedbackVisible}
        isCorrect={isCorrect}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    color: "#89ABE3",
    textAlign: "center",
    marginBottom: 20,
  },
  lessonContent: {
    flex: 1,
    justifyContent: "center",
  },
  imageAndStatementContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  statement: {
    fontSize: 28,
    color: "#333333",
    lineHeight: 36,
    flexShrink: 1,
    textAlign: "center",
  },
  lessonImage: {
    height: "50%",
    width: "auto",
    objectFit: "contain",
    aspectRatio: 1,
    marginRight: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  letterBox: {
    borderWidth: 3,
    borderColor: "#89ABE3",
    backgroundColor: "white",
    width: 60,
    height: 70,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#89ABE3",
    margin: 8,
    borderRadius: 15,
  },
  hintBox: {
    backgroundColor: "#d1e3f8",
    color: "#555",
  },
  navigationButtons: {
    paddingVertical: 10,
  },
  optionsContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  optionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#89ABE3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#89ABE3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionCard: {
    backgroundColor: "#7AC142",
    borderColor: "#7AC142",
  },
  optionText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
});
