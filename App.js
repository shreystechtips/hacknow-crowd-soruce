import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';
import HomeScreen from "./screens/HomeScreen.js";
import ReportScreen from "./screens/ReportScreen.js";
// import { default as Selector } from './screens/Selector'

const Stack = createStackNavigator();

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     logErrorToMyService(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <View><Text>Something went wrong.</Text></View>;
//     }

//     return this.props.children;
//   }
// }


export default function App() {
  return (
    // <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Yeet', headerRight: () => (<Button title="Test" onPress={() => alert('button')} />) }}
          />
          <Stack.Screen
            name="Reporst"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ title: "What's available?" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // </ErrorBoundary>
  );
}