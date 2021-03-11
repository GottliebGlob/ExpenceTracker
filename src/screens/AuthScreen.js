import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    Keyboard,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Alert,
    StatusBar,
    TouchableWithoutFeedback
} from 'react-native';


import AuthInput from "../components/AuthInput";
import PassInput from "../components/PassInput";
import * as authActions from "../store/actions/authAction"

import {useDispatch} from "react-redux";
import {firebase} from "../firebase/config";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useTheme} from "@react-navigation/native";



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

export const AuthScreen = ({  navigation }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const [isButton, setIsButton] = useState(false)


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
            name: ''
        },
        inputValidities: {
            email: false,
            password: false,
            name: false
        },
        formIsValid: false
    });


    useEffect(() => {
        if (error) {
            Alert.alert('Ошибка!', error, [{ text: 'Принять' }]);
        }
    }, [error]);

    const authHandler = async () => {

        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password,
                formState.inputValues.name,
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action)
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
        const user = firebase.auth().currentUser;
        if(user) {
        navigation.navigate('Main')
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    const alertHandler = () => {
        if (formState.inputValues.password.length < 5) {
            console.log('hi ' + formState.inputValues.password)
            Alert.alert("Упс!", 'Пароль не может быть короче 5 символов!', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }
        if (formState.inputValues.email.length < 4) {
            Alert.alert("Упс!", 'Пожаулйста, укажите существующую почту!', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }
        if (isSignup) {
            if (formState.inputValues.name.length < 2) {
                Alert.alert("Упс!", 'Пожалуйста, введите ваше настоящее имя!', [
                    { text: 'Принять', style: 'cancel' }
                ]);
            }
        }
    }



    const onTouch = () => {
        Keyboard.dismiss()
           setIsButton(true)
        inputChangeHandler()
    }

    const onRandomTouch = () => {
        Keyboard.dismiss()
        inputChangeHandler()
        console.log('hide')
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", onRandomTouch);
        return () => {
            Keyboard.removeListener("keyboardDidHide", onRandomTouch);
        };
    }, []);

    useEffect(() => {
        console.log(formState.inputValues)
        if(isButton) {
            if (isSignup) {
            if (formState.inputValues.name.length > 1  && formState.inputValues.password.length > 5 && formState.inputValues.email.length > 5) {
                authHandler()
            }}
            else {
                console.log('hello ' + formState.inputValues.password.length)
            if (formState.inputValues.password.length > 5 && formState.inputValues.email.length > 5) {
        authHandler()
            }}
            alertHandler()
        }
        setIsButton(false)
    }, [formState.inputValues]);


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <View style={styles.screen} >
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: 17, color: colors.headertext}}>{` ${isSignup ? 'РЕГИСТРАЦИЯ' : 'ВХОД' }`}</Text>
            </View>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%',}}
                keyboardShouldPersistTaps="always">
                <View style={{paddingVertical: '15%'}}>
                </View>

                        {isSignup ? <AuthInput
                            id="name"
                            label="Имя"
                            keyboardType="default"
                            minLength={2}
                            maxLength={15}
                            autoCapitalize="words"
                            required
                            errorText="Пожалуйста, введите настоящее имя."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            initiallyValid={false}
                        /> : null}

                        <AuthInput
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            minLength={5}
                            maxLength={30}
                            required
                            email
                            autoCapitalize="none"
                            errorText="Пожалуйста, используйте существующий e-mail."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <PassInput
                            id="password"
                            label="Пароль"
                            keyboardType="default"
                            required
                            minLength={5}
                            maxLength={15}
                            autoCapitalize="none"
                            errorText="Пожалуйста, используйте корректный пароль."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button1} onPress={() => onTouch()}>
                                <Text style={{...styles.text, color: colors.headertext}}>{` ${isSignup ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'ВОЙТИ'}`}</Text>
                                <View style={{width: 10}}>
                                </View>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={colors.headertext} />
                                ) : (<View></View>) }
                            </TouchableOpacity>


                        </View>
                        <View style={styles.footerView}>
                        <Text style={{...styles.footerText, color: colors.text}}>{isSignup ? 'Есть аккаунт? ' : 'Еще нет аккаунта? '} <Text onPress={() => {setIsSignup(prevState => !prevState)}}
                                                                                     style={{...styles.footerLink, color: colors.sign}}>{isSignup ? 'Войти' : 'Зарегистрироваться'}</Text></Text>
                        </View>
            </KeyboardAwareScrollView>
        </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    footerText: {
        fontSize: 16,
        fontFamily: 'open-sans',
    },
    footerLink: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'black'
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 20,
       paddingHorizontal: '5%'
    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 45,
        width: '100%',
        flexDirection: "row"
    },

    text: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
    },
    mainTextContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
    }
});

