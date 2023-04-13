import AsyncStorage from '@react-native-async-storage/async-storage';

exports.storeToken = function (tok) {
    try {
        AsyncStorage.setItem('token_data', tok.accessToken);
        console.log('Access token Hello: **** ' + tok.accessToken);
        // console.log(tok.accessToken);
    } catch (e) {
        console.log(e.message);
    }
};
exports.retrieveToken = async () => {
    try {
        //console.log('BOo');
        const data = await AsyncStorage.getItem('token_data');
        if (data !== null) {
            //console.log('data' + data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
