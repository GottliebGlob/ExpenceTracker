import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from '@expo/vector-icons'

import {colors} from "../colors";

const AccountInfo = props => {
    return (
        <View>
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('AuthScreen')}>
            <Text style={styles.text}>
                КТО ВЫ?
            </Text>
            <Ionicons name='ios-contact' size={60}/>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline',

    },
    container: {
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: colors.dark,
        height: 80,
        backgroundColor: colors.primary

    },
})

export default AccountInfo
