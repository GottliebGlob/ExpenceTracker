import {PREFS, PREFS_DONE, SPENDS, SPENDS_DONE} from "../actions/mainAction";

const initialState = {
    spendsDone: false,
}

const loadReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPENDS:
            return {...state, spendsDone: true}
        case SPENDS_DONE:
            return {...state, spendsDone: false}
        default: return state
    }

}

export default loadReducer
