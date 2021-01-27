import React, { useEffect, useCallback } from "react";
import Order from '../Order/Order';
import axios from '../../axios-orders';
import { useSelector, useDispatch } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/actions';
import Spinner from '../UI/Spinner/Spinner';

const orders = props => {

    // instead of mapDispatchToProps
    const dispatch = useDispatch();
    // instead of mapStateToProps
    const orders = useSelector(state => state.orderReducer.orders);
    const loading = useSelector(state => state.orderReducer.loading);
    const token = useSelector(state => state.authReducer.token);
    // the same, but with return word
    const userId = useSelector(state => { return state.authReducer.userId; });

    // useCallback used to prevent infinite loop
    const onFetchOrders = useCallback(
        (token, userId) => dispatch(actionCreators.fetchOrders(token, userId)), []
    );

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [token, userId, onFetchOrders]);

    let showOrders = <Spinner />;
    if (!loading) {
        showOrders = (
            <div>
                {orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                })}
            </div>
        );
    }
    return showOrders;
}

export default withErrorHandler(orders, axios);
