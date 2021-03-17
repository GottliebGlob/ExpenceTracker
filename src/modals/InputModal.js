import React, { useState} from 'react';
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
    TouchableOpacity, Dimensions
} from 'react-native';




import CatModal from "./CatModal";
import RenderIcon from "../components/RenderIcon";
import {useTheme} from "@react-navigation/native";
import {widthPercentageToDP} from "../flex";

const InputModal = props => {
    const { colors } = useTheme();
    const [enteredText, setEnteredText] = useState('');
    const [enteredCost, setEnteredCost] = useState('')
    const [enteredCat, setEnteredCat] = useState('general')
    const [catModalVisible, setCatModalVisible] = useState(false)


    const InputHandler = enteredText => {
        setEnteredText(enteredText);
    };
    const InputCostHandler = enteredCost => {
        setEnteredCost(enteredCost);
    };

    const confirmHandler = () => {
        if (enteredText.trim().length >= 3 && enteredCost < 100000 && enteredCost > 1 && enteredCost.match(/[+-]?([0-9]*[.])?[0-9]+/) &&  String(enteredCost).length < 7 && enteredText.trim().length <= 25) {
            props.onMainStateChange(enteredText, Math.round(parseFloat(String(enteredCost)) * 100) / 100, enteredCat)
            setEnteredText('')
            setEnteredCost(0)
            setEnteredCat('general')
        }
        else{
            Alert.alert("Упс!", 'Пожалуйста, введите корректные данные', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }
    }

    const catHandler = (cat) => {
        setCatModalVisible(!catModalVisible)
        setEnteredCat(cat)
    }

    const cancelHandler = () => {
        props.onCancel()
        setEnteredText('')
        setEnteredCost(0)
        setEnteredCat('general')
    }

    const modalCatHandler = () => {
        setCatModalVisible(!catModalVisible)
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={{...styles.main, backgroundColor: colors.background}}>
                    <StatusBar barStyle="dark-content" backgroundColor={colors.dark} />
            <View style={styles.inputContainer}>
                <Text style={{...styles.textAlign, color: colors.text, fontSize: Dimensions.get('window').height > 650 ? widthPercentageToDP('5%') : widthPercentageToDP('4.5%')}}>Введите трату: </Text>
                <TextInput
                    placeholder="Новая трата..."
                    style={{...styles.input, color: colors.text,}}
                    onChangeText={InputHandler}
                    value={enteredText}
                    maxLenth={25}
                    blurOnSubmit
                />
                <Text style={{...styles.textAlign, color: colors.text, fontSize: Dimensions.get('window').height > 650 ? widthPercentageToDP('5%') : widthPercentageToDP('4.5%')}}>Введите сумму траты: </Text>
                <TextInput
                    placeholder="Сумма траты..."
                    style={{...styles.input, color: colors.text}}
                    onChangeText={InputCostHandler}
                    value={enteredCost.toString()}
                    keyboardType="number-pad"
                    maxLenth={5}
                    blurOnSubmit
                />
                    </View>


                    <TouchableOpacity onPress={() => modalCatHandler()} style={styles.modal}>
                        <Text style={{...styles.textAlign, color: colors.text, fontSize: Dimensions.get('window').height > 650 ? widthPercentageToDP('5%') : widthPercentageToDP('4.5%')}}>Выберите категорию: </Text>
                        <RenderIcon category={enteredCat} />
                    </TouchableOpacity>

                    <CatModal catModalVisible={catModalVisible} catHandler={catHandler}/>

                <View style={styles.buttonContainer}>
 <Button title="ОТМЕНИТЬ" onPress={() => cancelHandler()} color={colors.error}/>
<Button title="ПРИНЯТЬ " onPress={() => confirmHandler()} color={colors.confirm}/>
                </View>

                </View>
            </TouchableWithoutFeedback>
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
    }
});

export default InputModal;
