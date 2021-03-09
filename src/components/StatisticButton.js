import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";


const StatisticButton = props => {

    const { colors } = useTheme();

    const data = props.data
    const monthData = props.monthData
    const value = props.value
    const aim = props.aim
    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Statistics', {data: data, monthData: monthData, value: value})} style={styles.container1}>
                <Text style={{...styles.text, color: colors.headertext}}>СТАТИСТИКА</Text>
                <Ionicons name='ios-stats' size={30} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Settings', {userId: props.userId, value: props.value, aim: aim})} style={styles.container2}>
                <Ionicons name='ios-settings' size={28} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
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
        height: 60,
        width: '100%',

    },
    text: {
        paddingVertical: 10,
        fontWeight: 'bold'
    },
    container1: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        flexDirection: 'row',
        paddingLeft: '15%'

    },
    container2: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        paddingRight: '5%'

    },
})

export default StatisticButton
