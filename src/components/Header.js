import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, PixelRatio, Image} from 'react-native';
import {useTheme} from "@react-navigation/native";
import TextAvatar from "react-native-text-avatar";
import {signOut} from "../store/actions/authAction";
import {useDispatch} from "react-redux";
import i18n from "../locales";


const Header = props => {
    const { colors } = useTheme();
    const dispatch = useDispatch()

    const signOutModalHandler = () => {
        Alert.alert(i18n.t("signOut.sure"), '', [
                {
                    text: i18n.t("signOut.cancel"),
                    style: "cancel"
                },
                { text: i18n.t("signOut.confirm"), onPress: () => {signOutHandler()}
                }
            ],
            { cancelable: false });
    }

    const signOutHandler = () => {
        dispatch(signOut())
        props.navigation.navigate('Login')

    }

    return (
    <View style={styles.wrapper}>
<View style={styles.container}>

    <Image
    style={styles.image}
    source={require('../../assets/trans-icon.png')}
    />
    <Text style={{color: colors.headertext, fontFamily: 'open-sans-bold', fontSize: 20 / PixelRatio.getFontScale()}}>Spender </Text>
</View>
    <TouchableOpacity style={styles.container} onPress={() => {signOutModalHandler()}}>

        <TextAvatar
            backgroundColor={colors.dark}
            textColor={colors.headertext}
            size={45}
            type={'circle'} // optional
        >{props.name[0] ? props.name[0] : props.name}</TextAvatar>
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
    image: {
        width: 50,
        height: 50,
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 6,
        marginRight: 5
}
});

export default Header;
