import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Item,
  List,
  ListItem,
  TouchableHighlight,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import HeaderX from "../components/Header/HeaderX";
// Report what's in stock

// Report what's out of stock

// Add images

export default function ReportScreen({ navigation }) {
  const [storeName, setStoreName] = React.useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const updateSearch = (search) => {
    setStoreName(search);
  };
  const getJson = () => {
    setStoreName(storeName.trim());
    if (storeName.trim() != "") {
      setLoading(true);
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${storeName.replace(
          /&/gi,
          "%26"
        )}&types=&location=&radius=500&key=AIzaSyD4iruS6IbZHxDGgPcx8K-3PkB17MFsjso`
      )
        .then((response) => response.json())
        .then((json) => {
          setData(
            json.predictions.filter((prediction) =>
              prediction.types.includes("store")
            )
          );
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  const renderRow = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={(view) => {
          navigation.navigate("TakeImage", { store: item });
        }}
        underlayColor="rgba(0,0,0,0)"
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#d3d3d3",
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text>{item.description}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <SearchBar
        platform="default"
        placeholder="Type Store Name..."
        onChangeText={updateSearch}
        value={storeName}
        onEndEditing={getJson}
        showLoading={isLoading}
      />

      <View style={{ padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          // <List>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={renderRow}
            // ({ item }) => {
            // 	return <Text> {item.description} </Text>
            // 	// return (<Item name={item.description + item .id}/>);
            // }
          />
          // </List> */}
        )}
        <View style={{ padding: 20, flex: 1 }}>
          <Image source={require("../assets/powered_by_google_on_white.png")} />
        </View>
      </View>
    </SafeAreaView>
  );
}
