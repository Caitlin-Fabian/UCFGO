import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Pressable,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyle } from '../styles/mapStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({
    navigation,
    setShouldShowSettings,
    userInfo,
}) {
    const [changeSettings, setChangeSettings] = useState(true);
    const [newName, setNewName] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const [chosen1, setChosen1] = useState(false);
    const [chosen2, setChosen2] = useState(true);

    const doLogout = () => {
        navigation.navigate('Login');
        AsyncStorage.removeItem('token_data');
    };

    const chooseMale = () => {
        setNewCharacter(1);
        setChosen1(true);
        setChosen2(false);
    };

    const chooseFemale = () => {
        setNewCharacter(2);
        setChosen2(true);
        setChosen1(false);
    };

    const handleSave = async () => {
        console.log(characterNumber);
        let js = JSON.stringify({
            character: newCharacter,
            name: newName,
            username: newUsername,
            userId: userInfo.id,
            email: newEmail,
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
                    changeSettings(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    console.log('hello');
    return (
        <View style={styles.greyOverlay}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.logoContainer}
                    source={require('../assets/Logo.png')}
                />
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    activeOpacity={0.2}
                    onPress={() => setShouldShowSettings(false)}
                >
                    <Image
                        style={styles.backButton}
                        source={require('../assets/BackButton.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleTxt}>SETTINGS</Text>
            </View>
            {changeSettings ? (
                <>
                    <TouchableOpacity
                        style={styles.changePasswordContainer}
                        onPress={() => {
                            setChangeSettings(false);
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            CHANGE PROFILE SETTINGS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            doLogout();
                        }}
                        style={styles.signOutContainer}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            SIGN OUT
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View style={styles.editingContainer}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                            }}
                        >
                            Name:
                        </Text>
                        <TextInput
                            style={styles.changeNameInput}
                            onChangeText={setNewName}
                            value={newName}
                            placeholder={userInfo.name}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                            }}
                        >
                            Email:
                        </Text>
                        <TextInput
                            style={styles.changeNameInput}
                            onChangeText={setNewEmail}
                            value={newEmail}
                            placeholder={userInfo.email}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                            }}
                        >
                            UserName:
                        </Text>
                        <TextInput
                            style={styles.changeNameInput}
                            onChangeText={setNewUsername}
                            value={newUsername}
                            placeholder={userInfo.username}
                        />
                        <View>
                            <Image
                                style={styles.character1}
                                source={require('../assets/boy.png')}
                            ></Image>
                            <Image
                                style={styles.character2}
                                source={require('../assets/girl.png')}
                            ></Image>
                            <Picker
                                selectedValue={selectedCharacter}
                                itemStyle={{ color: 'white', top: -40 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedCharacter(itemValue)
                                }
                            >
                                <Picker.Item
                                    label="Character 1"
                                    value="1"
                                />
                                <Picker.Item
                                    label="Character 2"
                                    value="2"
                                />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            doLogout();
                        }}
                        style={styles.signOutContainer}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            SAVE CHANGES
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.changePasswordContainer}
                        onPress={() => {
                            setChangeSettings(true);
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                </>
            )}
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
        top: 200,
        alignSelf: 'center',
        width: '80%',
        height: '30%',
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
        position: 'absolute',
        objectFit: 'contain',
        width: '50%',
        height: '50%',
    },
    character2: {
        width: '50%',
        height: '50%',
        left: 150,
        objectFit: 'contain',
    },
    overlay1: {
        position: 'absolute',
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        resizeMode: 'cover',
    },
    overlay2: {
        width: '50%',
        left: 100,
        resizeMode: 'cover',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
