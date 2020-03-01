import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';


export default class Signup extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: null, 
      headerStyle: {
        backgroundColor: '#77dd77',
        borderColor: '#77dd77',
        shadowColor: 'transparent',
      },
    };
  };
  render() 
  {
    const { navigate, state } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Sign Up</Text>
            <TextInput placeholder="email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <TextInput placeholder="re-enter password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title= "Create Account"
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

}