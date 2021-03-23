import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,

} from 'react-native';

import BottomBanner from "../components/BottomBanner";
import Quotes from "../components/Quotes";


export const StartupScreen = (theme) => {

      const backgroundColor = theme.theme === 'dark' ? '#616161' : '#fff'
      const textColor = theme.theme === 'dark' ? '#dadada' : '#000'

    return (
        <View style={{...styles.screen, backgroundColor: backgroundColor}}>
            <Quotes theme={theme.theme}/>
            <ActivityIndicator size={50} color={textColor} />
            <BottomBanner />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%'
    }
});

