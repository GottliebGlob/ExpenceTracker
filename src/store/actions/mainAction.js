export const ADD ='ADD'
export const DEL = 'DEL'
export const SET = 'SET'
export const CLEAR = 'CLEAR'

export const addMain = (NewItem) => {
    const {value, cost, cat, date} = NewItem
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://expensetracker-b3547.firebaseio.com/${userId}.json?auth=${token}`, {
            method: 'POST',
            hearers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               value,
                cost,
                cat,
                date
            })
        })
        const resData = await response.json()

        const payl = {...NewItem, id: resData.name}
        dispatch({
            type: ADD,
            payload: payl
        })

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
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://expensetracker-b3547.firebaseio.com/${userId}.json`
            );

            const resData = await response.json();
            const loaded = []


            for (const key in resData) {
                loaded.push(new NewItem(
                    key,
                    resData[key].value,
                    resData[key].cost,
                    resData[key].cat,
                    resData[key].date
                    )
                )

            }
            dispatch({type: SET, payload: loaded});
        } catch (err) {
            throw err
        }
    };
};


export const clearState = () => {
    return dispatch => {
        // Your code here...
        dispatch({ type: CLEAR });
    };
}
