

import axios from "axios";
import Config from "react-native-config";
import { isLoadingStop, successSignIn } from "../actions";
import { put, call, takeEvery, fork, takeLatest } from "redux-saga/effects"
import { REQUEST_SIGNUP, isLoadingStart, REQUEST_SIGNIN } from './../actions';
import AsyncStorage from '@react-native-community/async-storage';
import { REQUEST_AUTOSIGNIN } from './../actions/index';
const GOOGLE_MAPS_API_KEY="AIzaSyCtaFiAf4xeHnq1BZkwlReHU7upmJrfaf8"
const FIREBASE_API_KEY="AIzaSyAcflMJUNARRT4uVfx2HlcYbGBZXNfvYRI"
function* AuthSignUp(data) {
    try {
        return yield axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
            ...data
        })
    } catch (error) {
        return yield error.response
    }
}

function* AuthSignIn(data) {
    try {
        return yield axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            ...data
        })
    } catch (error) {
        return yield error.response
    }
}

function* AuthRefreshToken(data) {
    try {
        return yield axios.post(
            `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
            ...data
        })
    } catch (error) {
        return yield error.response
    }
}

function* SignUpHandler({ payload: { values } }) {
    yield put(isLoadingStart({ isLoading: true }))
    const result = yield call(AuthSignUp, values);
    if (result.status === 200) {
        yield put(isLoadingStop({ isLoading: false }))

    } else {
        yield put(isLoadingStop({ isLoading: false }))
        console.log(result.data.error.message)
        const msg = `Sign Up Failed: ${result.data.error.message}`
        alert(msg)
    }

}

function* SignInHandler({ payload: { values } }) {
    yield put(isLoadingStart({ isLoading: true }))
    const result = yield call(AuthSignIn, values);
    if (result.status === 200) {
        yield put(isLoadingStop({ isLoading: false }))
        yield put(successSignIn({ isAuthenticated: true }))
        yield call(setStorage, { token: result.data.idToken, expiryDate: new Date().getTime() + result.data.expiresIn * 1000, refreshToken: result.data.refreshToken })

    } else {
        yield put(isLoadingStop({ isLoading: false }))
        console.log(result.data.error.message)
        const msg = `Sign Up Failed: ${result.data.error.message}`
        alert(msg)
    }
}

function* setStorage({ token, expiryDate, refreshToken }) {
    yield AsyncStorage.setItem('auth_data', JSON.stringify({ token, expiryDate, refreshToken }))
}
function* GetStorage() { return yield AsyncStorage.getItem("auth_data") }
function* ClearStorage() { return yield AsyncStorage.removeItem("auth_data") }

function* AutoSignIn() {
    const results = yield call(GetStorage)
    const auth = yield JSON.parse(results)
    if (auth && auth.expiryDate > new Date().getTime()) { if (auth.token) yield put(successSignIn({ isAuthenticated: true })) }
    else {
        const result = yield call(AuthRefreshToken, { grant_type: 'refresh_token', refresh_token: auth && auth.refreshToken })
        console.log(result)
        if (result.data.id_token) {
            console.log("refresh token worked")
            yield call(setStorage, { token: result.data.id_token, expiryDate: new Date().getTime() + result.data.expires_in * 1000, refreshToken: result.data.refresh_token })
            yield put(successSignIn({ isAuthenticated: true }))
        } else {
            yield call(ClearStorage)
        }
    }
}

function* watchLogs() {
    yield takeEvery(REQUEST_SIGNUP, SignUpHandler)
    yield takeEvery(REQUEST_SIGNIN, SignInHandler)
    yield takeLatest(REQUEST_AUTOSIGNIN, AutoSignIn)
}

export default function* rootSaga() {
    yield fork(watchLogs)
}