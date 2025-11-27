import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import ThemedTextInput from "@/components/themed-text-input";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [chave, setChave] = useState("WMIBBX");
  const [pin, setPin] = useState("9963");

  useEffect(() => {
    const loadLoginData = async () => {
      try {
        const storedChave = await AsyncStorage.getItem("chave");
        const storedPin = await AsyncStorage.getItem("pin");
        if (storedChave) setChave(storedChave);
        if (storedPin) setPin(storedPin);
      } catch (error) {
        console.error("Failed to load login data from storage:", error);
      }
    };
    loadLoginData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.0.195:4442/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: chave,
          pin: pin,
        }),
      });

      if (response.ok) {
        // Save to AsyncStorage on successful login
        await AsyncStorage.setItem("chave", chave);
        await AsyncStorage.setItem("pin", pin);
        navigation.replace("app");
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Erro no Login",
          errorData.message || "Chave de acesso ou PIN incorretos."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro de Conexão",
        "Não foi possível se conectar ao servidor. Verifique sua conexão com a internet."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            <Feather name="key" size={24} color="#89ABE3" style={styles.icon} />
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
              color="#89ABE3"
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
    backgroundColor: "#F8F8F8",
  },
  content: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    width: 300,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 18,
    letterSpacing: -0.5,
    lineHeight: 24,
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
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
