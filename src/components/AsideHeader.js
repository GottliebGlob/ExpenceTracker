import {Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useTheme} from "@react-navigation/native";
import {getRightFontScale} from "./flex";


const AsideHeader = props => {
    const { colors } = useTheme();
    let aim = 0
    let value = 0

    const onNavigate = () => {
        if(props.value && props.aim > 0) {
            aim = props.aim
            value = props.value
            props.pushLimit(aim)
        }
        props.navigation.navigate('Main', {newAim: aim, newValue: value})
    }

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.goBackIcon} onPress={onNavigate}>
                <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: getRightFontScale(18), color: colors.headertext}}>{props.placeholder}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
    mainTextContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 15,
        paddingRight: '10%'
    },
    headerWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    goBackIcon: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingLeft: 10
    },
})

export default AsideHeader
