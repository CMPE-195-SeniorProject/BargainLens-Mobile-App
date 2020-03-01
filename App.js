import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

=======
import { NativeRouter, Switch, Route, Link } from "react-router-native";

import Landing from './src/screens/Landing';
import Signup from './src/screens/SignUp/SignUp';

//Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function App() {
    return (
      <NativeRouter>
        <View>
          <Switch>
            <Route exact path="/Landing" component={Landing} />
            <Route exact path="/Signup" componenet={Signup} />
            {/*<Route exact path="/Register" component={Register} />*/}
          </Switch>
        </View>
      </NativeRouter>
    );
}
>>>>>>> Configured Cognito User Pool on AWS


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
