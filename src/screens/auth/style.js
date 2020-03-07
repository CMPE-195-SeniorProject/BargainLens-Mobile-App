const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
  backgroundColor: '#77dd77',
},
welcomeScreenContainer: {
  flex: 1,
  backgroundColor: '#fff',
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
authHeaderText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 110,
  marginBottom: 10,
  textAlign: 'center',
},
statusText: {
  fontSize: 12,
  fontWeight: "800",
  marginTop: 0,
  marginBottom: 10,
  textAlign: 'center',
  color: 'red'
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
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
signUpButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 20,
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent'
},
welcbuttons: {
  backgroundColor: '#77dd77',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
forgotLink: {
  color: "#3897f1",
  textAlign: "center",
  marginTop: 10,
  marginBottom: 10
},
loginLink: {
  color: "#3897f1",
  textAlign: "center",
  marginTop: 20,
  marginBottom: 10
}
};
