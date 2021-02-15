import {UPDATE} from '../actions/themeAction'


const initialState = {
    isDark: 'false'
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE:
            return {...state, isDark: action.payload}

        default:
            return state
    }
}

export default themeReducer
