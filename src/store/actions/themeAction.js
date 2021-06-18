import AsyncStorage from '@react-native-community/async-storage';
export const UPDATE ='UPDATE'

export const toggleTheme = (theme) => {
    return async (dispatch) => {
        dispatch({type: UPDATE, payload: theme})
    }
}

export const setTheme = (c) => {
    return async (dispatch) => {
        try {
            const theme = await AsyncStorage.getItem('theme')
            if(theme !== null) {
                dispatch({type: UPDATE, payload: theme})
            }
            else {
                dispatch({type: UPDATE, payload: 'true'})
            }

        } catch(e) {
            console.log(e)
        }

    }
}

