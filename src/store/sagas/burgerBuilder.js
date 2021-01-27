import { put } from 'redux-saga/effects'
import axios from '../../axios-orders';
import * as actionCreators from '../actions/actions';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get(
            'https://burger-builder-ffaac-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');
        yield put(actionCreators.setIngredients(response.data));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsError());
    }
}