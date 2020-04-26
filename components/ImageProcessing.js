import { useState } from "react";
import { Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/database";
import "firebase/firestore";
// import {db} from './src/config';
import config from "./config";

// const app = firebase.apps.length && firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// console.log(app)
const db = firebase.database();
// const fs = firebase.firestore();

export async function uploadData(data, store) {
  let storeData;
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${store["description"]}&key=AIzaSyD4iruS6IbZHxDGgPcx8K-3PkB17MFsjso`
  )
    .then((response) => response.json())
    .then((json) => {
      storeData = json["results"][0].geometry.location;
    })
    .then(() => {
      if (data != null) {
        let pastData;
        db.ref("storeData").on("value", (querySnapShot) => {
          pastData = querySnapShot.val() ? querySnapShot.val() : {};
        });
        db.ref("storeData").push({ ...data, ...storeData });
        // fs.collection('storeData').doc().set({...data,...storeData});
      }
    });
}

const credentials = {
  clientId: "",
  appId: "1:947813831483:web:276a6693e0b4b374049d1e",
  apiKey: "AIzaSyCXCrC5KVl_EuCAvYgqFwYVhExHby4OUH0",
  databaseURL: "https://crowd-essentials.firebaseio.com",
  storageBucket: "crowd-essentials.appspot.com",
  messagingSenderId: "947813831483",
  projectId: "crowd-essentials",
  GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyAB71R5L_9SMwSIbV6WXKvXX-izpXbcQ6U",
};

export async function submitToGoogle(image) {
  // console.log(image);
  // image = await upload(image);
  // console.log(image);
  // console.log(image)
  // let snapshot = await storageRef.put(image);
  // console.log(snapshot);
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
            // { type: "LANDMARK_DETECTION", maxResults: 5 },
            // { type: "FACE_DETECTION", maxResults: 5 },
            // { type: "LOGO_DETECTION", maxResults: 5 },
            // { type: "TEXT_DETECTION", maxResults: 5 },
            // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
            // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
            // { type: "IMAGE_PROPERTIES", maxResults: 20 },
            // { type: "CROP_HINTS", maxResults: 5 },
            // { type: "WEB_DETECTION", maxResults: 5 }
          ],
          image: {
            // source: {
            //   imageUri: "https://newcastlebeach.org/images/sfridge-1.jpg" //image
            // }
            content: image,
          },
        },
      ],
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        credentials["GOOGLE_CLOUD_VISION_API_KEY"],
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    let responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
    // this.setState({
    //   googleResponse: responseJson,
    //   uploading: false
    // });
    // setUploading(false);
  } catch (error) {
    console.log(error);
  }
}

// export async function processOCRDocument(localPath) {
//   if(!userSet){
//     await firebaseSwitch;
//     userSet = true;
//   }
//   console.log(localPath);
//   const processed = await vision().cloudDocumentTextRecognizerProcessImage(
//     localPath
//   );

//   console.log("Found text in document: ", processed.text);

//   processed.blocks.forEach((block) => {
//     console.log("Found block with text: ", block.text);
//     console.log("Confidence in block: ", block.confidence);
//     console.log("Languages found in block: ", block.recognizedLanguages);
//   });
// }

// export async function processLabelDocument(localPath){
//   if(!userSet){
//     await firebaseSwitch;
//     userSet = true;
//   }
//   const labels = await vision().cloudImageLabelerProcessImage(localPath);

//   labels.forEach(label => {
//     console.log('Service labelled the image: ', label.text);
//     console.log('Confidence in the label: ', label.confidence);
//   });
// }

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob
