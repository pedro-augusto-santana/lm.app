import ThemedButton from "@/components/themed-button";
import ThemedText from "@/components/themed-text";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AssignmentsScreen() {
  const navigator = useNavigation();
  const [assignments, setAssignments] = useState([]);
  async function fetchData() {
    try {
      const chave = await AsyncStorage.getItem("chave");
      const pin = await AsyncStorage.getItem("pin");

      if (chave && pin) {
        const response = await fetch(
          `http://192.168.0.195:4442/api/assignments/for/${chave}/${pin}`,
          {
            headers: {
              "access-control-allow-origin": "*, *",
              "access-control-allow-methods": "*",
              "access-control-allow-headers": "*",
            },
          }
        );
        const data = await response.json();
        setAssignments(data);
      } else {
        alert("Dados de login não encontrados. Faça o login novamente.");
        // Optionally, navigate to login screen
        // navigator.navigate('login-screen');
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      alert("Não foi possível buscar as atividades.");
    }
  }

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title} bold>
          Minhas Atividades
        </ThemedText>
        <FlatList
          data={assignments}
          renderItem={({ item }: { item: any }) => {
            const statusStyle = mapLabelStyle(item.status);
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <ThemedText style={styles.cardTitle}>
                    {item.assignment.title}
                  </ThemedText>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusStyle.color },
                    ]}
                  >
                    <Feather name={statusStyle.icon} size={16} color="white" />
                    <ThemedText style={styles.statusText}>
                      {mapStatus(item.status)}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardDescription}>
                  {item.assignment.description}
                </ThemedText>

                <View style={{ marginTop: 24 }}>
                  <ThemedButton
                    title="Começar!"
                    onPress={() =>
                      navigator.navigate("assignment-details-screen", {
                        assignment: item.assignment,
                      })
                    }
                    brand
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
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
    fontSize: 38,
    letterSpacing: -0.5,
    color: "#89ABE3",
    textAlign: "center",
    marginVertical: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 25,
    borderWidth: 3,
    borderColor: "#89ABE3",
    shadowColor: "#89ABE3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    color: "#333",
    letterSpacing: -0.5,
    fontFamily: "ComicNeue_700Bold",
    flex: 1,
  },
  cardDescription: {
    fontSize: 18,
    color: "#666",
    lineHeight: 24,
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
