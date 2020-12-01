import React from 'react';

import {MainScreen} from "../screens/MainSrceen";
import {Statistics} from "../screens/Statistics";
import {AuthScreen} from "../screens/AuthScreen";
import {StartupScreen} from "../screens/SartupScreen"
import {createStackNavigator} from "@react-navigation/stack";


export const AppNavigation = () => {
    const Stack = createStackNavigator();
    return(
    <Stack.Navigator
        screenOptions={{ headerShown: false}}>
        <Stack.Screen name="StartupScreen" component={StartupScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
    )
}
