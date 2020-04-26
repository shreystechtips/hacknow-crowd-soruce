import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { submitToGoogle, uploadData } from "../components/ImageProcessing";
import * as ImageManipulator from "expo-image-manipulator";
import { Icon } from "react-native-elements";

const screenWidth = Math.round(Dimensions.get("window").width);

export default function ProductImage({ route, navigation }) {
  // const {store} = param.params;
  // console.log(route.params.store);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [img, setImg] = useState(null);
  const [processed, setProcessed] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setImg(photo["uri"]);
      let manipResult = await ImageManipulator.manipulateAsync(
        photo["uri"],
        [],
        { compress: 0, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      const response = await submitToGoogle(manipResult["base64"]);
      var total = "";
      console.log(response);
      await response["responses"][0]["labelAnnotations"].forEach((element) => {
        console.log(element["description"]);
        total += `${element["description"]}, `;
      });
      Alert.alert("Items Detected", total, [{ text: "OK" }], {
        cancelable: false,
      });
      // await uploadData(response, route.params.store);
      console.log(response);
      setProcessed(response);
    }
  };
  let camera;

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {img == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
        >
          <Camera
            style={{
              // flex: 1,
              width: screenWidth,
              height: screenWidth * (4 / 3),
            }}
            useCamera2Api={true}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  // width:"50%"
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Icon
                  reverse
                  name="ios-reverse-camera"
                  type="ionicon"
                  color="#517fa4"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  // width:"50%"
                }}
                onPress={() => {
                  takePicture();
                }}
              >
                <Icon reverse name="circle" type="feather" color="#517fa4" />
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text>Flip</Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Button title="Retake Image" onPress={() => setImg(null)} />
          <Image
            style={{
              width: screenWidth * 0.9,
              height: screenWidth * (4 / 3) * 0.9,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              margin: 50,
            }}
            source={{ uri: img }}
          />
          {processed != null ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                margin: 10,
                width: "95%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                title="3. Report In-Store Item Availability"
                onPress={() =>
                  navigation.navigate("ReportItems", {
                    store: route.params.store,
                    data: processed,
                  })
                }
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FCFFFC",
    // alignItems: "center",
    // height:100,
    // width:100
  },
  box: {
    borderTopLeftRadius: 50,
    borderTopEndRadius: 50,
    backgroundColor: "#2D3A3A",
    padding: 30,
    bottom: 0,
    width: "97%",
  },
});
