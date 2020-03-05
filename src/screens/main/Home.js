import React from "react";
import styles from "../auth/style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            emailVerification: false,
            error: "",
            user: {}
    };

    this.logout = this.logout.bind(this);
  }

    logout = async () => {
        try {
            Auth.signOut()
                .then(data => {
                    console.log(data);
                    this.props.screenProps.authenticate(false);
                })
            .catch(err => console.log(err));
        } catch (err) {
        console.log(err);
        }
    }
  
    static navigationOptions = ({ navigation }) => {
        return {
            headerMode: 'none',
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
                <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.logout()}
                title="Logout"
                />
            </View>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        );
    }

}
