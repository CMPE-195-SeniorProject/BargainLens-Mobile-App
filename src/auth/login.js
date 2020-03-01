import React from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';

export default class  Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      emailVerification: false,
      error: ""
    };

    this.loginUsers = this.loginUser.bind(this);
  }

  loginUser = () => {

  }
  
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
            <Text style={styles.authHeaderText}>BargainLens</Text>
            <Text style={styles.statusText}>{this.state.error}</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
              color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

}
