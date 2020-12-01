
import {ADD, DEL, SET} from "../actions/mainAction";

const initialState = {
   main: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET: return {
            ...state,
            main: state.main.concat(action.payload)
        }
        case ADD:
            return {
                ...state,
                main: [{...action.payload}, ...state.main]
            }
        case DEL:
            return {
                ...state,
                main: state.main.filter(e => e.id !== action.payload)
            }
        default:
            return state
    }
}

export default mainReducer
