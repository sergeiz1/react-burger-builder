import { put } from 'redux-saga/effects'
import axios from '../../axios-orders';
import * as actionCreators from '../actions/actions';

export function* purchaseBurgerSaga(action) {
    yield put(actionCreators.purchaseBurgerStart());
    try {
        // firebase call -> .json is necessary
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actionCreators.purchaseBurgerError(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actionCreators.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    // firebase call -> .json is necessary
    try {
        const response = yield axios.get('/orders.json' + queryParams)
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actionCreators.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actionCreators.fetchOrdersError(error));

    }

}