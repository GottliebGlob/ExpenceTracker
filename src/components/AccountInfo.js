import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import TextAvatar from 'react-native-text-avatar'

import {colors} from "../colors";
import {useDispatch} from "react-redux";
import {signOut} from "../store/actions/authAction";

const AccountInfo = props => {
    const dispatch = useDispatch();

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
        <TouchableOpacity style={styles.container} onPress={() => {signOutModalHandler()}}>
            <Text style={styles.text}>
                {props.email}
            </Text>
            <TextAvatar
                backgroundColor={'black'}
                textColor={'white'}
                size={55}
                type={'circle'} // optional
            >{props.email}</TextAvatar>
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
