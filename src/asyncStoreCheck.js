import React from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import {addOnServer} from "./store/actions/mainAction";
import moment from "moment";
import {NewItem} from "./NewItem";



export const asyncStoreCheck = async (dispatch) => {

    const clearStore = async () => {
        try {
            await AsyncStorage.removeItem('offlineData')
            return true;
        } catch (e) {
            console.log('error ' + e)
        }
    }

    let data = 0
    const loaded = []

        try {
            const value = await AsyncStorage.getItem('offlineData')
            data = JSON.parse(value)
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

            loaded.forEach(e => {
                const NewItem = {
                    value: e.value, cost: e.cost, cat: e.cat, date: moment().toISOString(),
                }
                dispatch(addOnServer(NewItem))
            })
                clearStore()
            }

        } catch (e) {
            console.log('error ' + e)
        }


}
