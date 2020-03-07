import React from "react";
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';


export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      emailVerification: false,
      error: ""
    };

    this.registerUsers = this.registerUser.bind(this);
  }

  registerUser = () => {
    try{
      const { email, password, passwordConfirmation } = this.state;
      
      if(email === "" || password === "" || passwordConfirmation === ""){
        this.setState({error: "Please fill in all fields"})
      }else if(password !== passwordConfirmation){
        this.setState({error: "Passwords do not match"})
      }else{
        Auth.signUp({
            username: this.state.email,
            password: this.state.password,
            attributes: {
              email: this.state.email
            },
            validationData: []  //optional
            })
            .then(data => {
              console.log(data)
              this.props.navigation.navigate('Login');
            })
            .catch(err => this.setState({error: err.message}));
      }
    }catch (err) {
      //Let's redirect user to an error page here
      console.log("In here: " + err);
      this.setState({error: err.message})
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
            <Text style={styles.authHeaderText}>Sign Up</Text>
            <Text style={styles.statusText}>{this.state.error}</Text>
            <TextInput nativeID="email" placeholder="email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={email => this.setState({ email })} />
            <TextInput id="password" placeholder="password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={password => this.setState({ password })}/>
            <TextInput id="confirmPassword" placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}/>
            <Text style={styles.loginLink} onPress={() => navigate('Login')}>Already have an account?</Text>
            <Button
              buttonStyle={styles.signUpButton}
              onPress={() => this.registerUser()}
              title= "Create Account"
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

}