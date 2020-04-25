import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import HeaderX from "../components/Header/HeaderX";
import MaterialButtonDanger from "../components/MaterialButtonDanger";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Selector(props) {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(0,0,0,0)"
      ></StatusBar>
      <HeaderX button="Settings" style={styles.headerX}></HeaderX>
      <MaterialButtonDanger
        text1="Look for Items"
        style={styles.materialButtonDanger}
      ></MaterialButtonDanger>
      <MaterialButtonViolet1
        text1="Report Items"
        style={styles.materialButtonViolet1}
      ></MaterialButtonViolet1>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  headerX: {
    height: 80,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  materialButtonDanger: {
    width: 287,
    height: 198,
    borderRadius: 19,
    borderColor: "#000000",
    borderWidth: 0,
    marginTop: 92,
    alignSelf: "center"
  },
  materialButtonViolet1: {
    width: 287,
    height: 198,
    borderRadius: 19,
    borderColor: "#000000",
    borderWidth: 0,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.01,
    marginTop: 49,
    alignSelf: "center"
  }
});

export default Selector;
