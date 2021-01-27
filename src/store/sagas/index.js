import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    // run multiple generators or tasks simultaneously -> all at the same time
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_SAGA, authCheckSaga),
        takeEvery(actionTypes.AUTH_SAGA, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    ]);
    /* set up a listener for the ation type and then execute the method */
    /* yield takeEvery(actionTypes.AUTH_CHECK_SAGA, authCheckSaga);
    yield takeEvery(actionTypes.AUTH_SAGA, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); */
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS_SAGA, initIngredientsSaga);
}

export function* watchOrder() {
    // only one process will be executed
    yield takeLatest(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga);
}