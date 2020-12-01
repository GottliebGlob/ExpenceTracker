import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from "../colors";

const Header = props => {
return (
    <View style={styles.wrapper}>
<TouchableOpacity style={styles.container}>
    <Text style={[props.active === 'cash' ? styles.active : styles.inactive]}>{props.firstText} </Text>
</TouchableOpacity>
        <View style={styles.slash} />
<TouchableOpacity style={styles.container}>
    <Text style={[props.active === 'card' ? styles.active : styles.inactive]}> {props.secondText} </Text>
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
    text: {
      color: '#fff'
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
        borderRightColor: '#fff'
    },
    active : {
        color: '#fff'
    },
    inactive: {
        color: colors.dark
    }
});

export default Header;
