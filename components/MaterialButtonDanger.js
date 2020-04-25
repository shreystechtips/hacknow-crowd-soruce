import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Font from 'expo-font';
// await loadAsync({
//   // Any string can be used as the fontFamily name. Here we use an object to provide more control
//   'robot-regular': {
//     uri: require('./assets/fonts/robot-regular.ttf'),
//     fontDisplay: FontDisplay.FALLBACK,
//   },
// });

function MaterialButtonDanger(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.caption}>{props.text1 || "BUTTON"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F44336",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    // fontFamily: "roboto-regular"
  }
});

export default MaterialButtonDanger;
