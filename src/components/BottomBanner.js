import React, {useEffect} from 'react'
import {StyleSheet, View} from "react-native";
import {AdMobBanner, setTestDeviceIDAsync} from "expo-ads-admob";
import Constants from 'expo-constants';


const BottomBanner = () => {

    useEffect(() => {
        setTestDeviceIDAsync("EMULATOR");
    }, []);

    const testID = 'google-test-id';
    const productionID = 'my-id';

    const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

    return (
        <View  style={styles.bottomBanner}>
            <AdMobBanner
                bannerSize="banner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
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
