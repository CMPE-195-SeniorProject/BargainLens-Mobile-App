import React from "react";
import styles from "../style";
import { Keyboard, Text, View, Modal, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class  Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showModal: false,
      error: "",
      user: {}
    };

    this.attemptSignIn = this.attemptSignIn.bind(this);
    this.resendConfirmationEmail = this.resendConfirmationEmail.bind(this);
  }

  attemptSignIn = async () => {
      try {
          const user = await Auth.signIn(this.state.username, this.state.password);
          this.setState({ user });
          this.props.screenProps.authenticate(true);
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          this.setState({ showModal: true }); //Set true to make modal visible
        } else if (err.code === 'UserNotFoundException') {
               // The error happens when the incorrect password is provided
               this.setState({error: "Incorrect username or password"});
          }
        else {
          this.setState({error: "Invalid Input"});
        }
      }
  }

  resendConfirmationEmail = async () => {
    try {
      await Auth.resendSignUp(this.state.username);
      console.log('code resent succesfully');
    } catch (err) {
      console.log("Unable to send email\nError: ", err);
    }  
  }

  render() 
  {
    const { navigate } = this.props.navigation;
    const { showModal } = this.state;

    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={ require('../../../assets/background.png')} style={styles.loginScreenContainer}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={showModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>Check email for confirmation link and try loggin in again</Text>
                  <Text style={styles.resendConfirmationEmailLink} onPress={()=>this.resendConfirmationEmail()}>
                    Click here to resend confirmation email
                  </Text>
                  <Button
                    title="Close"
                    backgroundColor="#e92b2b"
                    buttonStyle={{marginTop:25, borderRadius: 10}}
                    onPress={() => this.setState({showModal:false})}
                  />
                </View>
              </View>
            </Modal>
            <View>
                <Text style={styles.authHeaderText}>BargainLens</Text>
            </View>
            <View style={styles.loginFormView}>

              <Text style={styles.statusText}>{this.state.error}</Text>
              <TextInput placeholder="Username" style={styles.loginFormTextInput} placeholderTextColor = "white" onChangeText={username => this.setState({ username })} />
              <TextInput placeholder="Password" style={styles.loginFormTextInput} placeholderTextColor = "white" secureTextEntry={true} onChangeText={password => this.setState({ password })}/>
              <Text style={styles.forgotLink} onPress={() => navigate('ForgotPassword')}>Forgot Password?</Text>
              <Text style={styles.forgotLink} onPress={() => navigate('Signup')}>New user? Create Account</Text>
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.attemptSignIn()}
                title="Login"
              />
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

}