import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio} from "react-native"
import {useTheme} from "@react-navigation/native";



const FirstDayItem = props => {
    const { colors } = useTheme();




    const conditionalStyles = () => {

        if (props.isActive === props.day) {
            return colors.confirm
        }

    }

    const confirmHandler = () => {
       props.setIsActive(props.day)
        props.setIsActiveChanged(true)
        props.setModalVisible(false)

    }


    return (
        <TouchableOpacity onPress={() => confirmHandler()}>
            <View style={{...styles.wrapper, backgroundColor: conditionalStyles(), width: (Dimensions.get('window').width * 0.9) / 9.5,  height: (Dimensions.get('window').width * 0.9) / 9.5,}}>

            <View style={{alignItems: 'center'}}>
                <Text style={{...styles.text, color: colors.text, fontSize: 16 / PixelRatio.getFontScale()}}>
                    {props.day}
                </Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 5,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    }
})

export default FirstDayItem
