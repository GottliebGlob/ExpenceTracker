import AsyncStorage from '@react-native-community/async-storage';



function setAppLaunched(key) {
    AsyncStorage.setItem(key, 'true');
}

export default async function checkIfFirstLaunch(type) {
    if (type=== 'main') {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                setAppLaunched('hasLaunched');
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    else {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasOfflineLaunched');
            if (hasLaunched === null) {
                setAppLaunched('hasOfflineLaunched');
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

}
