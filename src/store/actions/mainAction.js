export const ADD ='ADD'
export const DEL = 'DEL'
export const SET = 'SET'
export const CLEAR = 'CLEAR'

import { firebase } from '../../firebase/config'



export const addMain = (NewItem) => {
    const {value, cost, cat, date} = NewItem
    return async (dispatch) => {
        const entityRef = firebase.firestore().collection('data')
        const user = firebase.auth().currentUser;
        const userId = user.uid
        const extraId = {id: null}

        const data = {
            value,
            cost,
            cat,
            date,
            authorID: userId,
        }
        entityRef
            .add(data)
            .then(docRef => {
                extraId.id = docRef.id
                const payl = {...NewItem, id: extraId.id}
                    dispatch({
                    type: ADD,
                    payload: payl
                })
                }
            )
            .catch((error) => {
                alert(error)
            });
    }
}

export const removeMain = (id) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        await fetch(
            `https://expensetracker-b3547.firebaseio.com/${userId}.json?auth=${token}`,
            {
                method: 'DELETE'
            }
        );
        dispatch({ type: DEL, payload: id })
    }
}



class NewItem {
    constructor(id, value, cost, cat, date) {
        this.id = id;
        this.value = value;
        this.cost = cost;
        this.cat = cat;
        this.date = date;
    }
}


export const fetchMain = () => {
    const user = firebase.auth().currentUser;
    const userId = user.uid
    const loaded = []
    return async (dispatch) => {
        const mainRef = firebase.firestore().collection('data').where("authorID", "==", userId).orderBy('date', 'desc')
        const mainSnapshot = await mainRef.get()

        mainSnapshot.forEach(doc => {
                const entity = doc.data()
                entity.id = doc.id
                console.log('query')
                loaded.push(new NewItem(
                    entity.id,
                    entity.value,
                    entity.cost,
                    entity.cat,
                    entity.date
                    )
                )
            })
        dispatch({type: SET, payload: loaded})
    }
};


export const clearState = () => {
    return dispatch => {
        // Your code here...
        dispatch({ type: CLEAR });
    };
}
