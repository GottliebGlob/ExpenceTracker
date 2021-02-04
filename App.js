import React, {useState, useEffect} from 'react';

import 'react-native-gesture-handler';
import { firebase } from './src/firebase/config'

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import mainReducer from "./src/store/reducers/main";

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import {MainScreen} from "./src/screens/MainSrceen";
import {Statistics} from "./src/screens/Statistics";
import {AuthScreen} from "./src/screens/AuthScreen";
import {StartupScreen} from "./src/screens/SartupScreen"


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {Appearance, useColorScheme, AppearanceProvider} from "react-native-appearance";
import {DarkTheme, LightTheme} from "./src/colors";






const rootReducer = combineReducers({
    main: mainReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

    let colorScheme = useColorScheme()


    const Stack = createStackNavigator();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (
           <StartupScreen />
        )
    }

    return (
        <Provider store={store} >
            <AppearanceProvider>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
            <Stack.Navigator
                screenOptions={{ headerShown: false}}>
                { user ? (
                    <>
                    <Stack.Screen name="Main">
                        {props => <MainScreen {...props} extraData={user} />}
                    </Stack.Screen>
                        <Stack.Screen name="Statistics" component={Statistics} />
                        <Stack.Screen name="LogOut" component={AuthScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={AuthScreen} />
                        <Stack.Screen name="Statistics" component={Statistics} />
                        <Stack.Screen name="Main">
                            {props => <MainScreen {...props} extraData={user} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
            </AppearanceProvider>
            </Provider>
    );
}

