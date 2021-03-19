import React, {useReducer, useEffect, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'
import {useTheme} from "@react-navigation/native";
import {heightPercentageToDP, widthPercentageToDP} from "../flex";
import {Ionicons} from "@expo/vector-icons";



const AuthInput = props => {
    const { colors } = useTheme();
    const [enteredText, setEnteredText] = useState('')
    const [error, setError] = useState(false)

    const [eyeIcon, setEyeIcon] = useState("eye-off");
    const [isPassword, setIsPassword] = useState(true);

    const changePwdType = () => {
        setEyeIcon(isPassword ? "eye" : "eye-off");
        setIsPassword((prevState) => !prevState);
    };

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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput

                    {...props}
                    style={{...styles.input, borderBottomColor: colors.accent, color: colors.text}}
                    onChangeText={inputHandler}
                    onBlur={lostFocusHandler}
                    secureTextEntry={isPassword}
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="next"


                />
                        <Ionicons
                            style={styles.icon}
                            name={eyeIcon}
                            size={22}
                            color={colors.text}
                            onPress={changePwdType}
                        />
                    </View>
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
    },

    icon: {
        position: "absolute",
        right: 5,
        top: 25
    },
})
export default AuthInput
