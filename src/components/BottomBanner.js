import React, {useEffect} from 'react'
import {StyleSheet, View} from "react-native";
import {AdMobBanner, setTestDeviceIDAsync} from "expo-ads-admob";
import Constants from 'expo-constants';


const BottomBanner = () => {
    const testID = 'ca-app-pub-3940256099942544/6300978111';
    const productionID = 'ca-app-pub-2960656434741323/7926221122';

    const adUnit = Constants.isDevice && !__DEV__ ? productionID : testID;

    useEffect(() => {
        if (__DEV__) {
            setTestDeviceIDAsync("EMULATOR");
        }

    }, []);



    return (
        <View  style={styles.bottomBanner}>
            <AdMobBanner
                bannerSize="banner"
                adUnitID={adUnit}
                onDidFailToReceiveAdWithError={(e) => console.log(e)}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    bottomBanner: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center'
    },
})

export default BottomBanner
