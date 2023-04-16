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
import Profile from '../components/ProfileModal';
import MonsterAt from '../components/MonsterAtModal';
import Inventory from '../components/InventoryModal';
import Settings from '../components/SettingsModal';
import Character from '../components/Character';

export default function MapScreen({ route, navigation }) {
    const imagePath = {
        1: require('../assets/1.png'),
        2: require('../assets/2.png'),
        3: require('../assets/3.png'),
        4: require('../assets/4.png'),
        5: require('../assets/5.png'),
        6: require('../assets/6.png'),
        7: null, //require('../assets/7.png'),
        8: null, //require('../assets/8.png'),
        9: require('../assets/9.png'),
        10: require('../assets/10.png'),
        11: null, //require('../assets/11.png'),
    };
    const { userID, Name, Score } = route.params;
    var storage = require('../tokenStorage.js');

    const [shouldShowButtons, setShouldShowButtons] = useState(false);
    const [shouldShowProfile, setShouldShowProfile] = useState(false);
    const [shouldShowInventory, setShouldShowInventory] = useState(false);
    const [shouldShowSettings, setShouldShowSettings] = useState(false);
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [icons, setIcons] = useState([]);
    const [character, setCharacter] = useState(false);
    const [monstersOfUser, setMonstersOfUser] = useState([]);
    const [shouldShowMonster, setShouldShowMonster] = useState(false);
    const [shouldBack, setShouldBack] = useState(false);
    const [ran, setRan] = useState(false);
    const [monsters, setMonsters] = useState([]);
    const [viewedMonster, setViewedMonster] = useState(null);
    const [isInRange, setIsInRange] = useState(null);

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
            let includes = userInfo.monsters.includes(monsters[x]._id);
            if (includes && !monstersOfUser.includes(monsters[x])) {
                setMonstersOfUser((monstersOfUser) => [
                    ...monstersOfUser,
                    monsters[x],
                ]);
            }
            //monsters[x].push({picture: imagePath[monsters[x]._id],})
            locations.push({
                key: monsters[x]._id,
                pos: {
                    latitude: parseFloat(monsters[x].lat),
                    longitude: parseFloat(monsters[x].lng),
                },
                pinColor: includes ? /*green*/ '#00FF00' : /*red*/ 'FF0000',
                picture: imagePath[monsters[x]._id],
                title: monsters[x].Name,
            });
            console.log('pos' + locations[x].picture);
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

    const chooseCharacter = () => {
        if (userInfo.character == 0) {
            setCharacter(true);
        }
    };
    const getMonsters = async () => {
        console.log('Token: ' + token);

        await fetch('https://ucf-go.herokuapp.com/api/getMonsterList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.monsterList);
                setMonsters(json.monsterList);
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
                // console.log('Horrary' + value);
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
            await new Promise((resolve) => setTimeout(resolve, 500)).then(
                () => {
                    setCurrLocation(location);
                    console.log('location ping');
                }
            );
        })();
    }, [currLocation]);

    useEffect(() => {
        getMonsters();
        getUserInfo();
    }, [token]);

    useEffect(() => {
        console.log('markers online :sunglasses:');
        createIcons();

        chooseCharacter();
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
                        coordinate={marker.pos}
                        pinColor={marker.pinColor}
                        key={marker.key}
                        onPress={(e) => {
                            canInteract(e.nativeEvent.coordinate)
                                ? setIsInRange(true)
                                : setIsInRange(false);

                            setViewedMonster(marker);
                            setShouldShowMonster(true);
                        }}
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

                {/* <Image source={require("../assets/profile.png")}></Image>  */}
                {/* <Text style={styles.opTxt}>profile</Text> */}
                </ActionButton.Item>
                <ActionButton.Item
                    onPress={() => {
                        setShouldShowInventory(!shouldShowInventory);
                        setShouldShowButtons(!shouldShowButtons);
                    }}
                >
                {/* <Image source={require("../assets/profile.png")}></Image>  */}
                </ActionButton.Item>
                <ActionButton.Item
                    onPress={() => {
                        setShouldShowSettings(!shouldShowSettings);
                        setShouldShowButtons(!shouldShowButtons);
                    }}
                >
                {/* <Image source={require("../assets/settings.png")}></Image>  */}
                </ActionButton.Item>
            </ActionButton>
            {character ? (
                <Character
                    setCharacter={setCharacter}
                    userInfo={userInfo}
                />
            ) : null}
            {shouldShowProfile ? (
                <Profile
                    setShouldShowProfile={setShouldShowProfile}
                    userID={userID}
                    userInfo={userInfo}
                />
            ) : null}
            {shouldShowMonster ? (
                <MonsterAt
                    setShouldShowMonster={setShouldShowMonster}
                    viewedMonster={viewedMonster}
                    isInRange={isInRange}
                    userID={userID}
                />
            ) : null}
            {shouldShowInventory ? (
                <Inventory
                    setShouldShowInventory={setShouldShowInventory}
                    monsterInfo={monstersOfUser}
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
