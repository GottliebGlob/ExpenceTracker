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
    StatusBar
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons} from '@expo/vector-icons'


import {colors} from "../colors";

const InputModal = props => {
    const [enteredText, setEnteredText] = useState('');
    const [enteredCost, setEnteredCost] = useState(0)
    const [cat, setCat] = useState('general')
    const [drop, setDrop] = useState(false)


    const InputHandler = enteredText => {
        setEnteredText(enteredText);
    };
    const InputCostHandler = enteredCost => {
        setEnteredCost(enteredCost.replace(/[^0-9]/g, ''));
    };

    const confirmHandler = () => {
        if (enteredText.trim().length >= 3 && enteredCost < 100000 && enteredCost > 0 && String(enteredCost).length < 7 && enteredText.trim().length <= 25) {
            props.onMainStateChange(enteredText, parseInt(String(enteredCost)), cat)
            setEnteredText('')
            setEnteredCost(0)
            setCat('general')
        }
        else{
            Alert.alert("Упс!", 'Пожалуйста, введите корректные данные', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }
    }

    const cancelHandler = () => {
        props.onCancel()
        setEnteredText('')
        setEnteredCost(0)
        setCat('general')
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={styles.main}>
                    <StatusBar barStyle="dark-content" backgroundColor='#fff' />
            <View style={styles.inputContainer}>
                <Text style={styles.textAlign}>Введите трату: </Text>
                <TextInput
                    placeholder="Новая трата..."
                    style={styles.input}
                    onChangeText={InputHandler}
                    value={enteredText}
                    maxLenth={25}
                    blurOnSubmit
                />
                <Text style={styles.textAlign}>Введите сумму траты: </Text>
                <TextInput
                    placeholder="Сумма траты..."
                    style={styles.input}
                    onChangeText={InputCostHandler}
                    value={enteredCost}
                    keyboardType="number-pad"
                    maxLenth={5}
                    blurOnSubmit
                />
                <View style={[drop ? styles.dropdownOn : styles.dropdownOff]}>
                    <View style={{width: 80}}>
                    <Text>Выберите категорию: </Text>
                    </View>
                <DropDownPicker
                    items={[
                        {label: 'Общие', value: 'general', icon: () => <Ionicons name={colors.cats.general.icon} size={18} color={colors.cats.general.color} />},
                        {label: 'Дом', value: 'house', icon: () => <Ionicons name={colors.cats.house.icon} size={18} color={colors.cats.house.color} />},
                        {label: 'Транспорт', value: 'transport', icon: () => <Ionicons name={colors.cats.transport.icon} size={18} color={colors.cats.transport.color} />},
                        {label: 'Еда', value: 'food', icon: () => <Ionicons name={colors.cats.food.icon} size={18} color={colors.cats.food.color} />},
                        {label: 'Люди', value: 'people', icon: () => <Ionicons name={colors.cats.people.icon} size={18} color={colors.cats.people.color} />},
                        {label: 'Развлечения', value: 'entertainment', icon: () => <Ionicons name={colors.cats.entertainment.icon} size={18} color={colors.cats.entertainment.color} />},
                        {label: 'Образование', value: 'education', icon: () => <Ionicons name={colors.cats.education.icon} size={18} color={colors.cats.education.color} />},
                        {label: 'Здоровье', value: 'health', icon: () => <Ionicons name={colors.cats.health.icon} size={18} color={colors.cats.health.color} />},
                        {label: 'Внешний вид', value: 'appearance', icon: () => <Ionicons name={colors.cats.appearance.icon} size={18} color={colors.cats.appearance.color} />},
                        {label: 'Хобби', value: 'hobby', icon: () => <Ionicons name={colors.cats.hobby.icon} size={18} color={colors.cats.hobby.color} />},
                    ]}
                    defaultValue={cat}
                    containerStyle={{height: 40, width: 130}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    onOpen={() => setDrop(true)}
                    onClose={() => setDrop(false)}
                    dropDownStyle={{backgroundColor: '#fafafa', marginVertical: 2}}
                    onChangeItem={item => setCat(item.value)}
                />

                </View>
                <View style={styles.buttonContainer}>
 <Button title="ОТМЕНИТЬ" onPress={() => cancelHandler()} color={colors.error}/>
<Button title="ПРИНЯТЬ " onPress={() => confirmHandler()} color={colors.confirm}/>
                </View>
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
        height: '100%',
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
    dropdownOn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 220,
        width: '80%'
    },
    dropdownOff: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        width: '80%'
    },
    textAlign: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        fontSize: 20
    },
    main: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
});

export default InputModal;
