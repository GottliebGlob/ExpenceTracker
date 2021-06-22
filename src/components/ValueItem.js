import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio} from "react-native"
import {useTheme} from "@react-navigation/native";
import {getRightTextValue} from "./getValue";


const ValueItem = props => {
    const { colors } = useTheme();

    const conditionalStyles = () => {

        if (props.curValue === props.name) {
            return colors.confirm
        }
    }

    const confirmHandler = () => {
        props.toggleValue(props.name)
        props.setValueModalVisible(false)

    }

    return (
        <TouchableOpacity style={{...styles.wrapper, backgroundColor: conditionalStyles(), width: (Dimensions.get('window').width * 0.9) / 4.8,  height: (Dimensions.get('window').width * 0.9) / 4.8, borderColor: colors.dark}} onPress={() => confirmHandler()}>
            <Text style={{...styles.text, color: colors.text, fontSize:  14 / PixelRatio.getFontScale()}}>{getRightTextValue(props.name)}</Text>
            <Text style={{...styles.text, color: colors.text, fontSize:  14 / PixelRatio.getFontScale()}}>{props.sign}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 5,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    }
})

export default ValueItem
