const React = require("react-native");

const { height, width } = React.Dimensions.get('window');

export default {
  authHeaderText: {
    marginTop: height/8,
    fontSize: 40,
    fontWeight: "800",
    color: '#98f598',
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
    //fontFamily: 'monospace',

    textShadowColor: 'black',
    textShadowRadius:20,
    textShadowOffset: {width:10, height:5}
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: height-50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  cameraButton: {
    marginRight: 75,
    color: "#fff",
    fontSize: 40
  },
  cameraButtonContainer:{
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#transparent',
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 100
  },
  containerView: {
    flex: 1,
  },
  forgotLink: {
    color: "#3897f1",
    backgroundColor: "transparent",
    width:200,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  loginFormView: {
    marginTop: 80,
    width: width-(width*.05),
    height: height-(height*.52),
    //justifyContent: 'center',
    backgroundColor: '#000000c9',
    borderRadius: 50,
    //backgroundColor: 'transparent'
  },
  registerFormView: {
    marginTop: 80,
    width: width-(width*.05),
    height: height-(height*.57),
    //justifyContent: 'center',
    backgroundColor: '#000000c9',
    borderRadius: 50,
    //backgroundColor: 'transparent'
  },
  forgotPasswordFormView: {
    marginTop: 80,
    width: width-(width*.05),
    height: height-(height*.68),
    //justifyContent: 'center',
    backgroundColor: '#000000c9',
    borderRadius: 50,
    //backgroundColor: 'transparent'
  },
  resetPasswordFormView: {
    marginTop: 80,
    width: width-(width*.05),
    height: height-(height*.60),
    //justifyContent: 'center',
    backgroundColor: '#000000c9',
    borderRadius: 50,
    //backgroundColor: 'transparent'
  },
  loginFormTextInput: {
    height: 43,
    width: width-(width*.2),
    opacity:0.8,
    alignSelf: 'center',
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#0f0f0f',
    color:'#cccccc',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  registerFormTextInput: {
    height: 43,
    width: width-(width*.2),
    opacity:0.8,
    alignSelf: 'center',
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#0f0f0f',
    color:'#cccccc',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  loginLink: {
    color: "#3897f1",
    textAlign: "center",
    width:200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  loginScreenContainer: {
    flex: 1,
    width: width,
    height: height, 
    //justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: '#77dd77',
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    backgroundColor: '#fff',
    borderRadius: 5
  },
  modalView: {
    margin: 20,
    height: 250,
    backgroundColor: "#757070f5",
    borderRadius: 10,
    borderWidth: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  resetNotificationView: {
    margin: 20,
    height: 200,
    backgroundColor: "#766f6feb",
    borderRadius: 10,
    borderWidth: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  picture: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  resendConfirmationEmailLink: {
    textAlign: "center", 
    padding: 15, 
    color: "#3897f1"
  },
  signUpButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 20,
  },
  fbButton: {
    width:50, 
    height: 50,
    marginLeft: 20
  },
  googleButton: {
    width:50, 
    height: 50,
    marginRight: 20
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: 'red'
  },
  welcbuttons: {
    backgroundColor: '#77dd77',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  welcomeScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  }
};
