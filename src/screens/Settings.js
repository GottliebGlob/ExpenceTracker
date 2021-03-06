import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Alert, BackHandler,} from 'react-native'
import {useTheme} from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions/themeAction";
import AsideHeader from "../components/AsideHeader";
import {firebase} from "../firebase/config";
import { useFocusEffect } from '@react-navigation/native';
import {signOut} from "../store/actions/authAction";
import {clearState} from "../store/actions/mainAction";
import {heightPercentageToDP, widthPercentageToDP} from "../flex";


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
    const { userId, value, aim } = route.params;
    const [curValue, setCurValue] = useState(value)
    const toggleValue = () => {
        let newValue = curValue === 'RU' ? 'UA' : 'RU'
        setCurValue(newValue)
        firebase.firestore().collection('users').doc(userId).update({value: newValue})
    }


    //Limits block
    const [limit, setLimit] = useState(aim ? aim : 0)
    const handleLimit = limit => {
        console.log('limit is ' + limit)
        setLimit(limit.replace(/[^0-9]/g, ''));
    }
    const pushLimit = () => {
        firebase.firestore().collection('users').doc(userId).update({aim: limit})
    }


    //Sign out block
    const signOutModalHandler = () => {
        Alert.alert("Вы хотите выйти?", '', [
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
        navigation.navigate('LogOut')
    }


    //Handle go back
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                pushLimit()
                navigation.navigate('Main', {newAim: limit, newValue: value})
                return true;
            };
            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [limit, value])
    );

return (
    <View style={styles.main}>
        <AsideHeader navigation={navigation} placeholder="НАСТРОЙКИ" aim={limit} value={curValue} pushLimit={pushLimit}/>

        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text, fontSize: widthPercentageToDP('5%')}}>
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
            <Text style={{...styles.rowText, color: colors.text, fontSize: widthPercentageToDP('4.6%')}}>
                Предпочитаемая валюта:
            </Text>
            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: colors.accent}} onPress={toggleValue}>
                <Text style={{...styles.rowText, color: colors.dark, fontSize: widthPercentageToDP('4.6%')}}>
                    {curValue === 'RU' ? ' руб. \u20BD' : ' грн. \u20B4'}
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text, fontSize: widthPercentageToDP('4.6%')}}>
                Лимит трат на месяц:
            </Text>
            <TextInput
                placeholder="лимит"
                placeholderTextColor={colors.accent}
                style={{...styles.input, borderBottomColor: colors.accent, color: colors.dark, fontSize: widthPercentageToDP('4.6%')}}
                onChangeText={handleLimit}
                value={limit.toString()}
                keyboardType="number-pad"
                maxLenth={5}
                blurOnSubmit
            />

        </View>

        <TouchableOpacity style={styles.rows} onPress={() => {signOutModalHandler()}}>

            <Text style={{...styles.rowText,color: colors.dark, fontSize: widthPercentageToDP('5%')}}>ВЫХОД</Text>
        </TouchableOpacity>

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
        fontFamily: 'open-sans-bold',
         fontSize: 18
    },
    input: {
        width: 90,
        borderBottomWidth: 1,
        fontFamily: 'open-sans-bold',
        fontSize: 19,
        height: 30,
        paddingHorizontal: 10
    },
})
