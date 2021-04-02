import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio} from "react-native"
import RenderIcon from "./RenderIcon";
import 'moment/locale/ru'
import moment from 'moment';
import {useTheme} from "@react-navigation/native";
import getRightScale, {getRightFontScale} from "../components/flex";

const Item = props => {
    const { colors } = useTheme();

    const getRightMargin = () => {
        let textMargin = props.flatInfo ? props.montMaxNumber : props.maxNumber
        let rightMargin = 10
        if (props.value === 'RU') {
            return {  fontSize: getRightFontScale(20), marginHorizontal: -65 + textMargin * rightMargin, color: colors.text};
        }
        else {
            return {  fontSize: getRightFontScale(20), marginHorizontal: -50 + textMargin * 10, color: colors.text };
        }
    }


    const getRightTextLenght = () => {
        const langMargin = props.value === 'RU' ? 15 : 0
        const w = Math.round(Dimensions.get("window").width)
        const numbersAvailable = Math.round((w - w * 0.08 - 110 + langMargin) / 12)
        const newText = props.text.length > numbersAvailable ? props.text.substring(0,numbersAvailable) + '...' : props.text
        return newText

    }

    const m = moment(props.date)
     m.locale('ru')
    return (
        <TouchableOpacity
        onLongPress={props.removeHandler.bind(this, props.id)}>
        <View style={{...styles.wrapper, height: getRightScale(80, 35), borderBottomColor: colors.accent, }}>
            <View style={styles.include}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
            <RenderIcon category={props.cat} />
                <View style={styles.textRight}>
            <Text style={{...styles.cost, color: colors.text,
            fontSize: getRightFontScale(18)
            }}>
                {`${props.cost} ${props.value === 'RU' ? ' р. ' : props.value === '' ? '' :  ' грн. '}`}
            </Text>
                </View>
                    </View>
                        <View>
                            <Text style={{color: colors.text,
                                fontSize: getRightFontScale(14)}}> {m.format('DD.MM.YYYY')}</Text>
                        </View>
                </View>
                <View style={{alignSelf: 'flex-start'}}>
            <Text style={getRightMargin()}>
                {getRightTextLenght()}
            </Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {

            width: '100%',
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 2,
            paddingBottom: 3,
            height: 70,
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 5,
        fontFamily: 'open-sans',

    },
    cost: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        paddingLeft: 10,

    },
    include: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textRight: {
        width: 110
    }
})

export default Item
