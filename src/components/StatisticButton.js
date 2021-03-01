import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";


const StatisticButton = props => {

    const { colors } = useTheme();

    const data = props.data
    const monthData = props.monthData
    const value = props.value
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Statistics', {data: data, monthData: monthData, value: value})}>
                <Text style={{...styles.text, color: colors.headertext}}>СТАТИСТИКА</Text>
                <Ionicons name='ios-stats' size={30} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
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
    }
})

export default StatisticButton
