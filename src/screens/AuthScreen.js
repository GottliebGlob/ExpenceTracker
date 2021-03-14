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
    PixelRatio, Dimensions
} from 'react-native';


import AuthInput from "../components/AuthInput";
import * as authActions from "../store/actions/authAction"

import {useDispatch} from "react-redux";
import {firebase} from "../firebase/config";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useTheme} from "@react-navigation/native";
import {clearState} from "../store/actions/mainAction";

import {heightPercentageToDP, widthPercentageToDP} from "../flex";


export const AuthScreen = ({  navigation }) => {
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




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
        navigation.navigate('Main')
        }
    };

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
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", onRandomTouch);
        return () => {
            Keyboard.removeListener("keyboardDidHide", onRandomTouch);
        };
    }, []);



    return (
        <View style={styles.screen} >
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View style={styles.mainTextContainer}>
                <Text style={{...styles.text, color: colors.headertext,
                    fontSize:  Dimensions.get('window').height > 650 ? widthPercentageToDP('4.5%') : widthPercentageToDP('4.2%')}}>{` ${isSignup ? 'РЕГИСТРАЦИЯ' : 'ВХОД' }`}</Text>
            </View>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%',}}
                keyboardShouldPersistTaps="always">
                <View style={{paddingVertical: Dimensions.get('window').height > 650 ? heightPercentageToDP('10%') : heightPercentageToDP('5%')}}>
                </View>

                        {isSignup ? <AuthInput
                            type="name"
                            label="Имя"
                            keyboardType="default"
                            minLength={2}
                            maxLength={15}
                            autoCapitalize="words"
                            required
                            errorText="Пожалуйста, введите настоящее имя."
                            onInputChange={nameHandler}
                            initialValue=""
                            initiallyValid={false}
                        /> : null}

                        <AuthInput
                            type="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            minLength={5}
                            maxLength={30}
                            required
                            autoCapitalize="none"
                            errorText="Пожалуйста, используйте существующий e-mail."
                            onInputChange={emailHandler}
                            initialValue=""
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
                        />


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{...styles.button1,  height: heightPercentageToDP('6%')}} onPress={() => onTouch()}>
                                <Text style={{...styles.text, color: colors.headertext, fontSize:  heightPercentageToDP('2%')}}>{` ${isSignup ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'ВОЙТИ'}`}</Text>
                                <View style={{width: 10}}>
                                </View>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={colors.headertext} />
                                ) : (<View></View>) }
                            </TouchableOpacity>


                        </View>
                        <View style={styles.footerView}>
                         <Text style={{...styles.footerText, color: colors.text,
                             fontSize:  Dimensions.get('window').height > 650 ? widthPercentageToDP('4.2%') : widthPercentageToDP('3.5%')}}>{isSignup ? 'Есть аккаунт? ' : 'Еще нет аккаунта? '}
                             <Text onPress={() => {setIsSignup(prevState => !prevState)}}
                              style={{...styles.footerLink,
                                        color: colors.sign,
                                        fontSize:  Dimensions.get('window').height > 650 ? widthPercentageToDP('4.2%') : widthPercentageToDP('3.5%')}}>
                                    {isSignup ? 'Войти' : 'Зарегистрироваться'}
                             </Text>
                         </Text>
                        </View>
            </KeyboardAwareScrollView>
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
        paddingBottom: 10,

    }
});

