import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from "@react-navigation/native";


const Header = props => {
    const { colors } = useTheme();


return (
    <View style={styles.wrapper}>
<TouchableOpacity style={styles.container}>
    <Text style={{color: colors.headertext}}>{props.firstText} </Text>
</TouchableOpacity>
        <View style={{...styles.slash, borderRightColor: colors.light}} />
<TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={styles.container}>
    <Text style={{color: colors.headertext}}> {props.secondText} </Text>
</TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },

    wrapper: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        height: 60,
    },
    slash: {
        height: '100%',
        width: 1,
        borderRightWidth: 1,
    },

});

export default Header;
