import React, {useEffect, useState} from "react";

import {MainScreen} from "./src/screens/MainSrceen";
import {Statistics} from "./src/screens/Statistics";
import {AuthScreen} from "./src/screens/AuthScreen";
import {Settings} from "./src/screens/Settings"
import {StartupScreen} from "./src/screens/SartupScreen";


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import {DarkTheme, LightTheme} from "./src/colors";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "./src/store/actions/themeAction";
import {firebase} from "./src/firebase/config";
import * as Font from 'expo-font';


export default () => {
    const Stack = createStackNavigator();
    const dispatch = useDispatch();
    const color = useSelector(state => state.theme.isDark) === 'false' ? 'light' : 'dark';
    let c = useColorScheme()

    //User
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
                        setUser(userData)
                        setLoading(false)
                    })
                    .catch((error) => {
                      console.log(error)
                    });
            } else {
                setLoading(false)
            }
        });
    }, []);

    //Fonts
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        Font.loadAsync({
            'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
        }).then(() => setFontsLoaded(true));
    }, [])

    //Theme
    useEffect(() => {
        dispatch(setTheme(c))
    },[])

    if (loading || !fontsLoaded) {
        return (
            <StartupScreen />
        )
    }

    return(
<AppearanceProvider>
    <NavigationContainer theme={color === 'dark' ? DarkTheme : LightTheme}>
        <Stack.Navigator
            screenOptions={{ headerShown: false}}>
            { user ? (
                <>
                    <Stack.Screen name="Main" component={MainScreen}/>
                    <Stack.Screen name="Statistics" component={Statistics} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="LogOut" component={AuthScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={AuthScreen} />
                    <Stack.Screen name="Statistics" component={Statistics} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="Main" component={MainScreen}/>
                </>
            )}
        </Stack.Navigator>
    </NavigationContainer>
</AppearanceProvider>
    )

}
