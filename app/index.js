import { Stack, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import Home from "../components/home";
import { currentIndexVar, searchVar, showDemoVar } from "../graphql/reactiveVars";
import { clearAll } from "../utils/storage";

export default function Page() {
  const router = useRouter();

  // useEffect(() => {
  //   set
  // }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" }, //phone header (status bar)
          headerShadowVisible: false,
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="tomato"
              size={22}
              onPress={() => {
                clearAll();
                alert("Clear Cache");
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="refresh"
              iconColor="tomato"
              size={22}
              onPress={() => {
                currentIndexVar(0);
                searchVar("Zom 100");
                showDemoVar(true);
              }}
            />
          ),
          headerTitle: () => (
            <Text style={{ color: "tomato", fontSize: 16, fontWeight: 500 }}>
              {`₊  ᶻ ₊    Anime-Gifs  ᶻ ᶻ ˚`}
            </Text>
          ),
        }}
      />

      <View style={{ flex: 1 }}>
        <Home />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
