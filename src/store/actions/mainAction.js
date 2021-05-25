import moment from "moment";

export const ADD ='ADD'
export const DEL = 'DEL'
export const SET = 'SET'
export const CLEAR = 'CLEAR'

import { firebase } from '../../firebase/config'

import {NewItem} from "../../NewItem";
import AsyncStorage from "@react-native-community/async-storage";


export const addMain = (NewItem) => {
    const {value, cost, cat, date} = NewItem
    return async (dispatch) => {
        const entityRef = firebase.firestore().collection('data').doc()
        const user = firebase.auth().currentUser;
        const userId = user.uid
        const extraId = {id: null}
        const docId = entityRef.id

        const data = {
            value,
            cost,
            cat,
            date,
            authorID: userId,
        }

                extraId.id = docId
                const payl = {...NewItem, id: extraId.id}
                dispatch({
                    type: ADD,
                    payload: payl
                })

                entityRef
                    .set(data)
                    .catch((error) => {
                        alert(error)
                    });

        const v = await AsyncStorage.getItem('localData')
        let toPush = []

        if (v !== null) {
            toPush.push(...JSON.parse(v))
        }

        toPush.push(data)

        const jsonValue = JSON.stringify(toPush)

        await AsyncStorage.setItem('localData', jsonValue)

            }
}

export const addOnServer = (NewItem) => {
    const {value, cost, cat, date} = NewItem
    return async () => {
        const entityRef = firebase.firestore().collection('data').doc()
        const user = firebase.auth().currentUser;
        const userId = user.uid
        const extraId = {id: null}
        const docId = entityRef.id

        const data = {
            value,
            cost,
            cat,
            date,
            authorID: userId,
        }

        extraId.id = docId

        entityRef
            .set(data)
            .catch((error) => {
                alert(error)
            });




    }
}


export const removeMain = (id) => {
    return async (dispatch) => {
     firebase.firestore().collection('data')
         .doc(id)
         .delete()
         .then(dispatch({ type: DEL, payload: id }))
         .catch((error) => {
         alert(error)
     });

        try {
            const v = await AsyncStorage.getItem('localData')
            let arrFromJson = []
            if (v !== null) {
                arrFromJson.push(...JSON.parse(v))
                const toPush = arrFromJson.filter(e => e.id !== id)
                await AsyncStorage.setItem('localData', JSON.stringify(toPush))
            }

        } catch (e) {
            console.log('error ' + e)
        }
    }
}




export const fetchMain = () => {
    const user = firebase.auth().currentUser;
    const userId = user.uid
    const loaded = []
    return async (dispatch) => {
        const mainRef = firebase.firestore().collection('data').where("authorID", "==", userId).orderBy('date', 'desc')
        const mainSnapshot = await mainRef.get().catch((error) => {
            alert(error)
        });

        mainSnapshot.forEach(doc => {
                const entity = doc.data()
                entity.id = doc.id
                loaded.push(new NewItem(
                    entity.id,
                    entity.value,
                    entity.cost,
                    entity.cat,
                    entity.date
                    )
                )
            })
        if (loaded.length > 0) {
            const jsonValue = JSON.stringify(loaded)
            await AsyncStorage.setItem('localData', jsonValue)
        }

        dispatch({type: SET, payload: loaded})
    }
};


export const clearState = () => {
    return dispatch => {
        // Your code here...
        dispatch({ type: CLEAR });
    };
}
