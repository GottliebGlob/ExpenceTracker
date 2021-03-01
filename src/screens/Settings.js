import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native'
import {useTheme} from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions/themeAction";
import AsideHeader from "../components/AsideHeader";
import {firebase} from "../firebase/config";

export const Settings = ({route, navigation}) => {

   //Color block
    const dispatch = useDispatch();
    const color = useSelector(state => state.theme.isDark);
    const { colors } = useTheme();
    const [isDark, setIsDark] = useState(color!=='false')

    const toggleDark = async () => {
        setIsDark(!isDark)
        const string = String(!isDark)
        dispatch(toggleTheme(string))
        try {
            await AsyncStorage.setItem('theme', string)
        } catch (e) {
            alert(e)
        }
    }


   //Value block
    const { userId, value } = route.params;
    const [curValue, setCurValue] = useState(value)
    const toggleValue = () => {
        let newValue = curValue === 'RU' ? 'UA' : 'RU'
        setCurValue(newValue)
        firebase.firestore().collection('users').doc(userId).update({value: newValue})
    }






return (
    <View style={styles.main}>
        <AsideHeader navigation={navigation} placeholder="НАСТРОЙКИ"/>
        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text}}>
                Темная тема:
            </Text>
        <Switch
            trackColor={{ false: colors.accent, true: colors.accent }}
            thumbColor={colors.dark}
            onValueChange={toggleDark}
            value={isDark}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 5, marginLeft: 5 }}
        />
        </View>
        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text}}>
                Предпочитаемая валюта:
            </Text>
            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: colors.accent}} onPress={toggleValue}>
                <Text style={{...styles.rowText, color: colors.dark}}>
                    {curValue === 'RU' ? ' руб. \u20BD' : ' грн. \u20B4'}
                </Text>
            </TouchableOpacity>
        </View>

    </View>
)
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rows: {
        flexDirection: 'row',
        marginLeft: '5%',
        paddingVertical: 15,
        justifyContent: 'flex-start',
        height: 60
    },
    rowText: {
        fontWeight: 'bold', fontSize: 20
    }
})
