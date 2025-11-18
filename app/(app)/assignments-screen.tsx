import { useNavigation } from "expo-router";
import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/themed-text";
import ThemedButton from "@/components/themed-button";
import { Feather } from "@expo/vector-icons";

export default function AssignmentsScreen() {
  const navigator = useNavigation();
  const [assignments, setAssignments] = useState([]);
  async function fetchData() {
    fetch("http://192.168.0.195:4442/api/assignments/for/KDHJYI/1919", {
      headers: {
        "access-control-allow-origin": "*, *",
        "access-control-allow-methods": "*",
        "access-control-allow-headers": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAssignments(data);
      })
      .catch((error) => {
        alert(error);
      });
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
      pending: { color: "#22c55e", icon: "gift" },
      open: { color: "#eab308", icon: "edit-3" },
      finished: { color: "#ef4444", icon: "check-circle" },
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
    backgroundColor: "#e1f5fe",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 38,
    letterSpacing: -0.5,
    color: "#005a9c",
    textAlign: "center",
    marginVertical: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    borderWidth: 3,
    borderColor: "#87aade",
    shadowColor: "#005a9c",
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
