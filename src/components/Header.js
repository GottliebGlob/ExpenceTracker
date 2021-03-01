import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";


const Header = props => {
    const { colors } = useTheme();


return (
    <View style={styles.wrapper}>
<View style={styles.container}>
    <Text style={{color: colors.headertext, fontSize: 20, fontWeight: "bold"}}>ExpenceTracker </Text>
</View>
<TouchableOpacity onPress={() => props.navigation.navigate('Settings', {userId: props.userId, value: props.value})} style={styles.container}>
    <Ionicons name='ios-settings' size={25} style={{paddingLeft: 15, paddingVertical: 2, color: colors.headertext}}/>
</TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrapper: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 60,
        justifyContent: 'space-between'
    },


});

export default Header;
