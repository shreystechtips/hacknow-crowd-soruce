import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function HeaderWithTitle(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        <View style={styles.leftWrapper}>
          <TouchableOpacity style={styles.leftIconButton}>
            <Icon name="ios-arrow-back" style={styles.leftIcon2}></Icon>
            <Text style={styles.leftText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.rightText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.title}>
          Title
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingRight: 8,
    paddingLeft: 8
  },
  header: {
    width: 359,
    height: 44,
    flexDirection: "row"
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  leftIconButton: {
    flexDirection: "row"
  },
  leftIcon2: {
    color: "#007AFF",
    fontSize: 32
  },
  leftText: {
    color: "#007AFF",
    alignSelf: "center",
    paddingLeft: 5,
    fontSize: 17
  },
  rightWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  button: {},
  rightText: {
    color: "#007AFF",
    alignSelf: "center",
    fontSize: 17
  },
  textWrapper: {
    height: 52,
    justifyContent: "center",
    paddingLeft: 5
  },
  title: {
    color: "#000",
    fontSize: 34,
    lineHeight: 40
  }
});

export default HeaderWithTitle;
