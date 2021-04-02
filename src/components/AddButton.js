import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import getRightScale, {getRightFontScale} from "./flex";


const AddButton = props => {
    const { colors } = useTheme();

    return (
        <View style={{justifyContent: "center", alignItems: 'center', width: Dimensions.get('window').width * 0.9}}>
        <TouchableOpacity style={{...styles.button, borderColor: colors.text, marginBottom: getRightScale(1, 8), width: '100%'}} onPress={() => props.show()}>
            <Text style={{...styles.text, color: colors.text, fontSize: getRightFontScale(17)}}>ДОБАВИТЬ</Text>
            <Ionicons name='ios-add' size={30} style={{paddingRight: 5, paddingVertical: 2, color: colors.text}}/>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        borderWidth: 2,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        paddingLeft: 10,
        paddingRight: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 13
    }
})

export default AddButton
