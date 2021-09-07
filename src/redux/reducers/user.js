import {
    USER_TODAY_INFO,
    USER_ALL_DATES,
    USER_CAME,
    USER_GONE,
    USER_MEAL,
    USER_CONTINUE,
    USER_ERROR
} from '../actions/user/actionTypes';

const initialState = {
    todayInfo: {
        timestamp: '',
        startTime: '--:--',
        endTime: '--:--',
        dinner: '00:00',
        pause: ['00:00'] 
    },
    allDates: [],
    error: null
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case USER_TODAY_INFO:
            return {
                ...state,
                todayInfo: {
                    ...state.todayInfo,
                    ...action.todayInfo
                }
            }
        case USER_ALL_DATES:
            return {
                ...state,
                allDates: action.dates
            }
        case USER_CAME:
            return {
                ...state
            };
        case USER_GONE:
            return {
                ...state
            }
        case USER_MEAL:
            return {
                ...state
            }
        case USER_CONTINUE:
            return {
                ...state
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.error
            }    
        default: 
            return state;
    }
};

export default user;