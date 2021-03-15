import AsyncStorage from '@react-native-community/async-storage';



function setAppLaunched() {
    AsyncStorage.setItem('hasLaunched', 'true');
}

export default async function checkIfFirstLaunch() {
    try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
            setAppLaunched();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}
