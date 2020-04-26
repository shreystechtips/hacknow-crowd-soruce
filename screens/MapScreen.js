import React, { useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import firebase from "firebase";
import "firebase/database";
import config from "../components/config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
async function getCloseStores(longitude, latitude, thresX = 0.2, thresY = 0.2) {
  var ref = await db.ref("storeData").orderByChild("lat");
  // .startAt(latitude - thresY)
  // .endAt(latitude + thresY)
  // .limitToFirst(30);
  // .orderByChild("lng")
  // .startAt(longitude - thresX)
  // .endAt(longitude + thresX);
  let coords = [];
  await ref
    .once("value", function (snapshot) {
      const val = snapshot.val();
      Object.keys(snapshot.val()).forEach(async function (childSnapshot) {
        childSnapshot = val[childSnapshot];
        // console.log(childSnapshot);
        // console.log('\n\n\n\n\n');
        const ss = childSnapshot;
        coords.push({ lat: ss.lat, lng: ss.lng });
        // console.log({lat:ss.lat, lng:ss.lng})
      });
    })
    .then(() => {
      return coords;
    });
  return coords;
}
// const Container = styled.View`
//   flex-grow: 1;
// `;

// const Header = styled.View`
//   padding-vertical: 10px;
//   padding-horizontal: 15px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// const SearchField = styled.TextInput`
//   height: 45;
//   flex-grow: 1;
//   padding-horizontal: 5;
//   background-color: rgba(0, 0, 0, 0.05);
//   border-radius: 10;
//   margin-right: 10;
// `;
const styles = StyleSheet.create({
  SearchField: {
    height: 45,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    marginRight: 10,
  },
});

// requestLocationPermission = async () => {
//     if(Platform.OS)
// }

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [coords, setCoords] = useState([]);
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  var longitude = "";
  var latitude = "";
  // if(coords.length <= 0){
  //   setCoords(getCloseStores(latitude, longitude));
  // }
  React.useEffect(() => {
    (async () => {
      const thing = await getCloseStores(latitude, longitude);
      setCoords(thing);
      console.log(thing);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to location</Text>;
  }
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    longitude = location.coords.longitude;
    latitude = location.coords.latitude;
    // console.log(longitude, latitude);
    text = JSON.stringify(location);
    // console.log(text)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* //map this info */}

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {coords.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.lat,
              longitude: item.lng,
            }}
          >
            <Callout>
              <Text>Store Name</Text>
              <Text>Items in Stock</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default App;
