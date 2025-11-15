import { useNavigation } from "expo-router";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/themed-text";
import ThemedButton from "@/components/themed-button";

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

  function mapLabelColor(status: string) {
    const map: any = {
      pending: ["#dcfce7", "#22c55e"],
      open: ["#fef9c3", "#eab308"],
      finished: ["#fee2e2", "#ef4444"],
    };
    return map[status] ?? "";
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <ThemedText
          style={{
            letterSpacing: -0.5,
            paddingVertical: 24,
            fontSize: 24,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          ATIVIDADES
        </ThemedText>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginBottom: 24,
          }}
        >
          {assignments.map((item: any) => {
            return (
              <View
                style={{
                  backgroundColor: "#f9fafb",
                  borderColor: "#e5e7eb",
                  borderWidth: 1,
                  minHeight: 120,
                  padding: 12,
                  borderRadius: 8,
                }}
                key={item.id}
              >
                <Text
                  style={{ fontSize: 24, marginBottom: 16, fontWeight: "700" }}
                >
                  {item.assignment.title}
                </Text>
                <Text style={{ fontSize: 16, opacity: 0.5 }}>
                  {item.assignment.description}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 12,
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: mapLabelColor(item.status)[0],
                      color: mapLabelColor(item.status)[1],
                      borderWidth: 1,
                      borderColor: mapLabelColor(item.status)[1],
                      borderRadius: 1000,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                  >
                    {mapStatus(item.status)}
                  </Text>
                </View>
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
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
