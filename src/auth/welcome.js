import React from "react";
import styles from "../auth/style";
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

export default class Welcome extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }; 
 
  render() 
  {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.welcomeScreenContainer}>
          <Text style={styles.logoText}>Welcome to BargainLens!</Text>
            <Button
              buttonStyle={styles.welcbuttons}
              onPress={() => navigate(
                  'Signup', { name: ''}
              )}
              title= "Sign Up"
            />
            <Button
              buttonStyle={styles.welcbuttons}
              onPress={() => navigate(
                  'Login', { name: ''}
              )}
              title= "Log In"
            />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
