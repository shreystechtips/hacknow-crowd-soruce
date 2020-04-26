import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import HomeScreen from "./screens/HomeScreen.js";
import ReportScreen from "./screens/ReportScreen.js";
import ReportItemScreen from "./screens/ReportScreen/ReportItemScreen.js";
import LookReportToggle from "./screens/LookReportToggle.js";
import Selector from './screens/Selector.js';
import ProductImage from './screens/ProductImage'

// import ErrorBoundary from 'react-native-error-boundary'
// import { default as Selector } from './screens/Selector'

const Stack = createStackNavigator();

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    logErrorToService(error, info.componentStack)
  }

  render () {
    return this.state.hasError
      ? <View />
      : this.props.children
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
            options={{ title: 'Select an Action' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Yeet', headerRight: () => (<Button title="Test" onPress={() => alert('button')} />) }}
          />
          <Stack.Screen
            name="Selector"
            component={Selector}
            options={{ title: "Select Items" }}
          />
          <Stack.Screen
            name="TakeImage"
            component={ProductImage}
            options={{ title: "Image Selection" }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ title: "Select a store (we probs already know)" }}
          />
          <Stack.Screen
            name="ReportItems"
            component={ReportItemScreen}
            options={{ title: "What's available?" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}