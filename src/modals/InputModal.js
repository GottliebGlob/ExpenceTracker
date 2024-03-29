import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    Alert,
    StatusBar,
    TouchableOpacity,  PixelRatio
} from 'react-native';




import CatModal from "./CatModal";
import RenderIcon from "../components/RenderIcon";
import {useTheme} from "@react-navigation/native";
import BottomBanner from "../components/BottomBanner";
import {Ionicons} from "@expo/vector-icons";
import i18n from "../locales";

const InputModal = props => {
    const { colors } = useTheme();
    const [enteredText, setEnteredText] = useState('');
    const [enteredCost, setEnteredCost] = useState('')
    const [enteredCat, setEnteredCat] = useState('general')
    const [catModalVisible, setCatModalVisible] = useState(false)
    const [isAdd, setIsAdd] = useState(true)
    const [isCatSet, setIsCatSet] = useState(false)


    const InputHandler = enteredText => {
        setEnteredText(enteredText);
    };
    const InputCostHandler = enteredCost => {
        setEnteredCost(enteredCost);
    };

    const confirmHandler = () => {
        if (enteredText.trim().length >= 3 && enteredCost < 100000 && enteredCost >= 1 && enteredCost.match(/[+-]?([0-9]*[.])?[0-9]+/) &&  String(enteredCost).length < 7 && enteredText.trim().length <= 35) {
            props.onMainStateChange(enteredText, Math.round(parseFloat(String(enteredCost)) * 100) / 100, enteredCat)
            setEnteredText('')
            setEnteredCost(0)
            setEnteredCat('general')
            setIsCatSet(false)
        }
        else{
            Alert.alert(i18n.t("addModal.oops"), i18n.t("addModal.error"), [
                { text: i18n.t("addModal.confirm"), style: 'cancel' }
            ]);
        }
    }

    const onKeyboardShow = () => {
        setIsAdd(false)
    }

    const onKeyboardHide = () => {
        setIsAdd(true)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", onKeyboardHide);
        Keyboard.addListener("keyboardDidShow", onKeyboardShow);
        return () => {
            Keyboard.removeListener("keyboardDidHide", onKeyboardHide);
            Keyboard.removeListener("keyboardDidShow", onKeyboardShow);
        };
    }, []);

    const catHandler = (cat) => {
        setCatModalVisible(!catModalVisible)
        setEnteredCat(cat)
        setIsCatSet(true)
    }

    const cancelHandler = () => {
        props.onCancel()
        setEnteredText('')
        setEnteredCost(0)
        setEnteredCat('general')
        setIsCatSet(false)
    }

    const modalCatHandler = () => {
        setCatModalVisible(!catModalVisible)
    };

    return (
        <Modal visible={props.visible} animationType="slide"  onRequestClose={() => cancelHandler()}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={{...styles.main, backgroundColor: colors.background}}>
                    <StatusBar barStyle="dark-content" backgroundColor='black' />
            <View style={styles.inputContainer}>
                <Text style={{...styles.textAlign, color: colors.text, fontSize: 20 / PixelRatio.getFontScale()}}>{i18n.t("addModal.addName")}</Text>
                <TextInput
                    placeholder={i18n.t("addModal.place1")}
                    placeholderTextColor={colors.text}
                    style={{...styles.input, borderBottomColor: colors.sign, color: colors.text,}}
                    onChangeText={InputHandler}
                    value={enteredText}
                    maxLenth={35}
                    blurOnSubmit
                />
                <Text style={{...styles.textAlign, color: colors.text, fontSize: 20 / PixelRatio.getFontScale()}}>{i18n.t("addModal.addPrice")}</Text>
                <TextInput
                    placeholder={i18n.t("addModal.place2")}
                    placeholderTextColor={colors.text}
                    style={{...styles.input, borderBottomColor: colors.sign, color: colors.text}}
                    onChangeText={InputCostHandler}
                    value={enteredCost ? enteredCost.toString() : ''}
                    keyboardType="number-pad"
                    maxLenth={5}
                    blurOnSubmit
                />
                    </View>


                    <TouchableOpacity onPress={() => modalCatHandler()} style={{...styles.modal, paddingBottom: 10, borderBottomColor: colors.sign, borderBottomWidth: 2}}>
                        <Text style={{...styles.textAlign, color: colors.text, fontSize: 20 / PixelRatio.getFontScale()}}>{i18n.t("addModal.addCat")} </Text>
                        <View style={{...styles.catIcon, borderColor: colors.sign, marginTop: -3, width: isCatSet ? 40 : 36, height: isCatSet ? 40 : 36 }}>
                            {isCatSet ?  <RenderIcon category={enteredCat} /> :  <Ionicons name='ios-add' size={30} style={{ color: colors.text, marginLeft: 2}}/>}

                        </View>

                    </TouchableOpacity>

                    <CatModal catModalVisible={catModalVisible} setCatModalVisible={setCatModalVisible} modalCatHandler={modalCatHandler} catHandler={catHandler} isConnected={props.isConnected}/>

                <View style={styles.buttonContainer}>
 <Button title={i18n.t("addModal.cancel")} onPress={() => cancelHandler()} color={colors.error}/>
<Button title={i18n.t("addModal.confirm")} onPress={() => confirmHandler()} color={colors.confirm}/>
                </View>

                </View>
            </TouchableWithoutFeedback>
            {
                props.isConnected && isAdd ?   <BottomBanner /> : null
            }

        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '30%',
        alignItems: 'center',
        paddingTop: 20,
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20
    },
    input: {
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginVertical: 10,
        height: 50,
        padding: 10
    },
    textAlign: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        paddingRight: 10
    },
    main: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modal: {
        width: '80%',
        marginVertical: 15,
        flexDirection: 'row'
    },
    catIcon: {
       borderRadius: 50,
        height: 36, width: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2
    }
});

export default InputModal;
