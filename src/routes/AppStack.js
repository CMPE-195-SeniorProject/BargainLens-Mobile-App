import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/main/Home';

const Navigator = createStackNavigator({
    Home: { screen: Home, navigationOptions: { headerShown: false} }
});

export default createAppContainer(Navigator);