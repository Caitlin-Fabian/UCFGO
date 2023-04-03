import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    Image, 
    TextInput, 
    Pressable, 
    ImageBackground, 
    Dimensions,
    Animated
} from 'react-native';
// import FormSelectorBtn from './components/FormSelectorBtn.js';

const {windowHeight, windowWidth} = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function LoginPage() {
    const [loginUsername, setLoginUsername] = useState(' ');
    const [loginPassword, setLoginPassword] = useState(' ');

    const [registerUsername, setRegisterUsername] = useState(' ');
    const [registerPassword, setRegisterPassword] = useState(' ');
    const [registerEmail, setRegisterEmail] = useState(' ');
    const [registerName, setRegisterName] = useState(' ');

    const [loginMessage, setLoginMessage] = useState(' ');
    const [registerMessage, setRegisterMessage] = useState(' ');

    const animation = useRef(new Animated.Value(0)).current;
    const scrollView = useRef();

    const interpolateL = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)'],
    });
    const interpolateR = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)'],
    });
    
    const onPressLogIn = async() => {
        await fetch('https://ucf-go.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: loginUsername,
            password: loginPassword
        })
        }).then((response) => response.json()).then((json) => {
            if(json.id != -1){
                console.log("Log in success")
                setLoginMessage("Logged in successfully")
            }
            else{
                console.log("Log in failed")
                setLoginMessage("Username or password incorrect")
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const onPressRegister = async() => {
        await fetch('https://ucf-go.herokuapp.com/api/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: registerUsername,
            password: registerPassword,
            email: registerEmail,
            name: registerName
        })
        }).then((response) => response.json()).then((json) => {
            if(json.error == "N/A"){
               console.log("Register success")
               setRegisterMessage("User registered successfully")
            }
            else{
                console.log("Register failure")
                setRegisterMessage("User invalid")
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.bgImage}
                source={require('../assets/bgcrop.jpg')}>
                <Image
                    style={styles.logo}
                    source={require('../assets/Logo.png')}
                ></Image>
                
                <View style={styles.form}>
                    {/* <View>
                        <FormSelectorBtn
                            style={styles.formSelL}
                            backgroundColor={interpolateL}
                            title='Login'
                            onPress={() => scrollView.current.scrollTo({ x: 0 })}
                        />
                        <FormSelectorBtn
                            style={styles.formSelR}
                            backgroundColor={interpolateR}
                            title='Register'
                            onPress={() => scrollView.current.scrollTo({ x: windowWidth })}
                        />
                    </View> */}
                    <ScrollView
                        ref={scrollView}
                        horizontal 
                        pagingEnabled 
                        // scrollEnabled={false}
                        // nestedScrollEnabled={false}
                        style={styles.scrollForm}>
                        {/* Login */}
                        <View style={styles.login}>
                            <Text>Login Placeholder</Text>
                            <Text style={styles.inputBoxText}>
                                Username:</Text>
                            <TextInput
                                style={styles.inputBox}
                                //value = {loginUsername}
                               onChangeText={newText => setLoginUsername(newText)}
                            />
                            <Text style={styles.inputBoxText}>
                                Password:</Text>
                            <TextInput 
                                style={styles.inputBox}
                                //value = {loginPassword}
                                onChangeText={newText => setLoginPassword(newText)}
                            />
                            <Text style={styles.smallText}>
                                {/* todo: link to register page */}
                                Don't have an account? <Text style={{textDecorationLine: 'underline'}}>Register</Text>
                            </Text>
                            <View style={styles.loginButton}>
                                {/* todo: connect login api */}
                                <Pressable onPress={onPressLogIn}>
                                    <Text style={styles.loginButtonText}>Confirm</Text>
                                </Pressable> 
                            </View>
                            <Text style={styles.smallText}>
                                {loginMessage}
                            </Text>
                        </View>
                        {/* Register */}
                        <View style={styles.login}>
                            <Text>Register Placeholder</Text>
                            <Text style={styles.inputBoxText}>
                                Username:</Text>
                            <TextInput 
                                style={styles.inputBox}
                                //value={registerUsername}
                                onChangeText={newText => setRegisterUsername(newText)}
                            />
                            <Text style={styles.inputBoxText}>
                                Password:</Text>
                            <TextInput 
                                style={styles.inputBox}
                                //value={registerPassword}
                                onChangeText={newText => setRegisterPassword(newText)}
                            />
                            <Text style={styles.inputBoxText}>
                                Name:</Text>
                            <TextInput 
                                style={styles.inputBox}
                                //value={registerName}
                                onChangeText={newText => setRegisterName(newText)}
                            />
                            <Text style={styles.inputBoxText}>
                                Email:</Text>
                            <TextInput 
                                style={styles.inputBox}
                                //value={registerEmail}
                                onChangeText={newText => setRegisterEmail(newText)}
                            />
                            <Text style={styles.smallText}>
                                {/* todo: link to login page */}
                                Already have an account? <Text style={{textDecorationLine: 'underline'}}>Log In</Text>
                            </Text>
                            <View style={styles.loginButton}>
                                {/* todo: connect login api */}
                                <Pressable onPress={onPressRegister}>
                                    <Text style={styles.loginButtonText}>Confirm</Text>
                                </Pressable> 
                            </View>
                            <Text style={styles.smallText}>
                                {registerMessage}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%'
    },
    bgImage: {
        objectFit: 'fill',
        // flex: 1,
        height: '100%',
        // width: windowWidth,
        position: 'absolute',
        tintColor: '#000'
    },
    form: {
        flex: 1,
        minHeight: 500,
        marginHorizontal: '10%',
        marginTop: '50%',
        marginBottom: '30%',
        backgroundColor: '#F2BD00',
        borderRadius: 30,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    scrollForm: {
        // flex: 2
    },
    login: {
        flex: 1,
        // margin: 25,
        width: windowWidth,
        alignContent: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        height: 40,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#D9D9D9'
    },
    inputBoxText: {
        marginHorizontal: 10,
        marginVertical: 3,
        fontSize: 25,
        fontWeight: '500'
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center'
    },
    loginButton: {
        // width: '50%',
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        // justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#D9D9D9'
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500'
    }
});