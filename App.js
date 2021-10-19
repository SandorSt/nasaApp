import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import Rocket from "./app/assets/rocket.png";

export default function App() {
  const [animated, setAnimated] = useState(false);

  const [show] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.Value(700));
  const [size] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(show, {
        toValue: 1,
        duration: 2000,
        delay: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: -700,
        duration: 4000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.timing(size, {
        toValue: 700,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => setAnimated(true));
    });
  }, []);

  if (!animated)
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#142950"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Animated.Image
            source={Rocket}
            style={[styles.image, { top: position }]}
          />
          <Animated.Text
            style={[
              styles.text,
              { opacity: show, transform: [{ scale: size }] },
            ]}
          >
            Welcome
          </Animated.Text>
        </View>
      </>
    );
  return <Text>Hello World!</Text>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#142950",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 50,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
