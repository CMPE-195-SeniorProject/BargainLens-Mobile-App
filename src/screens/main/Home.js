/**
 * This file serves as the application's main screen. This screen will render the camera which will allow
 * users to take pictures of items that will be processed with TensorFlow for classification.
 */
import React from 'react';
import styles from "../auth/style";
import { Button, View, Text,TouchableOpacity,Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { Base64 } from 'js-base64'; 

//TensorFlow Modules
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            emailVerification: false,
            error: "",
            user: {},
            image: null,
            model: null,
            prediction: null,
            isTfReady: false,
            isModelReady: false,
            hasPermission: null,
            cameraType: Camera.Constants.Type.back
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
     * input: image --> Raw image data (object)
     * output: Tensor
    **/
    imageToTensor = (image) => {
        const { width, height, data } = image

        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3)
        let offset = 0 // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
          buffer[i] = data[offset]
          buffer[i + 1] = data[offset + 1]
          buffer[i + 2] = data[offset + 2]
    
          offset += 3
        }

        return tf.tensor3d(buffer, [height, width, 3]);
    }

    /**
    *Convert raw image data to tensor and use against model
    */
    classifyImage = async () => {
        try {
            const imageTensor = this.imageToTensor(this.state.image);

            const predictions = await this.state.model.classify(imageTensor);
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
    
    //Get permission to access camera and then load Tensorflow and model
    async componentDidMount() {
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
        const { isTfReady, isModelReady, prediction, image, hasPermission, model } = this.state

        if (hasPermission === null || isTfReady === false || isModelReady == false || model === null) {
            return <View />;
        } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", margin:30}}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                    backgroundColor: '#fff',
                                    borderRadius: 5               
                                }}
                            >
                                <Button
                                    buttonStyle = {styles.logoutButton}
                                    onPress={() => this.logout()}
                                    title = "Logout"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1, 
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    backgroundColor: '#transparent',
                                }}
                                onPress = {()=>this.takePicture()}
                            >
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>  
                        </View>
                    </Camera>
                </View>
            );
        }
    }

    /**
     * Take picture using back camera of device
     */
    takePicture = async () => {
        if (this.camera) {
            const data = await this.camera.takePictureAsync({base64: true})
            const byteCharacters = Base64.atob(data.base64);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);

            const image = {
                data: byteArray,
                width: data.width,
                height: data.height
            };

            this.setState({image: image});
            this.classifyImage();


            // if(data.base64.length % 4 === 0){
            //     console.log('got em!');

            //     const byteArray = toByteArray(data.base64);

            //     const image = {
            //         data: byteArray,
            //         width: data.width,
            //         height: data.height
            //     };
            //     this.setState({image: image});

            //     this.classifyImage();
            // } else { console.log('fail') }
            //const imgBlob = new Blob(base64);  
        }
    }
}