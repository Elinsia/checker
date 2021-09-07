import {USER_TODAY_INFO, USER_ALL_DATES, USER_CAME, USER_GONE, USER_MEAL, USER_CONTINUE, USER_ERROR} from './actionTypes';

import { getUID } from '../../../services/authHelper'
import { timeToMs, msToTime } from '../../../services/dateHelper'

export const userTodayInfo = () => {
  return (dispatch, getState, { getFirebase }) => {
    const today = new Date();
    const firestore = getFirebase().firestore();
    firestore
      .collection('users')
      .doc(getUID())
      .collection('checker')
      .doc(today.toLocaleDateString())
      .onSnapshot({
        error: error => {
          dispatch({
            type: USER_ERROR,
            error
          }); 
        },
        next: res => {
          dispatch({
            type: USER_TODAY_INFO,
            todayInfo: res.data()
          });
        }
      })
  }
}
export const userAllDates = () => {
  return (dispatch, getState, { getFirebase }) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getTime();
    const firestore = getFirebase().firestore();
    firestore
      .collection('users')
      .doc(getUID())
      .collection('checker')
      .where('timestamp', '<=', lastDayOfMonth)
      .where('timestamp', '>=', firstDayOfMonth)
      .orderBy('timestamp', 'desc')
      .onSnapshot({
        error: error => {
          dispatch({
            type: USER_ERROR,
            error
          }); 
        },
        next: res => {
          const data = res.docs.map(doc => {
          return {
            date: doc.id,
            time: doc.data()
          }
        });
        dispatch({
          type: USER_ALL_DATES,
          dates: data
        });
        }
      })
  }
}
export const userCame = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const today = new Date();
    firestore
      .collection('users')
      .doc(getState().firebase.auth.uid)
      .collection('checker')
      .doc(today.toLocaleDateString())
      .set({
        timestamp: today.getTime(),
        startTime: `${today.getHours()}:${(today.getMinutes()<10?'0':'') + today.getMinutes()}`,
        endTime: '--:--',
        dinner: '00:00',
        pause: ['00:00'],
      })
      .then(() => {
        dispatch({
          type: USER_CAME,
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          error
        });
      });
  }
}
export const userGone = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const today = new Date();
    firestore
      .collection('users')
      .doc(getState().firebase.auth.uid)
      .collection('checker')
      .doc(today.toLocaleDateString())
      .set({
        endTime: `${today.getHours()}:${(today.getMinutes()<10?'0':'') + today.getMinutes()}`,
      }, {merge: true})
      .then(() => {
        dispatch({
          type: USER_GONE
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          error
        });
      });
  }
}
export const userMeal = (time) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const today = new Date();
    firestore
      .collection('users')
      .doc(getState().firebase.auth.uid)
      .collection('checker')
      .doc(today.toLocaleDateString())
      .set({
        dinner: time || '01:00'
      }, {merge: true})
      .then(() => {
        dispatch({
          type: USER_MEAL,
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          error
        });
      });
  }
}
export const userContinue = (endTime) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    console.log(getFirebase())
    const today = new Date();
    firestore
      .collection('users')
      .doc(getState().firebase.auth.uid)
      .collection('checker')
      .doc(today.toLocaleDateString())
      .set({
        endTime: '--:--',
        pause: getFirebase().firestore.FieldValue.arrayUnion(msToTime(timeToMs(`${today.getHours()}:${(today.getMinutes()<10?'0':'') + today.getMinutes()}`) - timeToMs(endTime)))
      }, {merge: true})
      .then(() => {
        dispatch({
          type: USER_CONTINUE,
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          error
        });
      });
  }
}