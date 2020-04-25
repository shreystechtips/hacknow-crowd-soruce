import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import HomeScreen from "./screens/HomeScreen.js";
import ReportScreen from "./screens/ReportScreen.js";
import HeaderX from "./components/Header/HeaderX";
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
      ? <FallbackComponent />
      : this.props.children
  }
}


export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Yeet', headerRight: () => (<Button title="Test" onPress={() => alert('button')} />) }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ title: "What's available?" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}