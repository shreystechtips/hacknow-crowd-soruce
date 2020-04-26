// import React, { Component } from "react";
// import { StyleSheet, TouchableOpacity, Text, View} from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// function MaterialCheckboxWithLabel2(props) {

//   [eval("check" + props.index) , eval("setCheck" + props.index)] = React.useState(false);

//   function handlePress(e){
//     eval("setCheck" + props.index)(!eval("check" + props.index))
//     props.onPress();
//   }

//   return (
//     <View key={props.index}>

//       <TouchableOpacity key={props.label} style={[styles.container, props.style]}>
//         <Icon
//           name={check ? "checkbox-marked" : "checkbox-blank-outline"}
//           style={styles.checkIcon}
//           key = {props.index + props.label}
//         ></Icon>
//         <Text style={styles.checkLabel}>{props.label || "Label"}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 20
//   },
//   checkIcon: {
//     color: "#000000",
//     fontFamily: "Roboto",
//     fontSize: 28,
//     lineHeight: 28
//   },
//   checkLabel: {
//     color: "#000000",
//     marginLeft: 2,
//     fontSize: 16
//   }
// });

// export default MaterialCheckboxWithLabel2;
