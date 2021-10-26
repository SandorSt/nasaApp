import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rocket from "./app/assets/rocket.png";

import Home from "./app/screens/home";
import Rover from "./app/screens/rover";
import Detail from "./app/screens/detail";

const Stack = createNativeStackNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "My Rovers" }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "Images" }}
        />
        <Stack.Screen
          name="Rover"
          component={Rover}
          options={{ title: "Add Rover" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
