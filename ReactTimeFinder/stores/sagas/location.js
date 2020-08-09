
import axios from "axios";
import { put, call, fork, takeEvery } from "redux-saga/effects";
import { isLoadingStart, successAddLoc, REQUEST_ADDLOC, successGetLoc, REQUEST_GETLOC } from "../actions";
import AsyncStorage from "@react-native-community/async-storage";
const BASE_URL = "https://directionsapi-1540399801909.firebaseio.com"

function* GetAuth() {
    const results = yield AsyncStorage.getItem("auth_data")
    const auth_data = yield JSON.parse(results)
    const token = yield auth_data.token
    const auth = "?auth=" + token
    return auth
}
function* AddLocation(data) {
    const auth = yield GetAuth()
    try {
        return yield axios.post(`${BASE_URL}/location.json${auth}`, {
            ...data
        })
    } catch (error) {
        return yield error.response
    }
}
function* GetLocation() {
    const auth = yield GetAuth()
    try {
        const result = yield axios.get(`${BASE_URL}/location.json${auth}`)
        console.log(result)
        return result
    } catch (error) {
        return yield error.response
    }
}

function* AddLocationHandler({ payload: { values } }) {
    yield put(isLoadingStart({ isLoading: true }))
    const result = yield call(AddLocation, values);
    if (result.status === 200) {
      alert('Location Saved')
    }
    else {
        alert(result.data.error)
    }
}

function* GetLocationHandler() {
    yield put(isLoadingStart({ isLoading: true }))
    const result = yield call(GetLocation);
    console.log(result)
    if (result.status === 200) {
        const location =[]
        for(let key in result.data){
            location.push({
                ...result.data[key],
                id:key
            })
        }
        yield put(successGetLoc({ location}))

    }
    else {
        alert(result.data.error)
    }
}


function* watchLogs() {
    yield takeEvery(REQUEST_ADDLOC, AddLocationHandler)
    yield takeEvery(REQUEST_GETLOC, GetLocationHandler)
}

export default function* rootSaga() {
    yield fork(watchLogs)
}