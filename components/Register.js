import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Login({navigation}){

    return (
        <View style={styles.login}>
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
                Already have an account? <Text
                    onPress={() => scrollView.current.scrollTo({x: 0})}
                    style={{textDecorationLine: 'underline'}}>
                        Log In
                </Text>
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
    )
}

const styles = StyleSheet.create({
    
})