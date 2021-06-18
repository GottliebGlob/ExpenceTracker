import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet, Animated, Easing,

} from 'react-native';

import Quotes from "../components/Quotes";



export const StartupScreen = (theme) => {
    let spinValue = new Animated.Value(0);

// First set up animation
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

      const backgroundColor = theme.theme === 'dark' ? '#17212b' : '#fff'
      const textColor = theme.theme === 'dark' ? '#dadada' : '#000'

    return (
        <View style={{...styles.screen, backgroundColor: backgroundColor}}>

            <Animated.Image
                style={{transform: [{rotate: spin}], width: 100, height: 100 }}
                source={require('../../assets/trans-icon.png')} />
            <Quotes theme={theme.theme}/>
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

