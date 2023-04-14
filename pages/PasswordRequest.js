import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function PasswordRequest({navigation}) {
    const [userEmail, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendForgotPassword = async() => {
        await fetch('https://ucf-go.herokuapp.com/api/sendForgotPassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
            }).then((response) => response.json()).then((json) => {
                if(json.error == 'N/A'){
                    console.log('Password Request Success')
                    // setErrorMessage('')
                    navigation.navigate('Password', {userEmail: userEmail})
                }
                else{
                    console.log('Password Request error')
                    setErrorMessage(json.error)
                }
            }).catch((error) => {
                console.error(error);
            });
    };
    return (
        <ImageBackground
        style={styles.bgImage}
        source={require('../assets/bgcrop.jpg')}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.smallText}>
                        Forgot your password? Enter the email associated with your account below:
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(newText) =>
                            setUserEmail(newText)
                        }
                    />
                    <TouchableOpacity
                        onPress={sendForgotPassword}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.smallText}>
                        {errorMessage}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        objectFit: 'fill',
        // flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        tintColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        // flex: 1,
        height: height * 0.5,
        width: width * 0.8,
        // marginHorizontal: '10%',
        // marginTop: '40%',
        // marginBottom: '20%',
        backgroundColor: '#F2BD00',
        borderRadius: 30,
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    inputBox: {
        height: 40,
        width: width * 0.7,
        // marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#D9D9D9'
    },
    loginButton: {
        // width: '50%',
        margin: 20,
        padding: 10,
        // alignSelf: 'center',
        // justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
    },
});