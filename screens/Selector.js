import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import MaterialButtonPink from "../components/MaterialButtonPink";
import { CheckBox } from "react-native-elements";

function Separator() {
  return <View style={styles.separator} />;
}

function Selector({ navigation }) {
  [category, setCategory] = React.useState(null);
  [items, setItems] = React.useState([]);

  function handlePress(buttonName) {
    setCategory(buttonName === category ? null : buttonName);
  }

  function addItem(selectedItem) {
    let itemIndex = items.indexOf(selectedItem);
    if (itemIndex == -1) {
      setItems([...items, selectedItem]);
    } else {
      setItems(items.filter((list) => list !== selectedItem));
    }
  }

  function isChecked(item) {
    const index = items.indexOf(item);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  function isDisabled() {
    console.log(items.length);
    return items == null || items.length == 0;
  }

  let categoriesAndProducts = {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(categoriesAndProducts).map((buttonName) => (
          <React.Fragment key={buttonName}>
            <View>
              <TouchableOpacity
                style={styles.touchable}
                onPress={(e) => handlePress(buttonName)}
              >
                <Text style={styles.caption}>{buttonName}</Text>
              </TouchableOpacity>
              {category === buttonName ? <Separator /> : null}
              {category === buttonName
                ? categoriesAndProducts[buttonName].list.map((item, index) => (
                    <CheckBox
                      onPress={(e) => addItem(item)}
                      style={styles.touchableMini}
                      title={item}
                      key={item}
                      checked={isChecked(item)}
                    />
                  ))
                : null}
            </View>
            <Separator />
          </React.Fragment>
        ))}

        <TouchableOpacity
          disabled={isDisabled()}
          style={isDisabled() ? styles.searchDisabled : styles.search}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.caption}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 10,
  },
  materialButton: {
    width: 321,
    height: 88,
    borderRadius: 14,
    marginTop: 40,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "#737373",
  },
  touchable: {
    backgroundColor: "#E91E63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    height: 88,
    borderRadius: 14,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
  },
  touchableMini: {
    backgroundColor: "#E91E63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    height: 60,
    marginVertical: 3,
    marginHorizontal: 30,
    elevation: 2,
    minWidth: 88,
    borderRadius: 7,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  search: {
    backgroundColor: "#4a9bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    height: 50,
    marginVertical: 3,
    marginHorizontal: 30,
    elevation: 2,
    minWidth: 88,
    borderRadius: 7,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  searchDisabled: {
    backgroundColor: "#d3d3d3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    height: 50,
    marginVertical: 3,
    marginHorizontal: 30,
    elevation: 2,
    minWidth: 88,
    borderRadius: 7,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

export default Selector;
