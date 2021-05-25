import {ADD, DEL, SET, CLEAR} from "./mainAction";
import AsyncStorage from '@react-native-community/async-storage';
import {NewItem} from "../../NewItem";

export const fetchOffline = () => {
    let data = 0
    const loaded = []
    return async (dispatch) => {
        try {
            const value = await AsyncStorage.getItem('offlineData')
            const local = await AsyncStorage.getItem('localData')
            const data1 = JSON.parse(value)
            const data2 = JSON.parse(local)
            const data = {...data2, ...data1}
            if (data !== null) {
                    Object.values(data).forEach(e => {
                    loaded.push(new NewItem(
                        e.id,
                        e.value,
                        e.cost,
                        e.cat,
                        e.date
                        )
                    )
                })
                dispatch({
                    type: SET,
                    payload: loaded
                })
            }

        } catch (e) {
            console.log('error ' + e)
        }
    }

}

export const removeOffline = (id) => {
    return async (dispatch) => {
        try {
            const v = await AsyncStorage.getItem('offlineData')
            let arrFromJson = []

            if (v !== null) {
                arrFromJson.push(...JSON.parse(v))
                const toPush = arrFromJson.filter(e => e.id !== id)
                await AsyncStorage.setItem('offlineData', JSON.stringify(toPush))
            }

        } catch (e) {
            console.log('error ' + e)
        }

        dispatch({
            type: DEL,
            payload: id
        })
    }

}

export const addOffline = (value) => {
    return async (dispatch) => {
        try {
            const v = await AsyncStorage.getItem('offlineData')
            let toPush = []

            if (v !== null) {
                toPush.push(...JSON.parse(v))
            }

            toPush.push(value)

            const jsonValue = JSON.stringify(toPush)

            await AsyncStorage.setItem('offlineData', jsonValue)
        } catch (e) {
            console.log('error ' + e)
        }

        dispatch({
            type: ADD,
            payload: value
        })
    }

}
