import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'testToken',
            userId: 'testUserId'
        }
        )).toEqual(
            {
                token: 'testToken',
                userId: 'testUserId',
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        );
    });
});