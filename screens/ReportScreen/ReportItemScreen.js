import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Item,
  List,
  ListItem,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  I18nManager,
  Animated,
  ScrollView,
} from "react-native";
import Swiper from "./Swiper";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import AppleStyleSwipeableRow from "./SwipeableItem";
import { Button } from "react-native-elements";
import { Icon, Tooltip, Overlay } from "react-native-elements";
import { submitToGoogle, uploadData } from "../../components/ImageProcessing";

const Row = ({ item, setOverlay }) => (
  <RectButton style={styles.rectButton} onPress={() => setOverlay(true)}>
    <Text style={styles.nameText}>{item.name}</Text>
    <Text numberOfLines={2} style={styles.dateText}>
      {item.category}
    </Text>
  </RectButton>
);

const categoriesAndProducts = {
  "Non-Perishable Foods": {
    list: ["Canned Meat", "Dried Vegetables"],
  },
  "Hygenic Products": {
    list: ["Disinfectant Wipes", "Hand Sanatizer", "Bleach", "Hand Soap"],
  },
  "First Aid": {
    list: ["Bandages", "First Aid Kits"],
  },
  "Over The Counter Medical": {
    list: ["Tylenol", "Vitamins"],
  },
};

export default function ReportItemScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [refreshData, setRefresh] = useState(true);
  const [overlay, setOverlay] = useState(false);
  // const [oneTimeOverlay, setOneTimeOverlay] = useState(true);

  useEffect(() => {
    setLoading(true);
    let counter = 0;
    let map = {};
    route.params.data.responses[0].labelAnnotations.forEach((item) => {
      map[counter++] = {
        name: item["description"],
        inStock: true,
        category: "",
      };
    });

    Object.keys(categoriesAndProducts).forEach((key) => {
      categoriesAndProducts[key].list.forEach((element) => {
        map[counter++] = {
          name: element,
          inStock: true,
          category: key,
        };
      });
    });
    console.log(map);
    setData(map);
    setLoading(false);
  }, []);

  function setStock(swipeDir, id) {
    // console.log(swipeDir);

    // Set stock based on 4 levels: false None, 1 Low, 2 Medium, 3 High
    // console.log(id);
    // let temp = data.slice();

    // Set state based on swipe
    switch (swipeDir.toLowerCase()) {
      case "left":
        data[id].inStock = false;
        break;
      case "low":
        data[id].inStock = 1;
        break;
      case "med":
        data[id].inStock = 2;
        break;
      case "high":
        data[id].inStock = 3;
        break;
    }
    setData(data);
    setRefresh(!refreshData);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Overlay isVisible={overlay} onBackdropPress={() => setOverlay(false)}>
        <View style={styles.rectButton}>
          <Text>Tinder with shopping!</Text>
          <Text> Swipe left if it's in stock</Text>
          <Text>Swipe right if it's out of stock --></Text>
          <Button
            title="Got it!"
            type="outline"
            onPress={() => setOverlay(false)}
          />
        </View>
      </Overlay>
      <View style={{ padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={Object.keys(data)}
            keyExtractor={(key) => key.toString()}
            extraData={refreshData}
            renderItem={({ item }) => {
              return data[item].inStock === true ? (
                <AppleStyleSwipeableRow
                  handleSwipe={(swipe) => setStock(swipe, item)}
                >
                  <Row item={data[item]} setOverlay={setOverlay} />
                </AppleStyleSwipeableRow>
              ) : (
                <View />
              );
            }}
          />
        )}
      </View>
      <View style={styles.submitView}>
        <Icon
          raised
          name="check"
          type="font-awesome"
          color="#0f0"
          onPress={() => {
            console.log("done"),
              uploadData(
                { ...route.params.data, items: { ...data } },
                route.params.store
              );
            navigation.navigate("Toggle");
          }}
        />
        <Icon
          raised
          name="question"
          type="font-awesome"
          color="#f00"
          onPress={() => setOverlay(true)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
  },
  nameText: {
    alignItems: "center",
    flex: 1,
    fontWeight: "bold",
    backgroundColor: "transparent",
    fontSize: 16,
  },
  dateText: {
    flex: 1,
    backgroundColor: "transparent",

    right: 0,
    top: 0,
    color: "#999",
    fontWeight: "bold",
  },
  submitView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    paddingHorizontal: 50,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
  },
});
