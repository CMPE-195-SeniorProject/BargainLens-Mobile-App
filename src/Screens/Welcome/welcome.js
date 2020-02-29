import React, { Component } from "react";
import styles from "./welc-style.js";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';

export default class Welcome extends React.Component {
     static navigationOptions = {
        title: 'Welcome',
    };
 
    render() 
  {
      const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.loginScreenContainer}>
          <Text style={styles.logoText}>Welcome to BargainLens!</Text>
            <Button
              buttonStyle={styles.welcbuttons}
              onPress={() => navigate(
                  'signup', { name: ''}
              )}
              title= "Sign Up"
            />
            <Button
              buttonStyle={styles.welcbuttons}
              onPress={() => navigate(
                  'login', { name: ''}
              )}
              title= "Log In"
            />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
