import * as actionTypes from './actionTypes';
// import axios from 'axios';

// const url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

// doesn't need a saga -> pure action creater without side-effect
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

// doesn't need a saga -> pure action creater without side-effect
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

// doesn't need a saga -> pure action creater without side-effect
export const authError = error => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    };
};

// saga is created instead
export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
    /* return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); // 1 hour
    }; */
};

// saga is created instead
export const auth = (email, password, method) => {
    return {
        type: actionTypes.AUTH_SAGA,
        email: email,
        password: password,
        method: method
    }
    /* return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post(url + method + '?key=AIzaSyClNIBlDCs3g1WG0TDr9HQ2oWYO81puFmM', authData)
            .then(response => {
                const expirationDate =
                    new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('uid', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authError(error.response.data.error));
            });
    }; */
};

// saga is created instead
export const logout = () => {
    // used redux-saga instead
    /* localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('uid'); */
    return {
        /* type: actionTypes.AUTH_LOGOUT */
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// saga is created instead
export const authCheck = () => {
    return {
        type: actionTypes.AUTH_CHECK_SAGA
    };
    /* return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, localStorage.getItem('uid')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }; */
};
