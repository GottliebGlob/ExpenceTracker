import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useTheme} from "@react-navigation/native";

const AsideHeader = props => {
    const { colors } = useTheme();

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.goBackIcon} onPress={() => props.navigation.navigate('Main')}>
                <Ionicons name='md-arrow-back' size={25} style={{marginRight: 0, paddingVertical: 2, color: colors.headertext}}/>
            </TouchableOpacity>
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: 16, color: colors.headertext}}>{props.placeholder}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: '#fff',
        fontWeight: 'bold'
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
