import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio, Alert, Animated, Easing} from "react-native"

import ProgressBar from 'react-native-progress/Bar'
import {useTheme} from "@react-navigation/native";
import {MainContext} from "./mainContext";
import {getRightFontScale} from "./flex";
import {Ionicons} from "@expo/vector-icons";
import {getRightSignValue} from "./getValue";


const AimInfo = props => {
    const { aim, userId, value, lastMonthSpends } = React.useContext(MainContext);

    const { colors } = useTheme();

    const [moneyLeft, setMoneyLeft] = useState(0)
    const [bar, setBar] = useState(0)
    const [isLimitReached, setIsLimitReached] = useState(false)

    const moneyLeftHandler = () => {
        const spends = lastMonthSpends.map(e => Number(e.cost)).reduce((t, a) => t + a, 0)
        aim - spends > 0 ? hasNotReached(spends) : hasReached(spends)
    }

    useEffect(() => {
        moneyLeftHandler()
    },[lastMonthSpends, aim])

    const hasNotReached = (spends) => {
        setMoneyLeft( aim - spends)
        setIsLimitReached(false)
        spends > 0 ? setBar(spends / aim) : setBar(0)

    }

    const hasReached = (spends) => {
        setMoneyLeft( spends - aim)
        setIsLimitReached(true)
        setBar(1)
    }

    const cancelHandler = () => {
        Alert.alert("Вы хотите отключить лимит трат?", 'Вы всегда сможете включить лимит в настройках', [
                {
                    text: "ОТМЕНИТЬ",
                    style: "cancel"
                },
                { text: "ПРИНЯТЬ", onPress: () => {props.handleLimit()}
                }
            ],
            { cancelable: false });
    }

    let spinValue = new Animated.Value(0);

// First set up animation
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const getTextColor = () => {
        if (isLimitReached) {
            return { fontFamily: 'open-sans-bold', fontSize: getRightFontScale(20), marginLeft: 5, color: colors.error };
        }
        else {
            return { fontFamily: 'open-sans-bold', fontSize: getRightFontScale(20), marginLeft: 5, color: colors.confirm };
        }
    }


    if (aim === null) {
        return (
            <View style={{...styles.loader, borderBottomColor: colors.dark, backgroundColor: colors.primary, paddingHorizontal: Dimensions.get('window').width * 0.025, height: 70}}>
                <Animated.Image
                    style={{transform: [{rotate: spin}], width: 50, height: 50 }}
                    source={require('../../assets/trans-icon.png')} />
            </View>
        )
    }

if (aim === 0) {
    return (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary, marginLeft: Dimensions.get('window').width * 0.025,}} onPress={() => props.navigation.navigate('Settings', {userId: userId, value: value})}>

                <Text style={{...styles.text, color: colors.text, fontSize: getRightFontScale(18)}}>
                   У вас пока нет лимита. Установить?
                </Text>
                <Ionicons name='close' size={20} color={colors.text} style={{position: 'absolute', top: 10, right: 10}} onPress={cancelHandler}/>

            </TouchableOpacity>
        </View>
    )
}

    return (
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary, paddingHorizontal: Dimensions.get('window').width * 0.025}}>
            <View style={{flexDirection: 'row', width: '100%'}}>

            <Text style={{ fontFamily: 'open-sans-bold', fontSize: getRightFontScale(20), color: colors.text}}>
                {isLimitReached ? 'Лимит был превышен на:' : 'Средств до лимита:'}
            </Text>

            <Text style={getTextColor()}>
                {`${Math.round(moneyLeft* 100)/100} ${getRightSignValue(value)}`}
            </Text>
                {
                    props.whereIsCalled === 'main' ?  <Ionicons name='close' size={20} color={colors.text} style={styles.icon} onPress={cancelHandler}/> : null
                }

            </View>
            <ProgressBar
                progress={bar}
                width={Dimensions.get('window').width * 0.95 }
                height={12}
                color={isLimitReached ? colors.error : colors.text}
                borderRadius={2}
            />

        </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        textDecorationLine: 'underline',

    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    container: {

        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        height: 80,
    },
    icon: {
        position: "absolute",
        right: -5,
        top: -5
    },
})

export default AimInfo
