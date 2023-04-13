import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, LogBox } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyle } from '../styles/mapStyle';

export default function Profile({ setShouldShowProfile, userID, userInfo }) {
    const getCharacter = () => {
        if (userInfo.character === 2) {
            setCharacter(true);
        } else {
            setCharacter(false);
        }
    };

    const [character, setCharacter] = useState(false);
    const [monsterLength, setMonsterLength] = useState(
        userInfo.monsters.length
    );
    useEffect(() => {
        getCharacter();
    }, []);

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
                    onPress={() => setShouldShowProfile(false)}
                >
                    <Image
                        style={styles.backButton}
                        source={require('../assets/BackButton.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleTxt}>PROFILE</Text>

                <ImageBackground
                    imageStyle={{ borderRadius: 25 }}
                    style={styles.profilePicContainer}
                    source={require('../assets/pokemon-background.jpg')}
                >
                    {character ? (
                        <Image
                            style={styles.profilePicImage}
                            source={require('../assets/girl.png')}
                        ></Image>
                    ) : (
                        <Image
                            style={styles.profilePicImage}
                            source={require('../assets/boy.png')}
                        ></Image>
                    )}
                </ImageBackground>
                <ImageBackground
                    source={require('../assets/textBox.png')}
                    style={styles.profileInfoContainter}
                >
                    <Text style={styles.profileInfoText}>
                        {userInfo.username}
                    </Text>
                    <Text style={styles.profileInfoText}>
                        Score: {userInfo.score}
                    </Text>
                    <Text style={styles.profileInfoText}>
                        Locations visited: {userInfo.monsters.length}
                    </Text>
                </ImageBackground>
            </View>
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
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 60,
        borderRadius: 25,
        resizeMode: 'cover',
        height: 250,
        width: 250,
    },
    profilePicImage: {
        objectFit: 'contain',
        width: 250,
        height: 250,
    },
    profileInfoContainter: {
        position: 'absolute',
        top: 500,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        resizeMode: 'cover',
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
    map: {
        width: '100%',
        height: '100%',
    },
});
