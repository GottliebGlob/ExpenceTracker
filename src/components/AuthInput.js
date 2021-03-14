import React, {useReducer, useEffect, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'
import {useTheme} from "@react-navigation/native";
import InputPasswordToggle from "react-native-toggle-password-visibility";
import {heightPercentageToDP, widthPercentageToDP} from "../flex";



const AuthInput = props => {
    const { colors } = useTheme();
    const [enteredText, setEnteredText] = useState('')
    const [error, setError] = useState(false)

    const { onInputChange, type } = props;

    const inputCheckHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (props.required && text.trim().length === 0) {
            setError(true)
        }
        if (type === 'email' && !emailRegex.test(text.toLowerCase())) {
            setError(true)
        }
        if (props.min != null && +text < props.min) {
            setError(true)
        }
        if (props.max != null && +text > props.max) {
            setError(true)
        }
        if (props.minLength != null && text.length < props.minLength) {
            setError(true)
        }
    }


    const lostFocusHandler = () => {
        inputCheckHandler(enteredText)
    }

    const inputHandler = enteredText => {
        setEnteredText(enteredText);
        onInputChange(enteredText)
        if (error) {
            setError(false)
        }
    };



    return (
        <View style={styles.main}>
            <Text style={{...styles.label, color: colors.text, fontSize:  widthPercentageToDP('5%')}}>{props.label}</Text>
            {type === 'password' ? (
                <InputPasswordToggle

                    {...props}
                    style={{...styles.input, borderBottomColor: colors.accent,}}
                    inputStyle={{ color: colors.text}}
                    iconColor={colors.text}
                    onChangeText={inputHandler}
                    onBlur={lostFocusHandler}
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="next"

                />
            ) : (
                <TextInput
                    {...props}
                    style={{...styles.input, borderBottomColor: colors.accent, color: colors.text}}
                    onChangeText={inputHandler}
                    onBlur={lostFocusHandler}
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="next"
                />
            ) }

            {error && (
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
