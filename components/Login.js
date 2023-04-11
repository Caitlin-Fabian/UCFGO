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
                //value = {loginUsername}
                onChangeText={newText => setLoginUsername(newText)}
            />
            <Text style={styles.inputBoxText}>
                Password:</Text>
            <TextInput 
                style={styles.inputBox}
                secureTextEntry
                //value = {loginPassword}
                onChangeText={newText => setLoginPassword(newText)}
            />
            <Text style={styles.smallText}>
                Don't have an account? <Text 
                    onPress={() => scrollView.current.scrollTo({x: (width*.8)})}
                    style={{textDecorationLine: 'underline'}}>
                        Register
                    </Text>
            </Text>
            <View style={styles.loginButton}>
                <Pressable onPress={onPressLogIn}>
                    <Text style={styles.loginButtonText}>Confirm</Text>
                </Pressable> 
            </View>
            <Text style={styles.smallText}>
                {loginMessage}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})