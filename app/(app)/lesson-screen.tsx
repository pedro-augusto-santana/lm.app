import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import {useRoute} from "@react-navigation/native";

// Mock data for a quizz lesson, as api-source.txt doesn't contain one.
const mockQuizzLesson = {
    id: 4,
    created_at: null,
    updated_at: null,
    title: "Quiz de Cores",
    tags: "Cores,Quiz",
    description: "Um quiz sobre cores.",
    statement: "Qual a cor do céu?",
    lesson_type: "quizz",
    image: null,
    data: {
      options: ["Azul", "Verde", "Vermelho"],
      correct_answer: "Azul"
    },
    author: 1
};


export default function LessonScreen() {
  const route = useRoute();
  const lessons = route.params?.lessons;
  // Add the mock quizz lesson to the lessons list
  const lessonsWithMock = [...lessons, mockQuizzLesson];

  const navigator = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const currentLesson = lessonsWithMock[currentPage];

  const handleNext = () => {
    if (currentPage < lessonsWithMock.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Finish logic
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // await fetch("http://example.org/json/", {
        // method: "POST",
        // headers: {
          // "Content-Type": "application/json",
        // },
        // body: JSON.stringify({ answers }),
      // });
      // alert("Atividade finalizada com sucesso!");
      navigator.goBack();
    } catch (error) {
      // console.error(error);
      // alert("Ocorreu um erro ao enviar a atividade.");
    }
  };

  const renderLesson = () => {
    if (currentLesson.lesson_type === "complete") {
      const { word, hints } = currentLesson.data;
      const wordArray = word.split('');

      const handleWordChange = (text: string, index: number) => {
        const newAnswers = { ...answers };
        if (!newAnswers[currentLesson.id]) {
          newAnswers[currentLesson.id] = new Array(word.length).fill('');
        }
        newAnswers[currentLesson.id][index] = text.toUpperCase();
        setAnswers(newAnswers);
      };

      return (
        <View>
          <ThemedText style={styles.statement}>{currentLesson.statement}</ThemedText>
          <View style={styles.wordContainer}>
            {wordArray.map((char: string, index: number) => {
              const isHint = hints.includes(String(index));
              return (
                <TextInput
                  key={index}
                  style={[styles.letterBox, isHint && styles.hintBox]}
                  value={isHint ? char : (answers[currentLesson.id] && answers[currentLesson.id][index]) || ''}
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
        <View>
          <ThemedText style={styles.statement}>{currentLesson.statement}</ThemedText>
          <View style={styles.optionsContainer}>
            {options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionCard,
                  answers[currentLesson.id] === option && styles.selectedOptionCard,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return <Text>Lesson type not supported yet</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>{currentLesson.title}</ThemedText>
        {renderLesson()}
        <View style={styles.navigationButtons}>
          <ThemedButton title="Anterior" onPress={handlePrevious} disabled={currentPage === 0} />
          <ThemedButton
            title={currentPage === lessonsWithMock.length - 1 ? "Finalizar" : "Próximo"}
            onPress={handleNext}
            brand
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statement: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  letterBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
  hintBox: {
    backgroundColor: '#eee',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOptionCard: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
