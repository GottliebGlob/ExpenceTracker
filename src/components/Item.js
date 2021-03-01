import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import RenderIcon from "./RenderIcon";
import 'moment/locale/ru'
import moment from 'moment';
import {useTheme} from "@react-navigation/native";

const Item = props => {
    const { colors } = useTheme();


    const m = moment(props.date)
     m.locale('ru')
    return (
        <TouchableOpacity
        onLongPress={props.removeHandler.bind(this, props.id)}>
        <View style={{...styles.wrapper, borderBottomColor: colors.accent}}>
            <View style={styles.include}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
            <RenderIcon category={props.cat} />
                <View style={styles.textRight}>
            <Text style={{...styles.cost, color: colors.text}}>
                {`${props.cost} ${props.value === 'RU' ? ' р. ' : ' грн. '}`}
            </Text>
                </View>
                    </View>
                        <View>
                            <Text style={{color: colors.text}}> {m.format('DD.MM.YYYY')}</Text>
                        </View>
                </View>
                <View style={{alignSelf: 'flex-start'}}>
            <Text style={{...styles.text, color: colors.text}}>
                {(props.text.length >= 23) ? props.text.substring(0,20) + '...' : props.text}
            </Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
            paddingHorizontal: 10,
            width: '100%',
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 2,
            height: 70,
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 5,

    },
    cost: {
        fontWeight: 'bold',
        fontSize: 19,
        paddingLeft: 10
    },
    include: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textRight: {
        width: 90
    }
})

export default Item
