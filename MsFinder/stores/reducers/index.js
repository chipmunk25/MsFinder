import { SUCCESS_SIGNUP, ISLOADING_STOP, SUCCESS_SIGNIN, SUCCESS_GETLOC, SUCCESS_SIGNOUT, SUCCESS_REMLOC } from "../actions"
import { combineReducers } from "redux";
import { ISLOADING_START, SUCCESS_ADDLOC, TOGGLE_THEME } from './../actions/index';

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    email: '',
    user: {},
    location: [],
    isDarkTheme: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_SIGNUP:
            return { ...state, ...action.payload }
        case SUCCESS_SIGNIN:
            return { ...state, ...action.payload }
        case SUCCESS_SIGNOUT:
            return { ...state, ...action.payload }
        case ISLOADING_START:
            return { ...state, ...action.payload }
        case ISLOADING_STOP:
            return { ...state, ...action.payload }
        case SUCCESS_ADDLOC:
            return { ...state, ...action.payload }
        case SUCCESS_GETLOC:
            return { ...state, ...action.payload }
        case SUCCESS_REMLOC:
            const locat = state.location.filter(item => action.payload.id !== item.id);
            return {
                ...state,
                location: locat
            };
        case TOGGLE_THEME:
            return { ...state, ...action.payload }
        default: return state;

    }
}

const RootReducer = combineReducers({
    auth,
})

export default RootReducer