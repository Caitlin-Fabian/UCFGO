import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function App() {
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Inserts maps API here</Text>
            <Image style={styles.logoContainer} source={require('./Logo.png')} />
            <View style={styles.tempButton}>
                <Button title='temp' titleStyle onPress={() => setShouldShow(!shouldShow)}/>
            </View>
            {shouldShow ? 
            (
                <View style={styles.buttonsContainer}>
                    <View style={styles.profileButton}>
                    <Button title='profile' titleStyle onPress={() => setShouldShow(!shouldShow)}/>
                    </View>
                    <View style={styles.inventoryButton}>
                    <Button title='inventory' titleStyle onPress={() => setShouldShow(!shouldShow)}/>
                    </View>
                    <View style={styles.settingsButton}>
                    <Button title='settings' titleStyle onPress={() => setShouldShow(!shouldShow)}/>
                    </View>
                </View>
                
            )
             : null}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    tempButton: {
        height: 90,
        width: 90,
        position: 'absolute',
        backgroundColor: '#d4af37',
        borderRadius: 100,
        bottom: 30,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileButton: {
        height: 90,
        width: 90,
        position: 'absolute',
        backgroundColor: '#d4af37',
        borderRadius: 100,
        bottom: 140,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inventoryButton: {
        height: 90,
        width: 90,
        position: 'absolute',
        backgroundColor: '#d4af37',
        borderRadius: 100,
        bottom: 250,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsButton: {
        height: 90,
        width: 90,
        position: 'absolute',
        backgroundColor: '#d4af37',
        borderRadius: 100,
        bottom: 360,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});