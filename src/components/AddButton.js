import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons";


const AddButton = props => {


    return (
        <View>
        <TouchableOpacity style={styles.button} onPress={() => props.show()}>
            <Text style={styles.text}>ДОБАВИТЬ</Text>
            <Ionicons name='ios-add' size={35} style={{paddingRight: 10, paddingVertical: 2}}/>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        borderColor: '#5d5c61',
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
        color: 'black',
        fontWeight: 'bold'
    }
})

export default AddButton
