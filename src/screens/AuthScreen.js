import React, { useState, useEffect } from 'react';
import {
    Keyboard,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Alert,
    StatusBar,
    PixelRatio,
} from 'react-native';


import AuthInput from "../components/AuthInput";
import * as authActions from "../store/actions/authAction"

import {useDispatch} from "react-redux";
import {firebase} from "../firebase/config";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useTheme} from "@react-navigation/native";
import {clearState} from "../store/actions/mainAction";

import getRightScale from "../components/flex";
import BottomBanner from "../components/BottomBanner";


export const AuthScreen = ({  navigation }) => {
    const { colors } = useTheme();


    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isAdd, setIsAdd] = useState(true)





    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
              email,
              password,
               name,
            );
        } else {
            action = authActions.login(
               email,
               password
            );
        }
        setIsLoading(true);
        try {
            await dispatch(action)
            setIsLoading(false);
        } catch (err) {
          console.log(err)
            setIsLoading(false);
        }
        const user = firebase.auth().currentUser;
        if(user) {
            dispatch(clearState())
        setName('')
            setEmail('')
            setPassword('')
        navigation.navigate('Main')
        }
    };

    const forgotPasswordHandler  = async () => {
        await dispatch(authActions.forgotPassword(email))
    }


    const nameHandler = (text) => {
        setName(text)
    }

    const emailHandler = (text) => {
        setEmail(text)
    }

    const passwordHandler = (text) => {
        setPassword(text)
    }


    const onAuth = () => {
        let error = false

        if (isSignup) {
            if (name.length < 2) {
               error = true
                Alert.alert("Упс!", 'Пожалуйста, введите ваше настоящее имя!', [
                    { text: 'Принять', style: 'cancel' }
                ]);
            }
        }

        if (password.length < 5) {
            error = true
            Alert.alert("Упс!", 'Пароль не может быть короче 6 символов!', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }

        if (email.length < 5) {
            error = true
            Alert.alert("Упс!", 'Пожаулйста, укажите существующую почту!', [
                { text: 'Принять', style: 'cancel' }
            ]);
        }

        if (!error) {
            authHandler()
        }
    }

    const onTouch = () => {
        Keyboard.dismiss()
          onAuth()
    }

    const onRandomTouch = () => {
        Keyboard.dismiss()
        setIsAdd(true)
    }

    const onKeyboardShow = () => {
        setIsAdd(false)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", onRandomTouch);
        Keyboard.addListener("keyboardDidShow", onKeyboardShow);
        return () => {
            Keyboard.removeListener("keyboardDidHide", onRandomTouch);
            Keyboard.removeListener("keyboardDidShow", onKeyboardShow);
        };
    }, []);



    return (
        <View style={styles.screen} >
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, color: colors.headertext,
                    fontSize:  19 / PixelRatio.getFontScale()}}>{` ${isSignup ? 'РЕГИСТРАЦИЯ' : 'ВХОД' }`}</Text>
            </View>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%',}}
                keyboardShouldPersistTaps="always">
                <View style={{paddingVertical: getRightScale(15, 40)}}>
                </View>

                        {isSignup ? <AuthInput
                            type="name"
                            label="Имя"
                            keyboardType="default"
                            minLength={2}
                            maxLength={25}
                            autoCapitalize="words"
                            required
                            errorText="Пожалуйста, введите настоящее имя."
                            onInputChange={nameHandler}
                            initialValue=""
                            initiallyValid={false}
                            value={name}
                        /> : null}

                        <AuthInput
                            type="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            minLength={5}
                            maxLength={35}
                            required
                            autoCapitalize="none"
                            errorText="Пожалуйста, используйте существующий e-mail."
                            onInputChange={emailHandler}
                            initialValue=""
                            value={email}
                        />
                        <AuthInput
                            type="password"
                            label="Пароль"
                            keyboardType="default"
                            required
                            minLength={5}
                            maxLength={15}
                            autoCapitalize="none"
                            errorText="Пожалуйста, используйте корректный пароль."
                            onInputChange={passwordHandler}
                            initialValue=""
                            value={password}
                        />


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{...styles.button1,  height: getRightScale(110, 16) }} onPress={() => onTouch()}>
                                <Text style={{...styles.text, color: colors.headertext, fontSize:  18 / PixelRatio.getFontScale()}}>{` ${isSignup ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'ВОЙТИ'}`}</Text>
                                <View style={{width: 10}}>
                                </View>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={colors.headertext} />
                                ) : (<View></View>) }
                            </TouchableOpacity>


                        </View>
                        <View style={styles.footerView}>
                         <Text style={{...styles.footerText, color: colors.text,
                             fontSize:  16 / PixelRatio.getFontScale()}}>{isSignup ? 'Есть аккаунт?  ' : 'Еще нет аккаунта?  '}
                             <Text onPress={() => {setIsSignup(prevState => !prevState)}}
                              style={{...styles.footerLink,
                                        color: colors.sign,
                                        fontSize:  17 / PixelRatio.getFontScale()}}>
                                    {isSignup ? 'Войти' : 'Зарегистрироваться'}
                             </Text>
                         </Text>

                        </View>
            </KeyboardAwareScrollView>


            {
                isAdd ? (
                        <View style={{...styles.forgot, borderTopColor: colors.accent}}>
                            <Text onPress={() => forgotPasswordHandler()}
                                  style={{...styles.footerLink,
                                      color: colors.sign,
                                      fontSize:  17 / PixelRatio.getFontScale()}}>
                                Забыли пароль?
                            </Text>
                            <BottomBanner />
                        </View>

                ) : null
            }
        </View>
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
       width: '100%',
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: '5%'


    },
    forgot: {
       height: 95,
        alignItems: 'center',
        borderTopWidth: 2,
        paddingTop: 8,
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
        paddingBottom: 10,

    }
});

