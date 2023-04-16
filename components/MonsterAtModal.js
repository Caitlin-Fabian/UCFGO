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

export default function MonsterAt({setShouldShowMonster,viewedMonster, isInRange, userID}) {

    const imagePath = {
        1: require('../assets/1.png'),
        2: require('../assets/2.png'),
        3: require('../assets/3.png'),
        4: require('../assets/4.png'),
        5: require('../assets/5.png'),
        6: require('../assets/6.png'),
        7: require('../assets/7.png'),
        8: require('../assets/8.png'),
        9: require('../assets/9.png'),
        10: require('../assets/10.png'),
        11: require('../assets/11.png'),
      };
    const [isMonsterInInv, setIsMonsterInInv] = useState(viewedMonster.pinColor=== '#00FF00'/*green*/ ? true: false);
    const [userGotMonster, setUserGotMonster] = useState(false);

    const onPressGiveMonster = async() => {
        console.log("gimme that monster" + viewedMonster.picture);
        await fetch('https://ucf-go.herokuapp.com/api/giveMonster', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userID,
            monsterId: viewedMonster.key,
            monsterScore: 5, 
        })
        }).then((response) => response.json()).then((json) => {
            if(json.error == 'N/A'){
               //is working right and they have the monster
               viewedMonster.pinColor = "#00FF00" //new color the marker becuase the person has found that monster
               setIsMonsterInInv(true);
               setUserGotMonster(true);
            }
            else{
                console.log(json.error);
            }
        }).catch((error) => {
            console.error(error);
        });
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
                    onPress={() => setShouldShowMonster(false)}
                >
                    <Image
                        style={styles.backButton}
                        source={require('../assets/BackButton.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleTxt}>{isMonsterInInv ? viewedMonster.title : "???"}</Text>
                <ImageBackground
                    imageStyle={{ borderRadius: 25 }}
                    style={styles.profilePicContainer}
                    source={require('../assets/pokemon-background.jpg')}
                >
                        <Image
                            style={[styles.profilePicImage, !isMonsterInInv && styles.silhouette]}
                            source={imagePath[viewedMonster.key]}
                        ></Image>
                </ImageBackground>
                {!isMonsterInInv && isInRange && (
                    <TouchableOpacity style = {styles.getButtonContainer} onPress={onPressGiveMonster}>
                         <Text style={styles.getMonsterTxt}>Get This Monster</Text>
                    </TouchableOpacity>
                )}
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
    silhouette: {
        tintColor:"#008fff"
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
    getMonsterTxt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },
    profilePicContainer: {
        position: 'absolute',
        top: 200,
        alignSelf: 'center',
        //alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 25,
        resizeMode: 'cover',
        height: '150%',
        width: '100%',
    },
    profilePicImage: {
        objectFit: 'contain',
        top: 50,
        width: 400,
        height: 400,

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
    profileInfoText: { marginTop: 10, fontWeight: 'bold', fontSize: 20 },
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
    getButtonContainer: {
        top: '350%',
        height:'50%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
