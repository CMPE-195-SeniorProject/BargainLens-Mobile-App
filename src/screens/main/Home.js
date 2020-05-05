/**
 * This file serves as the application's main screen. This screen will render the camera which will allow
 * users to take pictures of items that will be processed with TensorFlow for classification.
 */
import React from 'react';
import styles from "../style";
import {Button,Dimensions, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { Base64 } from 'js-base64'; 

//TensorFlow Modules
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            items: null,
            image: null,
            model: null,
            prediction: null,
            isTfReady: false,
            isModelReady: false,
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            error: "",
        }
        
        this.logout = this.logout.bind(this);
    }

    //----------------------------- LOGOUT COMPONENTS -----------------------------
    /**
     * Log user out
     */
    logout = async () => {
        try {
            Auth.signOut()
                .then(data => {
                    this.props.screenProps.authenticate(false);
                })
            .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }
    
    //-------------------- CAMERA COMPONENTS ---------------------------------------
    /**
     * Determine camera type based on device running the app
     */    
     handleCameraType=()=>{
        const { cameraType } = this.state
        this.setState({
            cameraType: cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        });
    }

    /**
     * Get permision to access device's camera
     */
    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }
    
    //-------------------- TENSORFLOW LOGIC -------------------------------------
    /**
     * Convert image to tensor format to be processed for inference
     * input: rawData --> Raw image data in Base64 format (String)
     * output: Tensor
    **/
    imageToTensor = (rawData) => {
        const byteCharacters = Base64.atob(rawData);    //Convert encoded data into ASCII characters
        const byteNumbers = new Array(byteCharacters.length);

        //Convert character into unicode
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers); //Instantiate an array of bytes
        return decodeJpeg(byteArray);  //Decode bytes into binary
    }

    /**
    *Convert raw image data to tensor and pass to model for prediction
    */
    classifyImage = async () => {
        try {
            const { base64 } = this.state.image;
            const tensor = this.imageToTensor(base64); //Convert raw image data to tensor
            const predictions = await this.state.model.classify(tensor); //Pass tensor to model for prediction
            //changes prediction state and passes the tensor array to index 0 
            this.setState({prediction: JSON.stringify(predictions[0].className).slice(1,-1)}); 
        } catch (error) {
            console.log(error);
        }
    }

    //-------------------- DATABASE QUERY -------------------------------------
    /**
     * Query items from database based on prediction
     * input: item (String)
     * output: void
     */
    getItems = async (item) => {
        //Database query to fetch list of items
        const query =  `
            query listItems {
                listItems(filter:{ name:{
                    eq:${item}
                }}){
                items{
                    id
                    name
                    price
                    store
                    }
                }
                }
        `
        await API.graphql(graphqlOperation(query))
            .then( result => {
                const items = result.data.listItems.items;
                this.setState({ items }); //list of all the apples
            })
            .catch(err => console.log("Database failed to load: ", err));
    }

    //Fetch store data, get permission to access camera, load Tensorflow and model
    async componentDidMount() {
        await this.getPermissionAsync();

        await tf.ready()
            .then(data => {
                this.setState({isTfReady: true});
            })
            .catch(err => console.log("There was an error", error));
      
        await mobilenet.load()
            .then(model => {
                this.setState({isModelReady: true});
                this.setState({ model: model });
            })
            .catch(err => console.log("There was an error", error));
    }
  
    render() {
        const { cameraType, isTfReady, isModelReady, image, hasPermission, model } = this.state

        if (hasPermission === null || isTfReady === false || isModelReady == false || model === null) {
            return <View/>; //First condition should be a loading screen
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {image === null ?
                        //Display Camera if no picture is set
                        (<Camera style={{ flex: 1 }} type={cameraType}  ref={ref => {this.camera = ref}}>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 30}}>
                                <TouchableOpacity style={styles.logoutButtonContainer}>
                                    <Button
                                        buttonStyle = {styles.logoutButton}
                                        onPress={() => this.logout()}
                                        title = "Logout"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.cameraButtonContainer} 
                                    onPress = {()=>this.takePicture()}
                                >
                                    <FontAwesome
                                        name="camera"
                                        style={styles.cameraButton}
                                    />
                                </TouchableOpacity>  
                            </View>
                        </Camera>)
                        //Display picture of photo taken 
                        : (<ImageBackground source={{uri: image.uri}} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                                <View  style={styles.buttonContainer}>
                                    
                                    <Button
                                        buttonStyle = {{postion: 'absolute', bottom: 0 }}
                                        color='red'
                                        onPress={() => this.setState({ image: null })}
                                        title="Retake"
                                    />
                                    {/*Calls the classifyImage() function so the picture can get processed to TensorFlow*/}
                                    <Button
                                        buttonStyle = {{postion: 'absolute', bottom: 0}}
                                        color='green'
                                        onPress={async () => {
                                            await this.classifyImage();
                                            await this.getItems();
                                        }}
                                        title="Accept"
                                        color= 'green'
                                        title= "Accept"
                                    />  
                                    {/*Sends the prediction over to the Result.js*/}
                                    <Button
                                        buttonStyle = {{postion: 'absolute', bottom: 0}}
                                        color='white'
                                        title = "Results"
                                        onPress={() =>  
                                            this.props.navigation.navigate('Result', {  
                                                items: this.state.items, 
                                                result: this.state.prediction
                                            })  
                                        }  
                                    />
                                </View>
                            </ImageBackground>)}
                </View>
            );
        }
    }

    /**
     * Take picture using back camera of device and convert raw image data into binary
     */
    takePicture = async () => {
        if (this.camera) {
            const data = await this.camera.takePictureAsync({base64: true});
            const image = { ...data };
            this.setState({ image });
        }
    }
}
