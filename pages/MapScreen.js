import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
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
import monsters from '../components/monsters';
import Profile from '../components/ProfileModal';
import Inventory from '../components/InventoryModal';
import Settings from '../components/SettingsModal';
//import { get } from 'http';

export default function MapScreen({ route, navigation }) {
    const { userID, Name, Score } = route.params;
    var storage = require('../tokenStorage.js');

    //console.log(userID);

    const [shouldShowButtons, setShouldShowButtons] = useState(false);
    const [shouldShowProfile, setShouldShowProfile] = useState(false);
    const [shouldShowInventory, setShouldShowInventory] = useState(false);
    const [shouldShowSettings, setShouldShowSettings] = useState(false);
    const [shouldBack, setShouldBack] = useState(false);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [icons, setIcons] = useState([]);
    const [ran, setRan] = useState(false);

    const [token, setToken] = useState('');
    const [currLocation, setCurrLocation] = useState({
        coords: { latitude: 28.60160681694149, longitude: -81.20044675481425 },
    });

    function canInteract(coords) {
        const distance = Math.sqrt(
            Math.pow(coords.latitude - currLocation.coords.latitude, 2) +
                Math.pow(coords.longitude - currLocation.coords.longitude, 2)
        );
        if (distance <= 0.0008) return true;
        else return false;
    }

    //creates the icons of the monster locations
    const createIcons = async () => {
        let locations = [];
        //await getUserInfo();
        //can now user userInfo.monsters for the users current monsters

        for (let x = 0; x < monsters.length; x++) {
            locations.push({
                key: monsters[x].id,
                pos: monsters[x].pos,
                pinColor: userInfo.monsters.includes(monsters[x].id)
                    ? /*green*/ '#00FF00'
                    : /*red*/ 'FF0000',
            });
        }
        setIcons(locations);
    };

    // user to retrieve user info
    // In: UserID, jwtToken
    // Out: everything lol
    const getUserInfo = async () => {
        console.log('Token: ' + token);
        let js = JSON.stringify({
            userId: userID,
            jwtToken: token,
        });

        await fetch('https://ucf-go.herokuapp.com/api/getUserInfo', {
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
                    console.log(json);
                    setUserInfo(json);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        storage
            .retrieveToken()
            .then((data) => data)
            .then((value) => {
                console.log('Horrary' + value);
                setToken(value);
            });
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            await new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
                setCurrLocation(location)
            );
        })();
    }, [currLocation]);

    useEffect(() => {
        getUserInfo();
    }, [token]);

    useEffect(() => {
        if (userInfo.monsters != null && userInfo.monsters.length !== 0) {
            console.log('markers online :sunglasses:');
            createIcons();
        }
        console.log('went into markers use effect');
    }, [userInfo.monsters]);

    return (
        <View style={styles.container}>
            <MapView
                provider="google"
                style={styles.map}
                initialRegion={{
                    latitude: 28.60160681694149,
                    longitude: -81.20044675481425,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.0005,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                customMapStyle={mapStyle}
            >
                {icons.map((marker) => (
                    <Marker
                        coordinate={{
                            latitude: marker.pos.lat,
                            longitude: marker.pos.lng,
                        }}
                        pinColor={marker.pinColor}
                        key={marker.key}
                        onPress={(e) =>
                            canInteract(e.nativeEvent.coordinate)
                                ? console.log('close enough')
                                : console.log('not close enough')
                        }
                    />
                ))}
            </MapView>
            <Image
                style={styles.logoContainer}
                source={require('../assets/Logo.png')}
            />
            <ActionButton autoInactive={true}>
                <ActionButton.Item
                    onPress={() => {
                        setShouldShowProfile(!shouldShowProfile);
                        setShouldShowButtons(!shouldShowButtons);
                    }}
                >
                    <Text style={styles.opTxt}>profile</Text>
                </ActionButton.Item>
                <ActionButton.Item
                    onPress={() => {
                        setShouldShowInventory(!shouldShowInventory);
                        setShouldShowButtons(!shouldShowButtons);
                    }}
                >
                    <Text style={styles.opTxt}>inventory</Text>
                </ActionButton.Item>
                <ActionButton.Item
                    onPress={() => {
                        setShouldShowSettings(!shouldShowProfile);
                        setShouldShowButtons(!shouldShowButtons);
                    }}
                >
                    <Text style={styles.opTxt}>settings</Text>
                </ActionButton.Item>
            </ActionButton>
            {shouldShowProfile ? (
                <Profile
                    setShouldShowProfile={setShouldShowProfile}
                    userID={userID}
                    userInfo={userInfo}
                />
            ) : null}
            {shouldShowInventory ? (
                <Inventory
                    setShouldShowInventory={setShouldShowInventory}
                    // monsterInfo = {userInfo.monsters}
                />
            ) : null}
            {shouldShowSettings ? (
                <Settings
                    setShouldShowSettings={setShouldShowSettings}
                    navigation={navigation}
                    userInfo={userInfo}
                />
            ) : null}
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
    opTxt: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 12,
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
    map: {
        width: '100%',
        height: '100%',
    },
});
