import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const Statistics = ({navigation}) => {

    return(
        <View style={styles.temp}>
            <Text>Statistics</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
})
