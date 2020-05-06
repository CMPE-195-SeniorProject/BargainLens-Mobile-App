/**
 * Navigation stack for navigating user through the 
 * auth screens of the app
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Navigator = createStackNavigator({
    Login: { screen: Login, navigationOptions: { headerShown: false} },
    Signup: { screen: Signup, navigationOptions: { headerShown: false} },
    ForgotPassword: { screen: ForgotPassword, navigationOptions: { headerShown: false} }
});

export default createAppContainer(Navigator);