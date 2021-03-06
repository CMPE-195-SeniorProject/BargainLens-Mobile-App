/**
 * Component for the Forgot Password screen. Contains a form where user enter email.
 * Once email is submitted form updates to require a verification code that was sent to user's 
 * email and the account's new password
 */
import React from "react";
import styles from "../style";
import {Keyboard, Text, View, Modal, TextInput, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';


export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      passwordConfirmation: "",
      confirmationCode: "",
      passwordReset: false,
      showModal: false,
      error: ""
    };

    this.resetPassword = this.resetPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }

  /**
   * Function for intiating the resetting of an accounts password
   * in the event that it is forgotten
   */
  resetPassword = async () => {
    try{
        const { email } = this.state;
        await Auth.forgotPassword(email)
            .then(data => {
                this.setState({ passwordReset: true, showModal: true, error: "" });
            })
            .catch(err => this.setState({error: err.message}));
    }catch (err) {
      //Use error message to redirect user to an error page here
      this.setState({error: err.message})
    }
  }

  /**
   * Send email, password, and confirmation code (from email) to Amplify
   * to confirm the user's new password
   */
  confirmPassword = async () => {
    try{
        const { email, confirmationCode, newPassword, passwordConfirmation} = this.state;

        // Collect confirmation code and new password, then
        if(newPassword == passwordConfirmation){
            await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
                .then(data => this.props.navigation.navigate('Login'))
                .catch(err => this.setState({error: err.message}));
        }
        else{
            this.setState({ error: "Passwords do not match" })
        }
    }catch (err) {
      //Let's redirect user to an error page here
      this.setState({error: err.message})
    }
  }

  render() 
  {
    const { passwordReset, showModal } = this.state

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
                <View style={styles.resetNotificationView}>
                  <Text style={{textAlign: "center", fontSize: 18, fontWeight: "bold"}}>Check email for verification code</Text>
                  <Button
                    title="Close"
                    backgroundColor="#e92b2b"
                    buttonStyle={{marginTop:55, borderRadius: 10}}
                    onPress={() => this.setState({showModal:false})}
                  />
                </View>
              </View>
            </Modal>
          <View>
            <Text style={styles.authHeaderText}>{!passwordReset ? 'Forgot Password' : 'Reset Password'}</Text>
          </View>
          {!passwordReset
            //Form to enter email
            ?(<View style={styles.forgotPasswordFormView}>
                <Text style={styles.statusText}>{this.state.error}</Text>
                <TextInput nativeID="email" placeholder="email" placeholderColor="#c4c3cb"  placeholderTextColor = "white" style={styles.loginFormTextInput} onChangeText={email => this.setState({ email })} />
                <Button
                  buttonStyle={styles.signUpButton}
                  onPress={() => this.resetPassword()}
                  title= "Continue"
                />
                <Button
                  buttonStyle={styles.signUpButton}
                  onPress={() => this.props.navigation.navigate('Login')}
                  title= "Go Back"
                />
              </View>)
              //Form to enter new password
              :(<View style={styles.loginScreenContainer}>
                  <View style={styles.resetPasswordFormView}>
                      <Text style={styles.statusText}>{this.state.error}</Text>
                      <TextInput nativeID="newPassword" placeholder="New Password" secureTextEntry={true}  placeholderTextColor = "white" style={styles.loginFormTextInput} onChangeText={newPassword => this.setState({ newPassword })} />
                      <TextInput nativeID="confirmPassword" placeholder="Confirm Password" secureTextEntry={true}  placeholderTextColor = "white" style={styles.loginFormTextInput} onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })} />
                      <TextInput nativeID="confirmationCode" placeholder="Code" style={styles.loginFormTextInput}  placeholderTextColor = "white" onChangeText={confirmationCode => this.setState({ confirmationCode })} />
                      <Button
                      buttonStyle={styles.signUpButton}
                      onPress={() => this.confirmPassword()}
                      title= "Continue"
                      />
                  </View>
                </View>)
          }
        </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}