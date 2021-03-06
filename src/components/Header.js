import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from "@react-navigation/native";
import TextAvatar from "react-native-text-avatar";
import {signOut} from "../store/actions/authAction";
import {useDispatch} from "react-redux";
import {widthPercentageToDP} from "../flex";


const Header = props => {
    const { colors } = useTheme();
    const dispatch = useDispatch()

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
    <View style={styles.wrapper}>
<View style={styles.container}>
    <Text style={{color: colors.headertext, fontFamily: 'open-sans-bold', fontSize: widthPercentageToDP('5%')}}>Spender </Text>
</View>
    <TouchableOpacity style={styles.container} onPress={() => {signOutModalHandler()}}>

        <TextAvatar
            backgroundColor={colors.light}
            textColor={colors.text}
            size={45}
            type={'circle'} // optional
        >{props.name}</TextAvatar>
    </TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    wrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 60,
        justifyContent: 'space-between',
        width: '100%'
    },

});

export default Header;
