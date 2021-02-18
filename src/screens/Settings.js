import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native'
import {useTheme} from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions/themeAction";
import AsideHeader from "../components/AsideHeader";

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
    <View style={styles.main}>
        <AsideHeader navigation={navigation} placeholder="НАСТРОЙКИ"/>
        <View style={styles.rows}>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: colors.text}}>
                Темная тема:
            </Text>
        <Switch
            trackColor={{ false: colors.accent, true: colors.accent }}
            thumbColor={colors.dark}
            onValueChange={toggle}
            value={isDark}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 5, marginLeft: 5 }}
        />
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
    }
})
