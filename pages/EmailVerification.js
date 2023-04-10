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

export default function EmailVerification({navigation}) {

    return (
        <ImageBackground
        style={styles.bgImage}
        source={require('../assets/bgcrop.jpg')}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>EmailVerification</Text>
                    {/* <TextInput
                        style={styles.inputBox}
                        
                    /> */}
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
        minHeight: height*.5,
        minWidth: width*.8,
        // marginHorizontal: '10%',
        // marginTop: '40%',
        // marginBottom: '20%',
        backgroundColor: '#F2BD00',
        borderRadius: 30,
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
})