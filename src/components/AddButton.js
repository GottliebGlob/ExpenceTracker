import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/native";
import {heightPercentageToDP, widthPercentageToDP} from "../flex";


const AddButton = props => {
    const { colors } = useTheme();

    return (
        <View>
        <TouchableOpacity style={{...styles.button, borderColor: colors.text, marginBottom: Dimensions.get('window').height < 650 ? 10 : 0, width: Dimensions.get('window').height > 800 ? 140 : 120}} onPress={() => props.show()}>
            <Text style={{...styles.text, color: colors.text, fontSize: Dimensions.get('window').height > 650  ? widthPercentageToDP('3.8%') : widthPercentageToDP('3%')}}>ДОБАВИТЬ</Text>
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
        paddingRight: 0,
        fontFamily: 'open-sans-bold',
        fontSize: 13
    }
})

export default AddButton
