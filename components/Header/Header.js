import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderX from "./HeaderX";

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 80
  },
  headerX: {
    width: 360,
    height: 80
  }
});

export default function Header(props) {
    return (
      <View style={styles.container}>
        <HeaderX style={styles.headerX}></HeaderX>
      </View>
    );
  }
