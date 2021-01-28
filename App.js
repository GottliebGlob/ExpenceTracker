import React, {useState, useEffect} from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { firebase } from './src/firebase/config'

import {MainScreen} from "./src/screens/MainSrceen";
import {Statistics} from "./src/screens/Statistics";
import {AuthScreen} from "./src/screens/AuthScreen";
import {StartupScreen} from "./src/screens/SartupScreen"
import {createStackNavigator} from "@react-navigation/stack";

import mainReducer from "./src/store/reducers/main";



const rootReducer = combineReducers({
    main: mainReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
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
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false}}>
                { user ? (
                    <>
                    <Stack.Screen name="Main">
                        {props => <MainScreen {...props} extraData={user} />}
                    </Stack.Screen>
                        <Stack.Screen name="Statistics" component={Statistics} />
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
            </Provider>
    );
}

