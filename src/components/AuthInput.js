import React, {useReducer, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import {useTheme} from "@react-navigation/native";

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'


const inputReducer = (state, action) => {
switch (action.type) {
    case INPUT_CHANGE:
        return {
            ...state,
            value: action.value,
            isValid: action.isValid
        }
    case INPUT_BLUR:
        return {
            ...state,
            touched: true
        }
    default:
        return state
}
}

const AuthInput = props => {
    const { colors } = useTheme();

    const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue: '',
    isValid: props.initiallyValid,
    touched: false
})

    const { onInputChange, id } = props

    useEffect(() => {
        if (inputState.touched) {
       onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange, id])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    }

    const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR})
    }

    return (
        <View style={styles.main}>
            <Text style={{...styles.label, color: colors.text}}>{props.label}</Text>
        <TextInput
            {...props}
            style={{...styles.input, borderBottomColor: colors.accent, color: colors.text}}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            />
            {!inputState.isValid && inputState.touched && (
                <View>
                    <Text style={{...styles.errorText, color: colors.error,}}>{props.errorText}</Text>
                </View>
            )}
    </View>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderBottomWidth: 2,
        marginVertical: 5,
        height: 50,
        padding: 10,
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 19,
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: '5%',
        marginTop: 10
    },
    errorText: {
        fontSize: 13
    }
})
export default AuthInput
