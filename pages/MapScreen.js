import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {mapStyle} from "../styles/mapStyle";

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    });

    const [shouldShowButtons, setShouldShowButtons] = useState(false);
    const [shouldShowProfile, setShouldShowProfile] = useState(false);
    const [shouldShowInventory, setShouldShowInventory] = useState(false);
    const [shouldShowSettings, setShouldShowSettings] = useState(false);
    const [shouldBack, setShouldBack] = useState(false);
    const [currLocation, setCurrLocation] = useState({coords: {latitude: 28.60160681694149, longitude: -81.20044675481425}});
    const [currUser, setCurrUser] = useState('642381512c80d6309009a352');
    const monsterIds = [1, 2, 3, 4, 5, 6, 9, 10];
    const monsterScores = [30, 25, 30, 15, 15, 15, 20, 50];

    const onPressGiveMonster = async(index) => {
        await fetch('https://ucf-go.herokuapp.com/api/giveMonster', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: currUser,
            monsterId: monsterIds[index],
            monsterScore: monsterScores[index], 
        })
        }).then((response) => response.json()).then((json) => {

            if(json.error != 'N/A'){
                console.log(json.error);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    function canInteract(coords) {
        const distance = Math.sqrt(Math.pow(coords.latitude - currLocation.coords.latitude, 2) + Math.pow(coords.longitude - currLocation.coords.longitude, 2));
        if (distance <= 0.0008)
            return true;
        else
            return false;
    }

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setCurrLocation(location);
          //console.log(location)
        })();
      }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider='google' 
                style={styles.map}
                initialRegion={{
                    latitude: 28.60160681694149,
                    longitude: -81.20044675481425,
                    latitudeDelta: 0.0200,
                    longitudeDelta: 0.0005 ,
                  }}
                showsUserLocation={true}
                followsUserLocation={true}
                customMapStyle={mapStyle}
            >
                <Marker coordinate={{latitude: currLocation.coords.latitude, longitude: currLocation.coords.longitude}} onPress={e => canInteract(e.nativeEvent.coordinate) ? onPressGiveMonster(7) : console.log("not close enough")}/>
                <Marker coordinate={{latitude: 28.60160681694149, longitude: -81.20044675481425,}} onPress={e => canInteract(e.nativeEvent.coordinate) ? onPressGiveMonster(7) : console.log("not close enough")}/> 
            </MapView>
            <Image style={styles.logoContainer} source={require('../assets/Logo.png')}/>
            <ActionButton autoInactive={true}>
                <ActionButton.Item>
                    <Button title='profile' titleStyle onPress={() => {setShouldShowProfile(!shouldShowProfile); setShouldShowButtons(!shouldShowButtons);}} />
                </ActionButton.Item>
                <ActionButton.Item>
                    <Button title='inventory' titleStyle onPress={() => {setShouldShowInventory(!shouldShowInventory); setShouldShowButtons(!shouldShowButtons);}}/>                    
                </ActionButton.Item>
                <ActionButton.Item>
                    <Button title='settings' titleStyle onPress={() => {setShouldShowSettings(!shouldShowSettings); setShouldShowButtons(!shouldShowButtons);}}/>
                </ActionButton.Item>
            </ActionButton>
            {shouldShowProfile ? 
                <View style={styles.greyOverlay}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logoContainer} source={require('../assets/Logo.png')} />
                        <TouchableOpacity style={styles.backButtonContainer} activeOpacity={0.2} onPress={() => setShouldShowProfile(!shouldShowProfile)}>
                            <Image style={styles.backButton} source={require('../assets/BackButton.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>PROFILE</Text>
                        <View style={styles.profilePicContainer}></View>
                        <View style={styles.profileInfoContainter}></View>
                    </View>
                </View>
            : null}
            {shouldShowInventory ? 
                <View style={styles.greyOverlay}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logoContainer} source={require('../assets/Logo.png')} />
                        <TouchableOpacity style={styles.backButtonContainer} activeOpacity={0.2} onPress={() => setShouldShowInventory(!shouldShowInventory)}>
                            <Image style={styles.backButton} source={require('../assets/BackButton.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>MONSTERS</Text>
                    </View>
                    <View style={styles.monsterCardsContainer}>
                        <View style={styles.monsterCard}></View>
                        <View style={styles.monsterCard}></View>
                        <View style={styles.monsterCard}></View>
                    </View>
                </View>
            : null}
            {shouldShowSettings ? 
                <View style={styles.greyOverlay}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logoContainer} source={require('../assets/Logo.png')} />
                        <TouchableOpacity style={styles.backButtonContainer} activeOpacity={0.2} onPress={() => setShouldShowSettings(!shouldShowSettings)}>
                            <Image style={styles.backButton} source={require('../assets/BackButton.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>SETTINGS</Text>
                    </View>
                    <View style={styles.changePasswordContainer}><Text style={{fontWeight: 'bold', fontSize: 20}}>CHANGE PASSWORD</Text></View>
                    <View style={styles.signOutContainer}><Text style={{fontWeight: 'bold', fontSize: 20}}>SIGN OUT</Text></View>
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
        height: 50,
        width: 50,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0
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
    },
    profilePicContainer: {
        position: 'absolute',
        top: 220,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 250,
        width: 250
    },
    profileInfoContainter: {
        position: 'absolute',
        top: 500,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 300,
        width: 350
    },
    monsterCardsContainer: {
        position: 'absolute',
        top: 220,
        alignSelf: 'center',
        height: 570,
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    monsterCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 100,
        width: 100
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
        alignItems: 'center'
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
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
});