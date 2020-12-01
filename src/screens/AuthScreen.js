import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Alert
} from 'react-native';

import {colors} from "../colors";

import AuthInput from "../components/AuthInput";
import * as authActions from "../store/actions/authAction"

import { useDispatch} from "react-redux";

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

export const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
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
                formState.inputValues.password
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
            await dispatch(action);
            props.navigation.navigate('Main');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
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

    return (
        <View style={styles.screen} >
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, fontSize: 18}}>{` ${isSignup ? 'РЕГИСТРАЦИЯ' : 'ВХОД' }`}</Text>
            </View>
                    <ScrollView style={{marginTop: '30%'}}>
                        <AuthInput
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <AuthInput
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button2} onPress={authHandler}>
                                <Text style={{...styles.text, color: 'black'}}>{isSignup ? 'ПРИНЯТЬ' : 'ВОЙТИ'}</Text>
                                {isLoading ? (
                                        <ActivityIndicator size="small" color={colors.dark} />
                                    ) : (<View></View>) }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button1} onPress={() => {setIsSignup(prevState => !prevState)}}>
                                <Text style={styles.text}>{` ${isSignup ? 'НАЗАД' : 'РЕГИСТРАЦИЯ'}`}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20
    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 45,
        width: 120,

    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: '#5d5c61',
        borderWidth: 2,
        height: 45,
        width: 120,
        flexDirection: "row"
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    },
    mainTextContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
    }
});

