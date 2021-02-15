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
                console.log('action ' + theme)
                dispatch({type: UPDATE, payload: theme})
            }
            else {
                const payl = c === 'dark' ? 'true' : 'false'
                dispatch({type: UPDATE, payload: payl})
            }

        } catch(e) {
            console.log(e)
        }

    }
}

