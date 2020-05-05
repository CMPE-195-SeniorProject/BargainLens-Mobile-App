import React from "react";
import styles from "../style";
import {Text, View, TouchableOpacity, Button, ImageBackground, ScrollView} from 'react-native';

export default class Result extends React.Component {
    constructor() {
      super();
    }

  render() {
    const { items, result } = this.props.navigation.state.params;

    //Render the results list showing the item name given from the TensorFlow prediction array 
    return (
          <ImageBackground source={ require('../../../assets/result.png')} style={styles.loginScreenContainer}> 
            <View style={styles.ResultsForm}>
              <Text style={styles.ResultHeader}>ITEM: {result}</Text>
              <ScrollView>
                {/*Item Name is rendered from Home.js and parsed with JSON fucntions for formatting purposes*/}
                {
                  items.map(element => (<Text key={element.id} style={styles.resultPage}>
                    STORE: {element.store} @ ${element.price.toFixed(2)}</Text>)) 
                }
              </ScrollView> 
            </View>
            <TouchableOpacity style={styles.backToHome}>
              <Button
                onPress={() => this.props.navigation.navigate('Home')}
                title = "Back to Home"
                color = 'green'
                />
            </TouchableOpacity>
          </ImageBackground>
    );
  }

}