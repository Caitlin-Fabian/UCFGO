import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

export default function App() {
    const [shouldShowButtons, setShouldShowButtons] = useState(false);
    const [shouldShowProfile, setShouldShowProfile] = useState(false);
    const [shouldShowInventory, setShouldShowInventory] = useState(false);
    const [shouldShowSettings, setShouldShowSettings] = useState(false);
    const [shouldBack, setShouldBack] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Inserts maps API here</Text>
            <Image style={styles.logoContainer} source={require('./Logo.png') }/>
            <View style={styles.menuButton}>
                <Button title='temp' titleStyle onPress={() => setShouldShowButtons(!shouldShowButtons)}/>
            </View>
            {shouldShowButtons ? 
            (
                <View style={styles.buttonsContainer}>
                    <View style={styles.profileButton}>
                    <Button title='profile' titleStyle onPress={() => {setShouldShowProfile(!shouldShowProfile); setShouldShowButtons(!shouldShowButtons);}} />
                    </View>
                    <View style={styles.inventoryButton}>
                    <Button title='inventory' titleStyle onPress={() => setShouldShowInventory(!shouldShowInventory)}/>
                    </View>
                    <View style={styles.settingsButton}>
                    <Button title='settings' titleStyle onPress={() => setShouldShowSettings(!shouldShowSettings)}/>
                    </View>
                </View>
            )
             : null}
            {shouldShowProfile ? 
                <View style={styles.greyOverlay}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logoContainer} source={require('./Logo.png')} />
                        <TouchableOpacity style={styles.backButtonContainer} activeOpacity={0.2} onPress={() => setShouldShowProfile(!shouldShowProfile)}>
                            <Image style={styles.backButton} source={require('./BackButton.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>PROFILE</Text>
                    </View>
                </View>
            : null}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bebebe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 100
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    menuButton: {
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
    },
    greyOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(70, 70, 70, 0.8)',
        height: '100%',
        width: '100%'
    },
    backButtonContainer: {
        position: 'absolute',
        height: '5%',
        height: '5%',
        top: 65,
        left: 25
    },
    backButton: {
        height: 35,
        width: 35
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 200,
        backgroundColor: '#ffc700',
    },
    titleTxt: {
        position: 'absolute',
        top: 130,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 40
    }
});