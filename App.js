import React, { Component } from 'react';
import AuthNavigator from './src/routes/AuthStack';
import AppNavigator from './src/routes/AppStack';

//Amplify
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    };

    this.setAuth = this.setAuth.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setAuth = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  async componentDidMount() {
    try{
      const session = await Auth.currentSession();
      this.setAuth(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    }catch(err) {
      console.log('This is an error: \n', err);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    //If user is signed in show app stack (All the other screens)
    {return (!this.state.isAuthenticating && this.state.isAuthenticated 
      ? (<AppNavigator screenProps={{ authenticate: this.setAuth.bind(this) }}/>)
      //If user is not logged in show auth stack (SignIn/Register screens)
      : (<AuthNavigator screenProps={{ authenticate: this.setAuth.bind(this) }} />))
    }
  }
}
