import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, PixelRatio} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import {MainContext} from "./mainContext";
import getRightScale, {getRightFontScale} from "./flex";


const StatisticButton = props => {
    const { aim, userId, value, lastMonthSpends, data } = React.useContext(MainContext);

    const { colors } = useTheme();


    return (
        <View style={{...styles.button, height: getRightScale(80, 30)}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Statistics', {data: data, monthData: lastMonthSpends, value: value})} style={styles.container1}>
                <Text style={{...styles.text, color: colors.headertext, fontSize: getRightFontScale(18)}}>СТАТИСТИКА</Text>
                <Ionicons name='stats-chart' size={25 / PixelRatio.getFontScale()} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Settings', {userId: userId, value: value, aim})} style={styles.container2}>
                <Ionicons name='ios-settings' size={25 / PixelRatio.getFontScale()} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
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
