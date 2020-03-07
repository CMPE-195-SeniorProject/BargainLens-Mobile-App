import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Navigator = createStackNavigator({
    Login: { screen: Login, headerShown: false },
    Signup: { screen: Signup, headerShown: false },
    ForgotPassword: { screen: ForgotPassword, headerShown: false }
});

export default createAppContainer(Navigator);