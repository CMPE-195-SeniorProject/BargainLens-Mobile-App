import React from "react";
import styles from "../style";
import {Text, View, ImageBackground, ScrollView} from 'react-native';

export default class Result extends React.Component {
    constructor() {
        super();
        this.state = {
          item: '',
          showModal: false,
          error: ""
        };
      }

  render() {
    const { items, result } = this.props.navigation.state.params;

    //Render the results list showing the item name given from the TensorFlow prediction array 
    return (
          <ImageBackground source={ require('../../../assets/result.png')} style={styles.loginScreenContainer}> 
            <View style={styles.ResultsForm}>
              <Text style={styles.ResultHeader}>{result}</Text>
              <ScrollView>
                {/*Item Name is rendered from Home.js and parsed with JSON fucntions for formatting purposes*/}
                {
                  items.map(element => (<Text id={element.id} style={styles.resultPage}>STORE: {element.store} @ ${element.price}</Text>)) 
                }
              </ScrollView> 

            </View>
          </ImageBackground>
    );
  }

}