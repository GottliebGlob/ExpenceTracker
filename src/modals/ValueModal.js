import React from 'react';

import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions, PixelRatio
} from 'react-native';



import {useTheme} from "@react-navigation/native";
import ValueItem from "../components/ValueItem";
import getRightScale from "../components/flex";
import i18n from "../locales";


const ValueModal = props => {
    const { colors } = useTheme();


    const allValues = [
        {name: 'US', sign: '\u0024'},
        {name: 'EU', sign: '\u20AC'},
        {name: 'RU', sign : '\u20BD'},
        {name: 'UA', sign : '\u20B4'},
    ]

    return (
        <Modal visible={props.valueModalVisible} animationType="slide" transparent={true} style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onRequestClose={() => {props.setModalVisible(false)}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{...styles.main, backgroundColor: colors.background, height: ((((Dimensions.get('window').width * 0.9) / 4.5)) + getRightScale(110, 16)) * 1.4}}>


                    <FlatList
                        keyExtractor={(item, index) => "" + index}
                        data={allValues}
                        numColumns={7}
                        renderItem={itemData => (
                           <ValueItem name={itemData.item.name} sign={itemData.item.sign} curValue={props.curValue} toggleValue={props.toggleValue} setValueModalVisible={props.setValueModalVisible}/>
                        )}
                    />
                    <TouchableOpacity style={{...styles.button1,  height: getRightScale(110, 16)}} onPress={() => props.setValueModalVisible(false)}>
                        <Text style={{...styles.text1, color: colors.headertext, fontSize:  14 / PixelRatio.getFontScale()}}>{i18n.t("firstModal.goBack")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        paddingBottom: 20
    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 45,
        width: '95%',
        flexDirection: "row",
        borderRadius: 4,
    },

    text1: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
})

export default ValueModal
