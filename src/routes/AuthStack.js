import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const Navigator = createStackNavigator({
    Login: { screen: Login, headerShown: false },
    Signup: { screen: Signup, headerShown: false }
});

export default createAppContainer(Navigator);