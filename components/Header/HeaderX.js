import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LogoHeader from "./LogoHeader";
import FeatherIcon from "react-native-vector-icons/Feather";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <MaterialIconsIcon name="home" style={styles.icon}></MaterialIconsIcon>
        <View style={styles.iconFiller}>
          <LogoHeader text1="Shop Safe" style={styles.logoHeader}></LogoHeader>
        </View>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => console.log("Navigate to Settings")}
          style={styles.button}
        >
          <FeatherIcon
            name={props.icon2Name || "settings"}
            style={styles.icon2}
          ></FeatherIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,178,204,1)"
  },
  group: {
    height: 55,
    backgroundColor: "rgba(31,178,204,1)",
    flexDirection: "row",
    marginTop: 25
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 32,
    height: 25,
    marginLeft: 14,
    alignSelf: "center"
  },
  logoHeader: {
    width: 228,
    height: 44,
    shadowOpacity: 1,
    overflow: "visible"
  },
  iconFiller: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 15
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});

export default HeaderX;
