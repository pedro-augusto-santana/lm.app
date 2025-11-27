import { useState, useEffect, useRef } from "react";
import { Alert, TextInput } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interfaces from lesson-screen - should probably be in a types file
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

export function useLessonFlow(lessons: Lesson[], assignmentId: number) {
  const navigator = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [isFeedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const currentLesson = lessons[currentPage];

  useEffect(() => {
    // Load sound
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/correct-answer.m4a"),
        );
        soundRef.current = sound;
      } catch (error) {
        console.error("Failed to load sound", error);
      }
    };
    loadSound();

    return () => {
      // Unload sound
      soundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (currentLesson.lesson_type === "complete") {
      const { hints, word } = currentLesson.data as CompleteData;
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

  const playCorrectSound = async () => {
    try {
      await soundRef.current?.replayAsync();
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  };

  const handleWordChange = (text: string, index: number) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [currentLesson.id]: {
        ...(prevAnswers[currentLesson.id] || {}),
        [index]: text.toUpperCase(),
      },
    }));

    if (text.length > 0 && currentLesson.lesson_type === "complete") {
      const { word, hints } = currentLesson.data as CompleteData;
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

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && currentLesson.lesson_type === "complete") {
      const { hints } = currentLesson.data as CompleteData;
      const userAnswerObject = answers[currentLesson.id] || {};
      if (!userAnswerObject[index] || userAnswerObject[index].length === 0) {
        let prevIndex = -1;
        for (let i = index - 1; i >= 0; i--) {
          if (!hints.includes(String(i))) {
            prevIndex = i;
            break;
          }
        }
        if (prevIndex !== -1 && inputRefs.current[prevIndex]) {
          inputRefs.current[prevIndex]?.focus();
        }
      }
    }
  };

  const handleOptionSelect = (alternativeId: number) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [currentLesson.id]: alternativeId,
    }));
  };

  const checkAnswer = () => {
    const lessonData = currentLesson.data;
    if (currentLesson.lesson_type === "complete") {
      const { word, hints } = lessonData as CompleteData;
      const userAnswerObject = answers[currentLesson.id] || {};
      const filledWord = word
        .split("")
        .map((char, index) => {
          if (hints.includes(String(index))) {
            return char;
          }
          return userAnswerObject[index] || "";
        })
        .join("");
      return filledWord.toUpperCase() === word.toUpperCase();
    } else if (currentLesson.lesson_type === "quizz") {
      const { answer } = lessonData as QuizzData;
      const userAnswer = answers[currentLesson.id];
      if (userAnswer === undefined) return false;
      return String(userAnswer) === answer;
    }
    return true;
  };

  const handleNext = () => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setFeedbackVisible(true);

    if (correct) {
      playCorrectSound();
    }
  };

  const handleSubmit = async () => {
    try {
      const chave = await AsyncStorage.getItem("chave");
      const pin = await AsyncStorage.getItem("pin");

      if (!chave || !pin) {
        Alert.alert(
          "Erro de autenticação",
          "Credenciais não encontradas. Por favor, faça login novamente.",
        );
        return;
      }

      const response = await fetch(
        "http://192.168.0.195:4442/api/assignments/done/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chave,
            pin,
            assignmentId,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Mensagem", data.message);
      } else {
        Alert.alert(
          "Erro",
          data.message || "Ocorreu um erro ao finalizar a atividade.",
        );
      }
    } catch (error) {
      console.error("Failed to submit assignment", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      );
    } finally {
      navigator.navigate("assignments-screen");
    }
  };

  const handleModalClose = () => {
    setFeedbackVisible(false);
    if (isCorrect) {
      if (currentPage < lessons.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        handleSubmit();
      }
    }
  };

  return {
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
    handleSubmit,
    handleKeyPress,
  };
}
