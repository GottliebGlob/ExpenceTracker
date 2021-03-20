import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import {widthPercentageToDP, heightPercentageToDP} from "../flex";


const StatisticButton = props => {

    const { colors } = useTheme();

    const data = props.data
    const monthData = props.monthData
    const value = props.value
    const aim = props.aim
    return (
        <View style={{...styles.button, height: heightPercentageToDP('7.5%')}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Statistics', {data: data, monthData: monthData, value: value})} style={styles.container1}>
                <Text style={{...styles.text, color: colors.headertext, fontSize: widthPercentageToDP('4%')}}>СТАТИСТИКА</Text>
                <Ionicons name='stats-chart' size={widthPercentageToDP('6%')} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Settings', {userId: props.userId, value: props.value, aim: aim})} style={styles.container2}>
                <Ionicons name='ios-settings' size={widthPercentageToDP('6%')} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',

    },
    text: {
        paddingVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    container1: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        flexDirection: 'row',
        paddingLeft: '20%'

    },
    container2: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        marginRight: '5%'

    },
})

export default StatisticButton
