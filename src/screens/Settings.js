import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native'
import {useTheme} from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions/themeAction";

export const Settings = ({route, navigation}) => {
    const dispatch = useDispatch();
    const color = useSelector(state => state.theme.isDark);

    const { colors } = useTheme();
    const [isDark, setIsDark] = useState(color!=='false')


    const toggle = async () => {
        setIsDark(!isDark)
        const string = String(!isDark)
        dispatch(toggleTheme(string))
        try {
            await AsyncStorage.setItem('theme', string)
        } catch (e) {
            alert(e)
        }
    }


return (
    <View>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggle}
            value={isDark}
        />
    </View>
)
}
