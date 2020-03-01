import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/auth/login'
import Signup from './src/auth/signup';
import Welcome from './src/auth/welcome';

//Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const Navigator = createStackNavigator({
  Welcome: { screen: Welcome, headerShown: false },
  Login: { screen: Login, headerShown: false },
  Signup: { screen: Signup, headerShown: false }
});

const App = createAppContainer(Navigator);
export default App;
