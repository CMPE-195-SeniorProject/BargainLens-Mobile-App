import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import login from './src/Screens/login/login'
import signup from './src/Screens/SignUp/signup';
import Welcome from './src/Screens/Welcome/welcome';

const Navigator = createStackNavigator({
  Welcome: { screen: Welcome },
  login: { screen: login},
  signup: { screen: signup},
});

const App = createAppContainer(Navigator);
export default App;
