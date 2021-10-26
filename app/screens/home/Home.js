import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Rover")}
        style={styles.addBtn}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#f3f3f3" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    display: "flex",
    backgroundColor: "#142950",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    right: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
  },
});
