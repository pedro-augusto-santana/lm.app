import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThemedTextInput from "@/components/themed-text-input";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [chave, setChave] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    navigation.replace("app");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topHalf} />
        <View style={styles.bottomHalf} />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/brand/logo-text.png")}
              style={styles.logo}
            />
          </View>
          <ThemedText style={styles.subtitle}>
            Acesse as atividades com os dados enviados pelo professor!
          </ThemedText>

          <View style={styles.inputContainer}>
            <Feather name="key" size={24} color="#87aade" style={styles.icon} />
            <ThemedTextInput
              style={styles.input}
              placeholder="Chave de Acesso"
              onChangeText={setChave}
              maxLength={6}
              value={chave}
              autoCapitalize="characters"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={24}
              color="#87aade"
              style={styles.icon}
            />
            <ThemedTextInput
              style={styles.input}
              placeholder="PIN"
              onChangeText={setPin}
              maxLength={4}
              value={pin}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
          </View>

          <ThemedButton
            title="ENTRAR"
            onPress={handleSubmit}
            disabled={!chave || !pin}
            brand
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomRightRadius: 80,
  },
  bottomHalf: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#f0f4f7",
  },
  content: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    width: 300,
    borderRadius: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    position: "absolute",
    top: 100,
    alignSelf: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 18,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 15,
    color: "#333",
    fontSize: 18,
  },
});
