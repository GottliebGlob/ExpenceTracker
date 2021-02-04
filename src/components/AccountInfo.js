import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import TextAvatar from 'react-native-text-avatar'


import {useDispatch} from "react-redux";
import {signOut} from "../store/actions/authAction";
import {useTheme} from "@react-navigation/native";

const AccountInfo = props => {
    const dispatch = useDispatch();

    const { colors } = useTheme();

    const signOutModalHandler = () => {
        Alert.alert("Вы хотите сменить аккаунт?", '', [
                {
                    text: "ОТМЕНИТЬ",
                    style: "cancel"
                },
                { text: "ПРИНЯТЬ", onPress: () => {signOutHandler()}
                }
            ],
            { cancelable: false });
    }

    const signOutHandler = () => {
        dispatch(signOut())
        props.navigation.navigate('LogOut')

    }


    return (
        <View>
        <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary}} onPress={() => {signOutModalHandler()}}>
            <Text style={{...styles.text, color: colors.text}}>
                {props.name}
            </Text>
            <TextAvatar
                backgroundColor={colors.light}
                textColor={colors.text}
                size={55}
                type={'circle'} // optional
            >{props.name}</TextAvatar>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline',

    },
    container: {
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        height: 80,
    },
})

export default AccountInfo
