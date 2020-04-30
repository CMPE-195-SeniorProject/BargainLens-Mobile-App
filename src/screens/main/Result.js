import React from "react";
import styles from "../auth/style";
import {Text, View, Modal, ImageBackground, ScrollView} from 'react-native';

export default class Result extends React.Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          showModal: false,
          error: "",
          user: {},
          item: ''
        };
      }

  render() {
    //Render the results list showing the item name given from the TensorFlow prediction array 
    return (
          <ImageBackground source={ require('../../../assets/result.png')} style={styles.loginScreenContainer}> 
            <View style={styles.ResultsForm}>
              <ScrollView>
                {/*Item Name is rendered from Home.js and parsed with JSON fucntions for formatting purposes*/}
              <Text style={styles.ResultHeader}>ITEM: 
                {JSON.parse(JSON.stringify(this.props.navigation.state.params.callFunction))} 
              </Text>
              <Text style={styles.resultPage}>STORE: Grocery Outlet @ $1.25</Text>
              <Text style={styles.resultPage}>You Save: $.25</Text>
              <Text style={styles.resultPage}>STORE: Target @ $2.00</Text>
              <Text style={styles.resultPage}>You Save: $.13</Text>
              <Text style={styles.resultPage}>STORE: Whole Foods @ $5.00</Text>
              <Text style={styles.resultPage}>You Save: n/a</Text>
              <Text style={styles.resultPage}>STORE: Safeway @ $1.65</Text>
              <Text style={styles.resultPage}>You Save: $.10</Text>
              <Text style={styles.resultPage}>STORE: Walmart @ .50</Text>
              <Text style={styles.resultPage}>You Save: $1.00</Text>
              </ScrollView> 

            </View>
          </ImageBackground>
    );
  }

}