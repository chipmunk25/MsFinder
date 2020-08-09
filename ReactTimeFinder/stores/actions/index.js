import {
    createAction
} from 'redux-actions';


export const REQUEST_AUTOSIGNIN = 'REQUEST_AUTOSIGNIN'

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const SUCCESS_SIGNUP = 'SUCCESS_SIGNUP';
export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export const SUCCESS_SIGNIN = 'SUCCESS_SIGNIN';
export const ISLOADING_START = 'ISLOADING_START';
export const ISLOADING_STOP = 'ISLOADING_STOP';

export const REQUEST_ADDLOC = 'REQUEST_ADDLOC'
export const SUCCESS_ADDLOC = 'SUCCESS_ADDLOC'

export const REQUEST_GETLOC = 'REQUEST_GETLOC'
export const SUCCESS_GETLOC = 'SUCCESS_GETLOC'


export const requestAutoSignIn = createAction(REQUEST_AUTOSIGNIN);

export const requestSignUp = createAction(REQUEST_SIGNUP);
export const successSignUp = createAction(SUCCESS_SIGNUP);
export const requestSignIn = createAction(REQUEST_SIGNIN);
export const successSignIn = createAction(SUCCESS_SIGNIN);
export const isLoadingStart = createAction(ISLOADING_START);
export const isLoadingStop = createAction(ISLOADING_STOP);

export const requestAddLoc = createAction(REQUEST_ADDLOC);
export const successAddLoc = createAction(SUCCESS_ADDLOC);

export const requestGetLoc = createAction(REQUEST_GETLOC);
export const successGetLoc = createAction(SUCCESS_GETLOC);
