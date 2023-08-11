import { useReactiveVar } from "@apollo/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { Button, IconButton } from "react-native-paper";
import { getSearchData } from "../graphql/actions";
import { currentIndexVar, resultVar, searchVar, showDemoVar } from "../graphql/reactiveVars";
const BgImage = require("../assets/bg.png");

export default function Home() {
  // const router = useRouter();
  const [isLandscape, setIsLandscape] = useState(true);
  const result = useReactiveVar(resultVar);
  const currentIndex = useReactiveVar(currentIndexVar);
  const showDemo = useReactiveVar(showDemoVar);

  const input = useReactiveVar(searchVar);
  // const [input, setInput] = useState("Zom 100");

  const onSearch = () => getSearchData({ query: input, type: "search" });

  const onPrev = () => currentIndex > 0 && currentIndexVar(currentIndex - 1);
  const onNext = async () => {
    if (currentIndex >= result.length - 1) {
      await getSearchData({ query: input });
      currentIndexVar(currentIndex + 1);
    } else {
      currentIndexVar(currentIndex + 1);
    }
    await checkOrientation(result[currentIndex]?.link);
  };

  useEffect(() => {
    getSearchData({});
  }, []);

  useEffect(() => {
    currentIndexVar(0);
  }, [result, isLandscape]);

  const checkOrientation = (imageUrl) => {
    Image.getSize(
      imageUrl,
      async (width, height) => {
        await setIsLandscape(width > height);
      },
      (error) => {
        console.log("Error getting image size:", error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {result?.length ? (
          <ImageBackground
            source={{
              uri: result[currentIndex]?.link,
            }}
            resizeMode="contain"
            style={[styles.imageContainer, { transform: [{ scale: isLandscape ? 1.4 : 1 }] }]}
          />
        ) : (
          <View style={styles.center}>
            <Text>What's your favorite anime?</Text>
          </View>
        )}
      </View>

      <View style={styles.contentText}>
        <Text style={styles.title}>{result[currentIndex]?.title}</Text>
      </View>

      <TapGestureHandler onActivated={onPrev}>
        {/* <Text>Prev</Text> */}
        <View style={[styles.center, styles.contentText, { top: 120, left: -20 }]}>
          {!result.length ||
            (showDemo && (
              <IconButton
                icon="arrow-left"
                iconColor="white"
                size={50}
                onPress={() => {
                  showDemoVar(false);
                }}
              />
            ))}
        </View>
      </TapGestureHandler>

      <TapGestureHandler onActivated={onNext}>
        <View style={[styles.center, styles.contentText, { top: 120, right: -20 }]}>
          {/* <Text>Next</Text> */}
          {!result.length ||
            (showDemo && (
              <IconButton
                icon="arrow-right"
                iconColor="white"
                size={50}
                onPress={() => {
                  showDemo && showDemoVar(false);
                }}
              />
            ))}
        </View>
      </TapGestureHandler>

      <View style={styles.searchContainer}>
        <View style={styles.searchContent}>
          <TextInput
            style={styles.input}
            onChangeText={(e) => searchVar(e)}
            value={input}
            placeholder="What's your favorite anime?"
            // keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button
              rippleColor="#cec6ce70"
              icon="camera"
              icon="cloud-search"
              mode="contained" // contained, outlined, elevated,
              contentStyle={styles.flexReverse}
              onPress={onSearch}>
              Search
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 5,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    margin: 12,
    borderRadius: 32,
  },
  searchContainer: {
    height: 140,
    margin: 10,
  },
  searchContent: {
    flex: 1,
  },
  flexReverse: {
    flexDirection: "row-reverse",
  },
  imageContainer: {
    flex: 1,
    opacity: 0.85,
    resizeMode: "contain", // Adjust this resizeMode as needed
    // transform: [{ scale: 2 }], // Zoom by 10% (1.1 means 110%)
  },
  title: {
    marginTop: 5,
    position: "absolute",
    padding: 15,
    paddingTop: 20,
    color: "tomato",
    fontWeight: 700,
    fontSize: 16,
    minWidth: 375,
  },
  contentText: {
    position: "absolute",
    padding: 5,
    marginTop: 5,
    height: 400,
    // borderWidth: 1,
    minWidth: 175,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
