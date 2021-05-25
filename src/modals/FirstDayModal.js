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
import FirstDayItem from "../components/FirstDayItem";
import getRightScale from "../components/flex";


const FirstDayModal = props => {
    const { colors } = useTheme();

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

    return (
        <Modal visible={props.modalVisible} animationType="slide" transparent={true} style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onRequestClose={() => {props.setModalVisible(false)}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{...styles.main, backgroundColor: colors.background, height: ((((Dimensions.get('window').width * 0.9) / 9) * 4) + getRightScale(110, 16)) * 1.4}}>


                <FlatList
                    keyExtractor={(item, index) => "" + index}
                    data={days}
                    numColumns={7}
                    renderItem={itemData => (
                      <FirstDayItem day={itemData.item} isActive={props.isActive} setIsActive={props.setIsActive} setModalVisible={props.setModalVisible} setIsActiveChanged={props.setIsActiveChanged}/>
                    )}
                />
                <TouchableOpacity style={{...styles.button1,  height: getRightScale(110, 16)}} onPress={() => props.setModalVisible(false)}>
                    <Text style={{...styles.text1, color: colors.headertext, fontSize:  14 / PixelRatio.getFontScale()}}>НАЗАД</Text>
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

export default FirstDayModal
