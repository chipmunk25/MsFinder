import { SUCCESS_SIGNUP, ISLOADING_STOP, SUCCESS_SIGNIN, SUCCESS_GETLOC } from "../actions"
import { combineReducers } from "redux";
import { ISLOADING_START, SUCCESS_ADDLOC } from './../actions/index';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    location: []
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_SIGNUP:
            return { ...state, ...action.payload }
        case SUCCESS_SIGNIN:
            return { ...state, ...action.payload }
        case ISLOADING_START:
            return { ...state, ...action.payload }
        case ISLOADING_STOP:
            return { ...state, ...action.payload }
        case SUCCESS_ADDLOC:
            return { ...state, ...action.payload }
        case SUCCESS_GETLOC:
            return { ...state, ...action.payload }

        default: return state;

    }
}

const RootReducer = combineReducers({
    auth,
})

export default RootReducer