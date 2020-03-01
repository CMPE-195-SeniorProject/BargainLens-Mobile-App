import { Auth } from '../../aws-amplify';

export default class Auth {
    constructor() {

    }

    cognitoRegister = (email, password) => {
        try{
            Auth.signUp({
                username: "ccastro715@gmail.com",
                password: "passwords",
                attributes: { 
                },
                validationData: []  //optional
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
        catch (err) {
            console.log("Error: " + err);
        }
    }

    cognitoSignin = (email, password) => {
        try{
            
        }catch (err) {

        }
    }
}