import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native"

import ProgressBar from 'react-native-progress/Bar'
import {useTheme} from "@react-navigation/native";
import {heightPercentageToDP, widthPercentageToDP} from "../flex";

const AimInfo = props => {

    const { colors } = useTheme();

    const [moneyLeft, setMoneyLeft] = useState(0)
    const [bar, setBar] = useState(0)
    const [isLimitReached, setIsLimitReached] = useState(false)

    const moneyLeftHandler = () => {
        const spends = props.lastMonthSpends.map(e => Number(e.cost)).reduce((t, a) => t + a, 0)
        props.aim - spends > 0 ? hasNotReached(spends) : hasReached(spends)
    }

    useEffect(() => {
        moneyLeftHandler()
    },[props.lastMonthSpends, props.aim])

    const hasNotReached = (spends) => {
        setMoneyLeft( props.aim - spends)
        setIsLimitReached(false)
        spends > 0 ? setBar(spends / props.aim) : setBar(0)

    }

    const hasReached = (spends) => {
        setMoneyLeft( spends - props.aim)
        setIsLimitReached(true)
        setBar(1)
    }


    const getTextColor = () => {
        if (isLimitReached) {
            return { fontFamily: 'open-sans-bold', fontSize: heightPercentageToDP('2.5%'), marginLeft: 5, color: colors.error };
        }
        else {
            return { fontFamily: 'open-sans-bold', fontSize: heightPercentageToDP('2.5%'), marginLeft: 5, color: colors.confirm };
        }
    }

if (props.aim === 0) {
    return (
        <View>
            <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary}} onPress={() => props.navigation.navigate('Settings', {userId: props.userId, value: props.value})}>
                <Text style={{...styles.text, color: colors.text, fontSize: heightPercentageToDP('2%')}}>
                   У вас пока нет лимита. Установить?
                </Text>
            </TouchableOpacity>
        </View>
    )
}

    return (
        <View>
        <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary}}>
            <View style={{flexDirection: 'row'}}>

            <Text style={{ fontFamily: 'open-sans-bold', fontSize: Dimensions.get('window').height > 650 ? heightPercentageToDP('2.5%') : heightPercentageToDP('2.3%'), color: colors.text}}>
                {isLimitReached ? 'Лимит был превышен на:' : 'Средств до лимита:'}
            </Text>

            <Text style={getTextColor()}>
                {`${Math.round(moneyLeft* 100)/100} ${props.value === 'RU' ? ' р. ' : ' грн. '}`}
            </Text>
            </View>
            <ProgressBar
                progress={bar}
                width={Dimensions.get('window').width - Dimensions.get('window').width * 0.1 }
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
    container: {
        paddingHorizontal: '5%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        height: 80,
    },
})

export default AimInfo
