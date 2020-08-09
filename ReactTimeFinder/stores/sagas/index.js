
import Auth from './auth'
import Location from "./location"
import { all, fork } from 'redux-saga/effects';
export default function* rootSaga() {
   /*  yield all([
        Auth,
        Location
    ]) */
    yield fork(Auth);
  yield fork(Location);
}
