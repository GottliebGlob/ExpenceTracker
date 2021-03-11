import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import RenderIcon from "./RenderIcon";
import {useTheme} from "@react-navigation/native";


const CatItem = props => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity onPress={() => props.catHandler(props.cat)}>
            <View>
            <View style={{...styles.wrapper, backgroundColor: props.color}}>
                <RenderIcon category={props.cat} style={1} />
            </View>
                <View style={{alignItems: 'center'}}>
                <Text style={{...styles.text, color: colors.text}}>
                    {props.name}
                </Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: (Dimensions.get('window').width /4.5),
        height: (Dimensions.get('window').width /4.5),
        margin: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    }
})

export default CatItem
