import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";


const AddButton = props => {
    const { colors } = useTheme();

    return (
        <View>
        <TouchableOpacity style={{...styles.button,   borderColor: colors.text}} onPress={() => props.show()}>
            <Text style={{...styles.text, color: colors.text}}>ДОБАВИТЬ</Text>
            <Ionicons name='ios-add' size={35} style={{paddingRight: 10, paddingVertical: 2, color: colors.text}}/>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        borderWidth: 2,
        height: 45,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        paddingLeft: 10,
        paddingVertical: 10,
        paddingRight: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 13
    }
})

export default AddButton
