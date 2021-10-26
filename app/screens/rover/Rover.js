import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const roverSchema = Yup.object({
  code: Yup.string()
    .min(3, "Too short")
    .max(7, "Too long")
    .required("Required"),
  name: Yup.string()
    .min(3, "Too short")
    .max(100, "Too long")
    .required("Required"),
});

export default function Rover() {
  const [error, setError] = useState("");
  const handlerSubmit = async (values) => {
    setError("");
    try {
      let rovers = [];
      const value = await AsyncStorage.getItem("rovers");
      if (value) {
        rovers = JSON.parse(value);
        if (
          rovers.find((item) => item.code.trim().toUpperCase() === values.code)
        ) {
          return setError("Oops, rover already added");
        } else {
          rovers.push({ ...values, code: item.code.trim().toUpperCase() });
          const jsonValue = JSON.stringify(rovers);
          await AsyncStorage.setItem("rovers", jsonValue);
        }
      } else {
        rovers.push(values);
        const jsonValue = JSON.stringify(rovers);
        await AsyncStorage.setItem("rovers", jsonValue);
      }
    } catch (error) {
      AsyncStorage.removeItem("rovers");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Formik
          initialValues={{ code: "", name: "" }}
          validationSchema={roverSchema}
          onSubmit={handlerSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Code:</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  value={values.code}
                />
                {errors.code && touched.code ? (
                  <Text style={styles.error}>{errors.code}</Text>
                ) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Name:</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : null}
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity
                  style={styles.addBtn}
                  activeOpacity={0.6}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Add Rover</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 15,
  },
  formGroup: {
    marginTop: 30,
  },
  textInput: {
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 1,
  },
  formLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  addBtn: {
    backgroundColor: "#142950",
    display: "flex",
    justifyContent: "center",
    height: 50,
    marginBottom: 50,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: "#f3f3f3",
    fontSize: 15,
    fontWeight: "bold",
  },
  error: {
    fontSize: 13,
    color: "red",
  },
});
