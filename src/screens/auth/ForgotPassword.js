import React from "react";
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
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
      error: ""
    };

    this.resetPassword = this.resetPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }

  resetPassword = async () => {
    try{
        const { email, passwordReset } = this.state;
        await Auth.forgotPassword(email)
            .then(data => {
                this.setState({ passwordReset: true});
            })
            .catch(err => console.log(err));
    }catch (err) {
      //Use error message to redirect user to an error page here
      this.setState({error: err.message})
    }
  }

  confirmPassword = async () => {
    try{
        const { email, confirmationCode, newPassword, passwordConfirmation} = this.state;

        // Collect confirmation code and new password, then
        if(newPassword == passwordConfirmation){
            await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
                .then(data => this.props.navigation.navigate('Login'))
                .catch(err => console.log('error', err));
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
    const { navigate, state } = this.props.navigation;

    if(!this.state.passwordReset){
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                  <Text style={styles.authHeaderText}>Reset Password</Text>
                  <Text style={styles.statusText}>{this.state.error}</Text>
                  <Text style={styles.statusText}>Email*</Text>
                  <TextInput nativeID="email" placeholder="email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={email => this.setState({ email })} />
                  <Button
                    buttonStyle={styles.signUpButton}
                    onPress={() => this.resetPassword()}
                    title= "Continue"
                  />
                </View>
              </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          );
    }
    else {
        return(
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.authHeaderText}>Reset Password</Text>
                            <Text style={styles.statusText}>{this.state.error}</Text>
                            <Text style={styles.statusText}>New Password*</Text>
                            <TextInput nativeID="newPassword" placeholder="New Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={newPassword => this.setState({ newPassword })} />
                            <Text style={styles.statusText}>Confirm Password*</Text>
                            <TextInput nativeID="confirmPassword" placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })} />
                            <Text style={styles.statusText}>Verification Code*</Text>
                            <TextInput nativeID="confirmationCode" placeholder="Code" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={confirmationCode => this.setState({ confirmationCode })} />
                            <Button
                            buttonStyle={styles.signUpButton}
                            onPress={() => this.confirmPassword()}
                            title= "Continue"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
  }

}