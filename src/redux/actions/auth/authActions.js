import { 
  AUTH_REGISTER,
  AUTH_REGISTER_ERROR, 
  AUTH_LOGIN, 
  AUTH_LOGIN_ERROR, 
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR
} from './actionTypes';

import { setUID, removeUID } from '../../../services/authHelper'; 

export const registerUser = (user) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    firebase.createUser({
      email: user.email,
      password: user.password
    })
    .then((res) => {
      firestore
        .collection('users')
        .doc(getState().firebase.auth.uid)
        .set({
          uid: getState().firebase.auth.uid,
          displayName: user.fname,
          email: user.email,
          role: 'user'
        })
        .then(() => {
          dispatch({
            type: AUTH_REGISTER
          });
          setUID(getState().firebase.auth.uid);
        })
        .catch(error => {
          dispatch({
            type: AUTH_REGISTER_ERROR,
            error
          });
        });
    })
    .catch(error => {
      dispatch({
        type: AUTH_REGISTER_ERROR,
        error
      });
    });
    
  }
}
export const loginUser = (user) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.login({
      email: user.email,
      password: user.password
    })
    .then((res) => {
      dispatch({
        type: AUTH_LOGIN
      });
      console.log(res.user.user);
      setUID(res.user.user.uid);
    })
    .catch(error => {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        error
      });
    });
  }
}
export const logoutUser = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.logout()
    .then(() => {
      dispatch({
        type: AUTH_LOGOUT
      });
      removeUID();
    })
    .catch(error => {
      dispatch({
        type: AUTH_LOGOUT_ERROR,
        error
      });
    });
  }
}
