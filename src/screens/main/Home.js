/**
 * This file serves as the application's main screen. This screen will render the camera which will allow
 * users to take pictures of items that will be processed with TensorFlow for classification.
 */
import React from 'react';
import styles from "../auth/style";
import { Button, Dimensions, ImageBackground, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
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

//Database query to fetch stores and inventory
const query = `
    query {
        listStores{
        items{
            name
            inventory{
            items{
                name
                price
            }
            }
        }
        }
    }
`

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            stores: null,
            image: null,
            model: null,
            prediction: null,
            isTfReady: false,
            isModelReady: false,
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            error: ""
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
                    console.log(data);
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
        console.log("Getting camera type")
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
            const tensor = this.imageToTensor(base64);   //Convert raw image data to tensor
            const predictions = await this.state.model.classify(tensor);    //Pass tensor to model for prediction
            this.setState({ predictions });
            console.log(predictions)
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Create a text component to render results of prediction
     * input: prediction (Object)
     * output: Text Component
     */
    renderPrediction = prediction => {
        return (
          <Text key={prediction.className} style={styles.text}>
            {prediction.className}
          </Text>
        )
    }
    
    //Fetch store data, get permission to access camera, load Tensorflow and model
    async componentDidMount() {
        await API.graphql(graphqlOperation(query))
            .then( database => {
                const stores = database.data.listStores.items;
                this.setState({ stores });
                console.log("Database loaded");
                console.log(stores);
            })
            .catch(err => console.log("Database failed to load: ", err));

        await this.getPermissionAsync();

        await tf.ready()
            .then(data => {
                this.setState({isTfReady: true});
                console.log('Tensor ready')})
            .catch(err => console.log("There was an error", error));
      
        await mobilenet.load()
            .then(model => {
                this.setState({isModelReady: true});
                this.setState({ model: model });
                console.log('Model ready')})
            .catch(err => console.log("There was an error", error));
    }
  
    render() {
        const { navigate, state } = this.props.navigation
        const { cameraType, isTfReady, isModelReady, prediction, image, hasPermission, model } = this.state

        if (hasPermission === null || isTfReady === false || isModelReady == false || model === null) {
            return <View />; //First condition should be a loading screen
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
                                        buttonStyle={{postion: 'absolute', bottom: 0 }}
                                        color='red'
                                        onPress={() => this.setState({ image: null })}
                                        title="Retake"
                                    />
                                    <Button
                                        buttonStyle = {{postion: 'absolute', bottom: 0}}
                                        color='green'
                                        onPress={() => this.classifyImage()}
                                        title="Accept"
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

