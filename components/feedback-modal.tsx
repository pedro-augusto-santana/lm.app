import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "@/components/themed-text";
import { Feather } from "@expo/vector-icons";

interface FeedbackModalProps {
  isVisible: boolean;
  isCorrect: boolean;
  onClose: () => void;
}

export default function FeedbackModal({
  isVisible,
  isCorrect,
  onClose,
}: FeedbackModalProps) {
  const containerStyle = [
    styles.modalContainer,
    isCorrect ? styles.correctContainer : styles.incorrectContainer,
  ];
  const iconName = isCorrect ? "check-circle" : "x-circle";
  const message = isCorrect ? "Muito bem!" : "Tente novamente!";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={containerStyle}>
          <Feather name={iconName} size={80} color="white" />
          <ThemedText style={styles.modalText} bold>
            {message}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  correctContainer: {
    backgroundColor: "#28a745",
  },
  incorrectContainer: {
    backgroundColor: "#dc3545",
  },
  modalText: {
    marginTop: 20,
    fontSize: 28,
    color: "white",
    textAlign: "center",
  },
});
