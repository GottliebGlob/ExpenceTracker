import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,

    Modal,
} from 'react-native'
import {useTheme} from "@react-navigation/native";
import {heightPercentageToDP} from "../flex";


export const FirstLaunchModal = props => {
    const { colors } = useTheme();

    if (props.aim === 0 && props.data.length === 0) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visible}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{...styles.wrapper, backgroundColor: colors.background, borderColor: colors.primary, height: heightPercentageToDP('25%')}}>
                        <Text style={{color: colors.text, fontFamily: 'open-sans-bold', fontSize: heightPercentageToDP('1.9%')}}>Спасибо, что решили принять участие в тестировании! Чтобы добавить трату нажмите на кнопку "Добавить", чтобы удалить- нажмите на трату и удерживайте.</Text>
                        <TouchableOpacity style={{...styles.button1,  height: heightPercentageToDP('5%')}} onPress={() => props.setVisible(false)}>
                            <Text style={{...styles.text, color: colors.headertext, fontSize:  heightPercentageToDP('2%')}}>ПОНЯТНО</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    else return null

}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        padding: 10,
        borderRadius: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 45,
        width: '100%',
        flexDirection: "row",
        borderRadius: 4,
    },

    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
})
