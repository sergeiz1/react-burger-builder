import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        /* return {
            ...state,
            purchased: false
        }; */
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        /*  return {
             ...state,
             loading: true
         }; */
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            /* {
                ...action.orderData,
                id: action.orderId
            } */
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
        /* return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true
        }; */
        case actionTypes.PURCHASE_BURGER_ERROR:
            return updateObject(state, { loading: false });
        /* return {
            ...state,
            loading: false
        }; */
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        /* return {
            ...state,
            loading: true
        }; */
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                loading: false,
                orders: action.orders
            });
        /* return {
            ...state,
            loading: false,
            orders: action.orders
        }; */
        case actionTypes.FETCH_ORDERS_ERROR:
            return updateObject(state, { loading: false });
            /* return {
                ...state,
                loading: false
            }; */
        default:
            return state;
    }
};

export default orderReducer;
