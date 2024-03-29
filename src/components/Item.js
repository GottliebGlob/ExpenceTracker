import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, PixelRatio} from "react-native"
import RenderIcon from "./RenderIcon";
import 'moment/locale/ru'
import moment from 'moment';
import {useTheme} from "@react-navigation/native";
import getRightScale, {getRightFontScale} from "../components/flex";
import {getRightSignValue} from "./getValue";

const Item = props => {
    const { colors } = useTheme();

    const getRightMargin = () => {
            return {   fontFamily: 'open-sans', fontSize: getRightFontScale(18),  color: colors.text, };
    }

    const getRightWidth = () => {
        let textMargin = props.flatInfo ? props.montMaxNumber : props.maxNumber

        return { width:  (textMargin + 2.8 ) * 13};
    }



    const m = moment(props.date)
     m.locale('ru')
    return (
        <TouchableOpacity
        onLongPress={props.removeHandler.bind(this, props.id)}>
        <View style={{...styles.wrapper, height: getRightScale(80, 32), marginLeft: Dimensions.get('window').width * 0.025, width: Dimensions.get('window').width * 0.95, backgroundColor: colors.accent, borderColor: colors.border}}>
            <View style={styles.include}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
            <RenderIcon category={props.cat} />
                <View style={getRightWidth()}>
            <Text style={{...styles.cost, color: colors.text,
            fontSize: getRightFontScale(17)
            }}>
                {`${props.cost} ${getRightSignValue(props.value)}`}
            </Text>
                </View>
                    </View>
                        <View>
                            <Text style={{color: colors.text,
                                fontSize: getRightFontScale(14)}}> {m.format('DD.MM.YYYY')}</Text>
                        </View>
                </View>
                <View style={{alignSelf: 'flex-start', flex: 1, paddingRight: Dimensions.get('window').width * 0.05 }}>
            <Text style={getRightMargin()} numberOfLines={1} ellipsizeMode='tail'>
                {props.text}
            </Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
            marginBottom: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderRadius: 5,
            height: 60,
        borderWidth: 1
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
        width: '95%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

})

export default Item
