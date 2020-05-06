/**
 * Navigation stack for navigating user through the 
 * main feature screens of the app
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/main/Home';
import Result from '../screens/main/Result';

const Navigator = createStackNavigator({
    Home: { screen: Home, navigationOptions: { headerShown: false} },
    Result: { screen: Result, navigationOptions: { headerShown: false} }
});

export default createAppContainer(Navigator);