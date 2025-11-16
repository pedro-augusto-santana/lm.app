import { useNavigation } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
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

export default function LessonScreen() {
  const route = useRoute();
  const lessons = route.params?.lessons as any[];

  const navigator = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const currentLesson = lessons[currentPage];

  useEffect(() => {
    if (currentLesson.lesson_type === "complete") {
      const { hints, word } = currentLesson.data;

      // Find the first non-hint input
      let firstEditableIndex = -1;
      for (let i = 0; i < word.length; i++) {
        if (!hints.includes(String(i))) {
          firstEditableIndex = i;
          break;
        }
      }

      if (firstEditableIndex !== -1 && inputRefs.current[firstEditableIndex]) {
        inputRefs.current[firstEditableIndex]?.focus();
      }
    }
  }, [currentLesson.id]);

  const handleWordChange = (text: string, index: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentLesson.id]: {
        ...(prevAnswers[currentLesson.id] || {}),
        [index]: text.toUpperCase(),
      },
    }));

    if (text.length > 0 && currentLesson.lesson_type === "complete") {
      const { word, hints } = currentLesson.data;

      // Find the next editable input
      let nextIndex = -1;
      for (let i = index + 1; i < word.length; i++) {
        if (!hints.includes(String(i))) {
          nextIndex = i;
          break;
        }
      }

      if (nextIndex !== -1 && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  const handleNext = () => {
    if (currentPage < lessons.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    navigator.goBack();
  };

  const renderLesson = () => {
    if (currentLesson.lesson_type === "complete") {
      const { word, hints } = currentLesson.data;
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
      const { options } = currentLesson.data;

      const handleOptionSelect = (option: string) => {
        const newAnswers = { ...answers };
        newAnswers[currentLesson.id] = option;
        setAnswers(newAnswers);
      };

      return (
        <View style={styles.lessonContent}>
          <ThemedText style={styles.statement}>
            {currentLesson.statement}
          </ThemedText>
          <View style={styles.optionsContainer}>
            {options.map((option: string, index: number) => {
              const isSelected = answers[currentLesson.id] === option;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionCard,
                    isSelected && styles.selectedOptionCard,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <ThemedText style={styles.optionText}>{option}</ThemedText>
                  {isSelected && (
                    <Feather name="check-circle" size={24} color="white" />
                  )}
                </TouchableOpacity>
              );
            })}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F5FE",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    color: "#005a9c",
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
    color: "#333",
    lineHeight: 36,
    flexShrink: 1,
  },
  lessonImage: {
    height: "50%",
    width: "auto",
    objectFit: "contain",
    aspectRatio: 1,
    marginRight: 15,
    borderRadius: 10,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  letterBox: {
    borderWidth: 3,
    borderColor: "#87aade",
    backgroundColor: "white",
    width: 60,
    height: 70,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#005a9c",
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
    shadowColor: "#005a9c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#b3e5fc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionCard: {
    backgroundColor: "#87aade",
    borderColor: "#005a9c",
  },
  optionText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
});
