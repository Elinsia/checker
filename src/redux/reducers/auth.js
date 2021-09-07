import { getUID } from '../../services/authHelper';
import {
    AUTH_REGISTER,
    AUTH_REGISTER_ERROR, 
    AUTH_LOGIN, 
    AUTH_LOGIN_ERROR, 
    AUTH_LOGOUT, 
    AUTH_LOGOUT_ERROR
} from '../actions/auth/actionTypes';

const initialState = {
    isLogged: !!getUID() || false,
    errors: ''
};

const authReduser = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_REGISTER:
            console.log('reg success');
            return {
                ...state,
                isLogged: true
            };
        case AUTH_REGISTER_ERROR:
            console.log('reg error', action.error.message);
            return {
                ...state,
                errors: action.error.message
            }
        case AUTH_LOGIN:
            console.log('log success');
            return {
                ...state,
                isLogged: true
            }
        case AUTH_LOGIN_ERROR:
            console.log('log error: ', action.error.message);
            return {
                ...state,
                errors: action.error.message
            }
        case AUTH_LOGOUT:
            console.log('logout success');
            return {
                ...state,
                isLogged: false
            }
        case AUTH_LOGOUT_ERROR:
            console.log('logout error', action.error.message);
            return {
                ...state,
                errors: action.error.message
            }
        default: 
            return state;
    }
};

export default authReduser;