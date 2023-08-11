import { useReactiveVar } from "@apollo/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { resultVar } from "../graphql/reactiveVars";
import { getData, storeData } from "../utils/storage";

const endpoint = `${process.env.G_URL}?key=${process.env.KEY}&cx=${process.env.CX}&searchType=image&q=anime%20zom%20100%20gif`;

export default function Home() {
  const router = useRouter();
  const result = useReactiveVar(resultVar);
  const [val, setVal] = useState();
  const [input, setInput] = useState();

  const saveData = () => {
    console.log(process.env);
    resultVar([endpoint]);
  };

  useEffect(() => {
    // getData("key").then((res) => setVal(res));
    console.log(process.env);
  }, [saveData]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>HOME</Text>
        {/* <Button icon="camera">Press me</Button> */}
        <Button
          // icon={{
          //   uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
          // }}
          icon="camera"
          mode="contained" // contained, outlined, elevated,
          contentStyle={styles.flexReverse}
          rippleColor="#FF000020"
          onPress={saveData}>
          Press me
        </Button>
        <View
          style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
          <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={() => {}}>
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Label</Text>
          </Pressable>
        </View>

        <View>
          <Text>Reactive variables:</Text>

          <Text>{`LOCAL:${typeof val === "string" ? val : val?.join(",")}`}</Text>

          {result.map((x, i) => (
            <Text key={i}>{x}</Text>
          ))}

          <Text>localstorage:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setInput(e)}
            value={input}
            placeholder="Placeholder"
            // keyboardType="numeric"
          />
        </View>
      </View>
    </View>
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
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});
