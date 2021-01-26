import { AUTHENTICATE } from '../actions/authAction';

const initialState = {
    userId: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                userId: action.payload
            };
        default:
            return state;
    }
};

export default authReducer
