import { combineReducers } from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import user from './user';
import authReduser from './auth';

const reducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReduser,
    user
});

export default reducer;