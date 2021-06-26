import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Modal, Dimensions,
} from 'react-native'
import {useTheme} from "@react-navigation/native";
import getRightScale from "../components/flex";
import i18n from "../locales";



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
                    <View style={{...styles.wrapper, backgroundColor: colors.background, borderColor: colors.primary, height: Dimensions.get('window').width * 0.52}}>
                        <Text style={{color: colors.text, fontFamily: 'open-sans-bold', fontSize: 14 / PixelRatio.getFontScale()}}>{props.text}</Text>
                        <TouchableOpacity style={{...styles.button1,  height: getRightScale(110, 16)}} onPress={() => props.setVisible(false)}>
                            <Text style={{...styles.text, color: colors.headertext, fontSize:  14 / PixelRatio.getFontScale()}}>{i18n.t("firstOnline.confirm")}</Text>
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
