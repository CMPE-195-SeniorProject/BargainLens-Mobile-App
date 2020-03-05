import React from "react";
import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class  Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailVerification: false,
      error: "",
      user: {}
    };

    this.attemptSignIn = this.attemptSignIn.bind(this);
  }

  attemptSignIn = async () => {
      try {
          console.log('my props', this.props.screenProps);
          const user = await Auth.signIn(this.state.username, this.state.password);
          console.log(user);
          this.setState({ user });
          this.props.screenProps.authenticate(true);
      } catch (err) {
        console.log(err);
        this.setState({error: err.message});
          // if (err.code === 'UserNotConfirmedException') {
          //     // The error happens if the user didn't finish the confirmation step when signing up
          //     // In this case you need to resend the code and confirm the user
          //     // About how to resend the code and confirm the user, please check the signUp part
          // } else if (err.code === 'PasswordResetRequiredException') {
          //     // The error happens when the password is reset in the Cognito console
          //     // In this case you need to call forgotPassword to reset the password
          //     // Please check the Forgot Password part.
          // } else if (err.code === 'NotAuthorizedException') {
          //     // The error happens when the incorrect password is provided
          // } else if (err.code === 'UserNotFoundException') {
          //     // The error happens when the supplied username/email does not exist in the Cognito user pool
          // } else {
          //     console.log(err);
          // }
      }
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
            <Text style={styles.authHeaderText}>Welcome to BargainLens!</Text>
            <Text style={styles.statusText}>{this.state.error}</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={username => this.setState({ username })} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={password => this.setState({ password })}/>
            <Text style={styles.forgotLink} onPress={() => navigate('ForgotPassword')}>Forgot Password?</Text>
            <Text style={styles.forgotLink} onPress={() => navigate('Signup')}>New user? Create Account</Text>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.attemptSignIn()}
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
