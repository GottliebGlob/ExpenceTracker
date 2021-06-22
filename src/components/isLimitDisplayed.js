import React from 'react'
import AsyncStorage from "@react-native-community/async-storage";

export const isLimitDisplayed = async (limitCheck) => {
    try {
        const isDisplayed = await AsyncStorage.getItem('limit')
   limitCheck(isDisplayed)

    } catch (e) {
        alert(e)
    }
}

export const setIsLimitDisplayed = async (boolean) => {
    const string = String(boolean)
    try {
        await AsyncStorage.setItem('limit', string)
    } catch (e) {
        alert(e)
    }
}
