import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

// used saga instead
export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SAGA,
        orderData: orderData,
        token: token
    };
   /*  return dispatch => {
        dispatch(purchaseBurgerStart());
        // firebase call -> .json is necessary
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
                dispatch(purchaseBurgerError(error))
            });
    }; */
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerError = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_ERROR,
        error: error
    };
};


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

// used saga instead
export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_SAGA,
        token: token,
        userId: userId
    }
   /*  return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        // firebase call -> .json is necessary
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersError(error));
            });
    }; */
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersError = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        error: error
    };
};