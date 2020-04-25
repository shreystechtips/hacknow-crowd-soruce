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
import { processDocument } from "../components/ImageProcessing";

const screenWidth = Math.round(Dimensions.get("window").width);

export default function Upload() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [img, setImg] = useState(null);

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
      //  await processDocument(img);
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
        <View style={{ flex: 1, justifyContent: "center" }}>
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
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={() => {
                  takePicture();
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Take Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text>Flip</Text>
              </TouchableOpacity>
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
