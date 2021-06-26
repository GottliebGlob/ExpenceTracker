import React, {useState, useCallback} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    TextInput,
    Alert,
    BackHandler,
} from 'react-native'
import {useTheme} from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions/themeAction";
import AsideHeader from "../components/AsideHeader";
import {firebase} from "../firebase/config";
import { useFocusEffect } from '@react-navigation/native';
import {signOut} from "../store/actions/authAction";
import BottomBanner from "../components/BottomBanner";
import {getRightFontScale} from "../components/flex";
import {setIsLimitDisplayed} from "../components/isLimitDisplayed";
import FirstDayModal from '../modals/FirstDayModal'
import ValueModal from "../modals/ValueModal";
import {getRightTextValue, getRightSignValue} from "../components/getValue";
import i18n from "../locales";





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
    const { userId, value, aim, isFirstDay } = route.params;
    const [curValue, setCurValue] = useState(value)
    const [valueModalVisible, setValueModalVisible] = useState(false)
    const toggleValue = (newValue) => {
        setCurValue(newValue)
        firebase.firestore().collection('users').doc(userId).update({value: newValue})
         AsyncStorage.setItem('Value', newValue)
    }


    //Limits block
    const [limit, setLimit] = useState(aim ? aim : 0)
    const handleLimit = limit => {
        setLimit(limit.replace(/[^0-9]/g, ''));
    }
    const pushLimit = () => {
        if (limit !== aim) {
            setIsLimitDisplayed(true)
            firebase.firestore().collection('users').doc(userId).update({aim: limit})
            AsyncStorage.setItem('Limit', JSON.stringify(limit))
        }

    }

    //Sign out block
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
        navigation.navigate('Login')
    }


    //First day of month block
    const [modalVisible, setModalVisible] = useState(false)
    const [isActive, setIsActive] = useState(isFirstDay ? isFirstDay : 0)
    const [isActiveChanged, setIsActiveChanged] = useState(false)

    const pushIsActive = () => {
        if (isActive === 0) {
            AsyncStorage.setItem('MonthStartsFrom', JSON.stringify(0))
        }
        if (isActive > 0 && isActiveChanged) {
            firebase.firestore().collection('users').doc(userId).update({ monthStartsFrom: isActive})
            AsyncStorage.setItem('MonthStartsFrom', JSON.stringify(isActive))
        }
    }

    //Handle go back
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                pushLimit()
                pushIsActive()
                navigation.navigate('Main', {newAim: limit, newValue: value, newMonthDay: isActive})
                return true;
            };
            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [limit, value, isActive])
    );


return (
    <View style={styles.main}>
        <AsideHeader navigation={navigation} placeholder={i18n.t("settings.header")} aim={limit} value={curValue} pushLimit={pushLimit} pushIsActive={pushIsActive} isActive={isActive} />

        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text, fontSize: getRightFontScale(19) }}>
                {i18n.t("settings.theme")}
            </Text>
        <Switch
            trackColor={{ false: colors.accent, true: colors.sign }}
            thumbColor={'black'}
            onValueChange={toggleDark}
            value={isDark}
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 5, marginLeft: 5 }}
        />
        </View>

        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text, fontSize: getRightFontScale(19) }}>
                {i18n.t("settings.value")}
            </Text>
            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: colors.confirm}} onPress={() => setValueModalVisible(true)}>
                <Text style={{...styles.rowText, color: colors.text, fontSize: getRightFontScale(19) }}>
                    {" " + getRightTextValue(curValue) + " " + getRightSignValue(curValue)}
                </Text>
            </TouchableOpacity>
            <ValueModal toggleValue={toggleValue} valueModalVisible={valueModalVisible} setValueModalVisible={setValueModalVisible} curValue={curValue} />

        </View>

        <View style={styles.rows}>
            <Text style={{...styles.rowText, color: colors.text, fontSize: getRightFontScale(19) }}>
                {i18n.t("settings.limit")}
            </Text>
            <TextInput
                placeholder={i18n.t("settings.place")}
                placeholderTextColor={colors.text}
                style={{...styles.input, borderBottomColor: colors.confirm, color: colors.text, fontSize: getRightFontScale(19) }}
                onChangeText={handleLimit}
                value={limit ? limit.toString(): ''}
                keyboardType="number-pad"
                maxLenth={5}
                blurOnSubmit
            />

        </View>

        <TouchableOpacity style={styles.rows} onPress={() => {setModalVisible(true)}}>

            <Text style={{...styles.rowText,color: colors.text, fontSize: getRightFontScale(19) }}>{i18n.t("settings.start") + ""} </Text>

            <Text style={{...styles.rowText,color: colors.confirm, borderBottomColor: colors.confirm, borderBottomWidth: 1, fontSize: getRightFontScale(20) }}>
                {isActive === 0 ? '1' : isActive}
            </Text>
            <Text style={{...styles.rowText,color: colors.text, fontSize: getRightFontScale(19) }}>
                { " " + i18n.t("settings.day")}
            </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.rows} onPress={() => {signOutModalHandler()}}>

            <Text style={{...styles.rowText,color: colors.sign, fontSize: getRightFontScale(20) }}>{i18n.t("settings.signOut")}</Text>

        </TouchableOpacity>

    <FirstDayModal setModalVisible={setModalVisible} modalVisible={modalVisible} isActive={isActive} setIsActive={setIsActive} setIsActiveChanged={setIsActiveChanged}/>

       <BottomBanner />
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
