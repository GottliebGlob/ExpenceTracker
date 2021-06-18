import React, {useState, useEffect, useMemo} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions, Animated, Easing
} from 'react-native'
import {getRightFontScale} from "./flex";
import {useTheme} from "@react-navigation/native";


export const SpendsSwitch = (props) => {
    const { colors } = useTheme();

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



    if (props.isLoading) {
        return (
            <View style={styles.mainContent}>
                <Animated.Image
                    style={{transform: [{rotate: spin}], width: 50, height: 50 }}
                    source={require('../../assets/trans-icon.png')} />
            </View>
        )
    }

    return (
        props.allSpends.length > 0 ? (
                <View style={styles.mainContent}>
                    <Text style={{...styles.text, fontSize: getRightFontScale(21), color: colors.text}}> Потрачено зa</Text>
                    <TouchableOpacity style={{...styles.flatInfo,  borderBottomColor: colors.confirm}} onPress={() => props.setFlatInfo(!props.flatInfo)}>
                        <Text style={{...styles.flatInfoText, fontSize: getRightFontScale(21), color: colors.text}}>{` ${props.flatInfo ? 'месяц: ' : 'все время: ' }`}</Text>
                    </TouchableOpacity>
                    <Text style={{...styles.text, fontSize: getRightFontScale(21), color: '#02a602'}}>
                        {((! props.flatInfo) ?  props.allSpends :  props.lastMonthSpends).map(e => Number(e.cost)).reduce((t, a) => t + a, 0)}
                        {" " + props.value}
                    </Text>
                </View>
            ) :
            (
                <View style={styles.mainContent}>
                    <Text style={{...styles.text, fontSize: getRightFontScale(21), color: colors.text}}> У вас пока нет трат</Text>
                </View>
            )
    )
}

const styles = StyleSheet.create({

    text: {
        paddingTop: 10,
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 0,
    },

    flatInfo: {
        borderBottomWidth: 2,
        height: 45,
        flexDirection: 'row'
    },
    flatInfoText: {
        paddingTop: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    }
})
