import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import ReportScreen from "./screens/ReportScreen.js";
import ReportItemScreen from "./screens/ReportScreen/ReportItemScreen.js";
import LookReportToggle from "./screens/LookReportToggle.js";
import Selector from "./screens/Selector.js";
import ProductImage from "./screens/ProductImage";
import MapScreen from "./screens/MapScreen";
import {} from "react-native-elements";

// import ErrorBoundary from 'react-native-error-boundary'
// import { default as Selector } from './screens/Selector'

const Stack = createStackNavigator();

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <View /> : this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Toggle"
            component={LookReportToggle}
            options={{
              title: "Shop Safe",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="home" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Yeet",
              headerRight: () => (
                <Button title="Test" onPress={() => alert("button")} />
              ),
            }}
          />
          <Stack.Screen
            name="Selector"
            component={Selector}
            options={{
              title: "Select Items",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="local-grocery-store" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{
              title: "1. Pick a store",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="store" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="TakeImage"
            component={ProductImage}
            options={{
              title: "2. Snap",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="camera" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="ReportItems"
            component={ReportItemScreen}
            options={{
              title: "3. Tinder with the groceries",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="store" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Results",
              headerRight: () => (
                <View style={styles.icon}>
                  <Icon name="my-location" />
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
    right: 20,
    position: "absolute",
    top: 10,
    paddingLeft: 10,
  },
});
