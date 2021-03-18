import {ADD, DEL, SET, CLEAR} from "./mainAction";
import AsyncStorage from '@react-native-community/async-storage';

class NewItem {
    constructor(id, value, cost, cat, date) {
        this.id = id;
        this.value = value;
        this.cost = cost;
        this.cat = cat;
        this.date = date;
    }
}

export const fetchOffline = async () => {
    let data = 0
    const loaded = []
    try {
        const value = await AsyncStorage.getItem('offlineData')
        data = JSON.parse(value)
        if (data !== null) {
            data.forEach(e => {
                loaded.push(new NewItem(
                    e.id,
                    e.value,
                    e.cost,
                    e.cat,
                    e.date
                    )
                )
            })
            return {
                type: SET,
                payload: loaded
            }
        }
        
    } catch(e) {
        console.log('error ' + e)
    }


}

export const removeOffline = id => {
    return {
        type: DEL,
        payload: id
    }
}

export const addOffline = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)

            await AsyncStorage.setItem('offlineData', jsonValue)
        } catch (e) {
            console.log('error ' + e)
        }


    return {
        type: ADD,
        payload: value
    }

}
