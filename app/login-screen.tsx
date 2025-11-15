import React, { useState } from "react";
import { Button, TextInput, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThemedTextInput from "@/components/themed-text-input";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedButton from "@/components/themed-button";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [chave, setChave] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    navigation.replace("app");
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Image
          source={require("../assets/images/brand/logo-text.png")}
          style={{
            objectFit: "contain",
            width: 280,
            marginHorizontal: "auto",
          }}
        />
        <Text
          style={{
            fontSize: 32,
            letterSpacing: -0.75,
            fontFamily: "Inter",
            textAlign: "center",
          }}
        >
          Olá!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontFamily: "Inter",
            letterSpacing: -0.55,
            fontSize: 18,
          }}
        >
          Coloque aqui os dados passados pelo professor para acessar as atividades!
        </Text>

        <ThemedTextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            textTransform: "uppercase",
          }}
          placeholder="Chave"
          onChangeText={setChave}
          maxLength={6}
          value={chave}
          autoCapitalize="none"
        />

        <ThemedTextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 65 }}
          placeholder="PIN"
          onChangeText={setPin}
          maxLength={4}
          value={pin}
          secureTextEntry={true}
          keyboardType="numeric"
        />

        <ThemedButton
          title="ENTRAR"
          onPress={handleSubmit}
          disabled={!chave || !pin}
          brand
        />
      </View>
    </SafeAreaView>
  );
}
