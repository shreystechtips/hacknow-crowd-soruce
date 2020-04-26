import React, { Component } from "react";
import { StyleSheet, View, Button, SafeAreaView, TouchableOpacity, Text, ScrollView} from "react-native";
import MaterialButtonPink from "../components/MaterialButtonPink";
import Checkbox from "../components/Checkbox.js"


function Separator() {
  return <View style={styles.separator} />;

}

function handlePress(buttonName){
  setCategory(buttonName)
}

function Selector(props) {
  [category, setCategory] = React.useState(null);

  let categoriesAndProducts = {
    
    "Non-Perishable Foods": {
      "list": ["test1", "test2"]
    }, 
    "Hygenic Products":{
      "list": ["test1", "test2", "test3", "test4", "test5"]
    }, 
    "First Aid":{
      "list": ["test1", "test2"]
    }, 
    "Over The Counter Medical":{
      "list": ["test1", "test2"]
    },
  
  };
    

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}> 
      {Object.keys(categoriesAndProducts).map((buttonName) => (
        <React.Fragment key={buttonName}>
            <View>
              <TouchableOpacity style={styles.touchable} onPress={(e) => handlePress(buttonName)}>
                  <Text style={styles.caption}>{buttonName}</Text>
              </TouchableOpacity>
              {category === buttonName ? <Separator /> : null}
              {category === buttonName ? categoriesAndProducts[buttonName].list.map(item => (
                <TouchableOpacity style={styles.touchableMini}>
                  <Checkbox label={item}/>
                  {/* <Text style={styles.caption}>{item}</Text> */}
              </TouchableOpacity>)) : null}

            </View>
            <Separator />
          </React.Fragment>
        ))}
        
      </ScrollView>
    </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop:10
  },
  materialButton: {
        width: 321,
    height: 88,
    borderRadius: 14,
    marginTop: 40
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
   
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
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    height: 88,
    borderRadius: 14
  },
  caption: {
    color: "#fff",
    fontSize: 14,
  },
  touchableMini:{
    backgroundColor: "#E91E63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    height:60,
    marginVertical:3,
    marginHorizontal:30,
    elevation: 2,
    minWidth: 88,
    borderRadius: 7,
    shadowOffset: {
      height: 1,
      width: 0
    },
  }
}); 

  
export default Selector;
