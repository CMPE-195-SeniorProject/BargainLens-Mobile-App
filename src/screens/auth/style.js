const React = require("react-native");

const { StyleSheet } = React;

export default {
  authHeaderText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 110,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop:  React.Dimensions.get('window').height-50,
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
  containerView: {
    flex: 1,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent'
  },
  forgotLink: {
    color: "#3897f1",
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
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  loginLink: {
    color: "#3897f1",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10
  },
  loginScreenContainer: {
    flex: 1,
    backgroundColor: '#77dd77',
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
  picture: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  signUpButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 0,
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
