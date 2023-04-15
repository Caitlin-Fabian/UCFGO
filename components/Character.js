import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox, TouchableHighlight } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Pressable,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyle } from '../styles/mapStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Character({ navigation, setCharacter, userInfo }) {
    const [changeSettings, setChangeSettings] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [characterNumber, setCharacterNumber] = useState(0);

    console.log('HELLLLLLP ME');
    const chooseMale = () => {
        setCharacter(1);
    };

    const chooseFemale = () => {
        setCharacter(2);
    };
    const chooseCharacter = async () => {
        console.log(characterNumber);
        let js = JSON.stringify({
            character: characterNumber,
            name: null,
            username: null,
            userId: userInfo.id,
            email: null,
        });

        await fetch('https://ucf-go.herokuapp.com/api/updateUser', {
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
                    setMessage('API IS NOT WORKING');
                } else {
                    setCharacter(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.greyOverlay}>
            <View style={styles.characterContainer}>
                <Image
                    style={styles.logoContainer}
                    source={require('../assets/Logo.png')}
                />
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    activeOpacity={0.2}
                    onPress={() => {}}
                />
                <Text style={styles.titleTxt}>Choose Your Character!</Text>
                <View style={styles.characterContainer1}>
                    <TouchableHighlight
                        onPress={() => {
                            chooseMale();
                        }}
                    >
                        <Image
                            style={styles.character1}
                            source={require('../assets/boy.png')}
                        ></Image>
                    </TouchableHighlight>
                </View>
                <View style={styles.characterContainer2}>
                    <TouchableHighlight
                        onPress={() => {
                            chooseFemale();
                        }}
                    >
                        <Image
                            style={styles.character2}
                            source={require('../assets/girl.png')}
                        />
                    </TouchableHighlight>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    console.log('Yay');
                }}
                style={styles.signOutContainer}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    CHOOSE!
                </Text>
            </TouchableOpacity>
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
        height: 50,
        width: 50,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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
        width: '100%',
    },
    backButtonContainer: {
        position: 'absolute',
        height: '5%',
        height: '5%',
        top: 65,
        left: 25,
    },
    backButton: {
        height: 35,
        width: 35,
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
        fontSize: 40,
    },
    profilePicContainer: {
        position: 'absolute',
        top: 220,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 250,
        width: 250,
    },
    profileInfoContainter: {
        position: 'absolute',
        top: 500,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 300,
        width: 350,
    },
    monsterCardsContainer: {
        position: 'absolute',
        top: 220,
        alignSelf: 'center',
        height: 570,
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    monsterCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 100,
        width: 100,
    },
    changePasswordContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '80%',
        height: '7%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutContainer: {
        position: 'absolute',
        bottom: 115,
        alignSelf: 'center',
        width: '80%',
        height: '7%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editingContainer: {
        top: 300,
        alignSelf: 'center',
        width: '80%',
        height: '30%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeNameInput: {
        height: 40,
        borderWidth: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    character1: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    },
    character2: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    characterContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 250,
        backgroundColor: '#ffc700',
        textAlign: 'center',
    },
    characterContainer1: {
        position: 'absolute',
        top: 300,
        left: 200,
        width: '50%',
        height: 300,
    },
    characterContainer2: {
        position: 'absolute',
        top: 300,
        right: 200,
        width: '50%',
        height: 300,
    },
});
