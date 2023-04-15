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
import monsters from "./monsters";
import ActionButton from 'react-native-action-button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapStyle } from '../styles/mapStyle';
import monsterView from './monsterView';

export default function Inventory({setShouldShowInventory,monsterInfo}) {
    console.log(monsterInfo);
    const [currMonster, setCurrMonster] = useState({});
    const [monsterDescription, setMonsterDescription] = useState(false);

    const enterNewView = (monster) => {
        setCurrMonster(monster);
        setMonsterDescription(true);
    }

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
                    onPress={() => setShouldShowInventory(false)}
                >
                    <Image
                        style={styles.backButton}
                        source={require('../assets/BackButton.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleTxt}>INVENTORY</Text>
            </View>
            <View style={styles.monsterCardsContainer}>
                {monsterInfo.map((monster) => (
                    <>
                        <TouchableOpacity
                            style={styles.monsterCard}
                            onPress={() => enterNewView(monster)}
                        >
                            <Image style={styles.monster} source={monster.picture}/>
                        </TouchableOpacity>
                    </>))

                }

            </View>
            {monsterDescription && (<>
                <View style={styles.headerContainer}>
                <Image
                    style={styles.logoContainer}
                    source={require('../assets/Logo.png')}
                />
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    activeOpacity={0.2}
                    onPress={() => setMonsterDescription(false)}
                >
                    <Image
                        style={styles.backButton}
                        source={require('../assets/BackButton.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleTxt} >{currMonster.title}</Text>
            </View>
            <View >
                <ImageBackground
                        imageStyle={{ borderRadius: 25 }}
                        style={styles.mainMonsterStyle}
                        source={require('../assets/pokemon-background.jpg')}
                    >
                <Image style={styles.mainMonster} source={currMonster.picture}></Image>
                </ImageBackground>
            <ImageBackground style={styles.descriptionBackground}>
                <Text style={styles.descriptionText}>{currMonster.description}</Text>
            </ImageBackground>
            </View></>)}
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
    descriptionBackground: {
        backgroundColor:"#ffffff",
        top:'-22%',
        height:'12%',
    },
    descriptionText: {
        padding:10,
        backgroundColor:"#ffffff",
        position: 'absolute',
        top: '-15%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
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
    mainMonsterStyle: {
        backgroundColor: '#ffffff',
        top:'-8%',
        height: '80%',
        width: '100%',
        borderRadius:25
        
    },
    mainMonster: {
        top:0,
        height: "80%",
        justifyContent: 'center',
        alignSelf: 'center',
        objectFit: 'contain', // Change the scale value as needed
        borderRadius:25
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
        top:220,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', // Wrap cards to the next row when there isn't enough room
        justifyContent: 'flex-start', // Align card
      },
      monsterCard: {
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 121,
        width: 121,
        margin: 5,
      },
      monster: {
        backgroundColor: '#fff',
        height: 115,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
        // /transform: [{ scale: 0.9 }],
        objectFit: 'contain', // Change the scale value as needed
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
