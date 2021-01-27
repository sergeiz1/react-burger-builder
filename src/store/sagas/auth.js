import { put, delay, call } from 'redux-saga/effects'
import axios from 'axios';
import * as actionCreators from '../actions/actions';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
// function* -> turning the funtion to generator
// generators are next JS features
// wich are functions and can be executed
// incrementally
// we can pause during function execution
// until  e.g. async code to finish
export function* logoutSaga(action) {
    // yield is like await - waiting until it is done
    /* yield localStorage.removeItem('token'); */
    // call -> call some function on some object
    // it makes a generator testable -> we can mock this without execution
    yield call([localStorage, 'removeItem'], 'token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('uid');
    // yield === dispatch
    yield put(actionCreators.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000); // 1 hour
    yield put(actionCreators.logout());
}

export function* authSaga(action) {
    yield put(actionCreators.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    try {
        const response = yield axios.post(url +
            action.method + '?key=AIzaSyClNIBlDCs3g1WG0TDr9HQ2oWYO81puFmM', authData)
        const expirationDate =
            yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('uid', response.data.localId);
        // dispatch
        yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actionCreators.authError(error.response.data.error));
    }
}

export function* authCheckSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        // dispatch
        yield put(actionCreators.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            // dispatch
            yield put(actionCreators.logout());
        } else {
            yield put(actionCreators.authSuccess(token, localStorage.getItem('uid')));
            yield put(actionCreators.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}