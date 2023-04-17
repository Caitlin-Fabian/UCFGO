import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Animated,
} from 'react-native';
import FormSelectorBtn from '../components/FormSelectorBtn.js';
import jwt_decode from 'jwt-decode';
import ActionButton from 'react-native-action-button';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function LoginPage({ route, navigation }) {
    const [message, setMessage] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerName, setRegisterName] = useState('');

    const [loginMessage, setLoginMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

    const animation = useRef(new Animated.Value(0)).current;
    const scrollView = useRef();

    const {verifyText} = route.params ? route.params:"";

    var storage = require('../tokenStorage.js');
    var jwtDecode = require('jwt-decode');

    const interpolateL = animation.interpolate({
        inputRange: [0, width * 0.8],
        outputRange: ['rgba(27,27,27,1)', 'rgba(27,27,27,0.4)'],
    });
    const interpolateR = animation.interpolate({
        inputRange: [0, width * 0.8],
        outputRange: ['rgba(27,27,27,0.4)', 'rgba(27,27,27,1)'],
    });

    // Login Function
    // In: username, password
    // Out: none
    // AsyncStorage Name, Score, ID
    const onPressLogIn = async () => {
        let js = JSON.stringify({
            username: loginUsername.trim(),
            password: loginPassword.trim(),
        });
        await fetch('https://ucf-go.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: js,
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.error) {
                    setLoginMessage('User/Password combination incorrect');
                }  else {
                    var ud;
                    console.log('Success');
                    storage.storeToken(json);
                    console.log('Im here now');
                    setLoginUsername('');
                    setLoginPassword('');
                    storage
                        .retrieveToken()
                        .then((data) => data)
                        .then((value) => {
                            // console.log('Horrary' + value);
                            ud = jwt_decode(value);
                            if(!ud.isVerified){
                                setLoginMessage("User Verified, please log in again!");
                                navigation.navigate('Email',"");
                            }
                            else{
                                console.log(ud);
                                navigation.navigate('Map', {
                                    userID: ud.userID,
                                    Name: ud.Name,
                                    score: ud.Score,
                                });
                            }
                        });
                }
                // if (json.id != -1) {
                //     console.log('Log in success');
                //     console.log('json response:', JSON.stringify(json));
                //     console.log('userID:', JSON.stringify(json.id));
                //     console.log('json response:', JSON.stringify(json.Name));
                //     setLoginMessage('Logged in successfully');

                //     // if(){//isverified
                //     // navigation.navigate("Map", {
                //     //     userID: (json.id),
                //     //     userName: (json.Name)
                //     // })
                //     // }
                //     // else{
                //     //     navigation.navigate("Email")
                //     // }
                // } else {
                //     console.log('Log in failed');
                //     setLoginMessage('Username or password incorrect');
                // }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Register Function
    const onPressRegister = async () => {
        let js = JSON.stringify({
            username: registerUsername.trim(),
            password: registerPassword.trim(),
            name: registerName.trim(),
            email: registerEmail.trim(),
        });

        console.log('js sent' + js);
        await fetch('https://ucf-go.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: js,
        })
            .then((response) => response.text())
            .then((res) => {
                console.log(res);
                try {
                    json = JSON.parse(res);
                    console.log(json.error);
                    if (json.error == 'N/A') {
                        console.log('Register success');
                        var emailJson = {
                            userEmail: registerEmail,
                        };
                        setRegisterMessage('User registered successfully');
                        setRegisterUsername('');
                        setRegisterPassword('');
                        setRegisterName('');
                        setRegisterEmail('');
                        navigation.navigate('Email', emailJson);
                        scrollView.current.scrollTo({ x: 0 });
                    } else {
                        console.log('Register failure');
                        setRegisterMessage('User invalid');
                    }
                } catch (responseErr) {
                    console.log(responseErr);
                    setRegisterMessage('Something went wrong, try again later');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <ImageBackground
            style={styles.bgImage}
            source={require('../assets/bgcrop.jpg')}
        >
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/Logo.png')}
                ></Image>

                <View style={styles.form}>
                    <View style={{ flexDirection: 'row' }}>
                        <FormSelectorBtn
                            style={styles.formSelL}
                            backgroundColor={interpolateL}
                            title="Login"
                            onPress={() =>
                                scrollView.current.scrollTo({ x: 0 })
                            }
                        />
                        <FormSelectorBtn
                            style={styles.formSelR}
                            backgroundColor={interpolateR}
                            title="Register"
                            onPress={() =>
                                scrollView.current.scrollTo({ x: width * 0.8 })
                            }
                        />
                    </View>
                    <ScrollView
                        ref={scrollView}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        nestedScrollEnabled={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: { x: animation },
                                    },
                                },
                            ],
                            { useNativeDriver: false }
                        )}
                        style={styles.scrollForm}
                    >
                        {/* Login */}
                        <View style={styles.login}>
                            <Text style={styles.inputBoxText}>Username:</Text>
                            <TextInput
                                style={styles.inputBox}
                                value={loginUsername}
                                onChangeText={(newText) =>
                                    setLoginUsername(newText)
                                }
                            />
                            <Text style={styles.inputBoxText}>Password:</Text>
                            <TextInput
                                style={styles.inputBox}
                                secureTextEntry
                                value={loginPassword}
                                onChangeText={(newText) =>
                                    setLoginPassword(newText)
                                }
                            />
                            <Text style={styles.smallText}>
                                Don't have an account?{' '}
                                <Text
                                    onPress={() =>
                                        scrollView.current.scrollTo({
                                            x: width * 0.8,
                                        })
                                    }
                                    style={{ textDecorationLine: 'underline' }}
                                >
                                    Register
                                </Text>
                            </Text>
                            <Text style={styles.smallText}>
                                Forgot your password?{' '}
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Request')
                                    }
                                    style={{ textDecorationLine: 'underline' }}
                                >
                                    Click here
                                </Text>
                            </Text>
                            <TouchableOpacity
                                onPress={onPressLogIn}
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.smallText}>{loginMessage}</Text>
                        </View>
                        {/* Register */}
                        <View style={styles.login}>
                            <ScrollView>
                                <Text style={styles.inputBoxText}>
                                    Username:
                                </Text>
                                <TextInput
                                    style={styles.inputBox}
                                    value={registerUsername}
                                    onChangeText={(newText) =>
                                        setRegisterUsername(newText)
                                    }
                                />
                                <Text style={styles.inputBoxText}>
                                    Password:
                                </Text>
                                <TextInput
                                    style={styles.inputBox}
                                    secureTextEntry
                                    value={registerPassword}
                                    onChangeText={(newText) =>
                                        setRegisterPassword(newText)
                                    }
                                />
                                <Text style={styles.inputBoxText}>Name:</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    value={registerName}
                                    onChangeText={(newText) =>
                                        setRegisterName(newText)
                                    }
                                />
                                <Text style={styles.inputBoxText}>Email:</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    value={registerEmail}
                                    onChangeText={(newText) =>
                                        setRegisterEmail(newText)
                                    }
                                />
                            </ScrollView>
                            <Text style={styles.smallText}>
                                Already have an account?{' '}
                                <Text
                                    onPress={() =>
                                        scrollView.current.scrollTo({ x: 0 })
                                    }
                                    style={{ textDecorationLine: 'underline' }}
                                >
                                    Log In
                                </Text>
                            </Text>
                            <TouchableOpacity
                                onPress={onPressRegister}
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.smallText}>
                                Debug: go to email EmailVerification{' '}
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Email', {
                                            userEmail: registerEmail,
                                        })
                                    }
                                    style={{ textDecorationLine: 'underline' }}
                                >
                                    HERE
                                </Text>
                            </Text>
                            <Text style={styles.smallText}>
                                {registerMessage}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        objectFit: 'fill',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        tintColor: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%',
        height: height * 0.1,
        width: height * 0.1,
    },
    // bgImage: {
    //     objectFit: 'fill',
    //     height: '100%',
    //     position: 'absolute',
    //     tintColor: 'rgba(100,100,100,1)'
    // },
    form: {
        flex: 1,
        minHeight: height * 0.7,
        marginHorizontal: '10%',
        marginTop: '40%',
        marginBottom: '20%',
        backgroundColor: '#F2BD00',
        borderRadius: 30,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    formSelL: {
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    formSelR: {
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    scrollForm: {
        // flex: 2
    },
    login: {
        flex: 1,
        // margin: 25,
        width: width * 0.8,
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        height: 40,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#D9D9D9',
    },
    inputBoxText: {
        marginHorizontal: 7,
        marginVertical: 2,
        fontSize: 25,
        fontWeight: '500',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    loginButton: {
        // width: '50%',
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        // justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
    },
});
