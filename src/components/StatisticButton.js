import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";


const StatisticButton = props => {
    const data = props.data
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Statistics', {data: data})}>
                <Text style={styles.text}>СТАТИСТИКА</Text>
                <Ionicons name='ios-stats' size={30} style={{paddingLeft: 15, paddingVertical: 2, color: '#fff'}}/>
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
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default StatisticButton
