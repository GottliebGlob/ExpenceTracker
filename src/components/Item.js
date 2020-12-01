import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {colors} from "../colors";
import RenderIcon from "./RenderIcon";
import 'moment/locale/ru'
import moment from 'moment';

const Item = props => {
    const m = moment(props.date)
     m.locale('ru')
    return (
        <TouchableOpacity
        onLongPress={props.removeHandler.bind(this, props.id)}>
        <View style={styles.wrapper}>
            <View style={styles.include}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
            <RenderIcon category={props.cat} />
                <View style={styles.textRight}>
            <Text style={styles.cost}>
                {`${props.cost} р.`}
            </Text>
                </View>
                    </View>
                        <View>
                            <Text> {m.format('DD.MM.YYYY')}</Text>
                        </View>
                </View>
                <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.text}>
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
            borderBottomColor: colors.primary,
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
