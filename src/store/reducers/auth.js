import { AUTHENTICATE } from '../actions/authAction';

const initialState = {
    token: null,
    userId: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            };
        default:
            return state;
    }
};

export default authReducer
