import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio} from "react-native"

import ProgressBar from 'react-native-progress/Bar'
import {useTheme} from "@react-navigation/native";
import {MainContext} from "./mainContext";

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


    const getTextColor = () => {
        if (isLimitReached) {
            return { fontFamily: 'open-sans-bold', fontSize: 20 / PixelRatio.getFontScale(), marginLeft: 5, color: colors.error };
        }
        else {
            return { fontFamily: 'open-sans-bold', fontSize: 20 / PixelRatio.getFontScale(), marginLeft: 5, color: colors.confirm };
        }
    }

if (aim === 0) {
    return (
        <View>
            <TouchableOpacity style={{...styles.container, borderBottomColor: colors.dark, backgroundColor: colors.primary}} onPress={() => props.navigation.navigate('Settings', {userId: userId, value: value})}>
                <Text style={{...styles.text, color: colors.text, fontSize: 16 / PixelRatio.getFontScale()}}>
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

            <Text style={{ fontFamily: 'open-sans-bold', fontSize: 20 / PixelRatio.getFontScale(), color: colors.text}}>
                {isLimitReached ? 'Лимит был превышен на:' : 'Средств до лимита:'}
            </Text>

            <Text style={getTextColor()}>
                {`${Math.round(moneyLeft* 100)/100} ${value === 'RU' ? ' р. ' : ' грн. '}`}
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
