import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import login from './src/auth/login'
import signup from './src/auth/signup';
import Welcome from './src/auth/welcome';

const Navigator = createStackNavigator({
  Welcome: { screen: Welcome, headerShown: false },
  login: { screen: login },
  signup: { screen: signup },
});

const App = createAppContainer(Navigator);
export default App;
