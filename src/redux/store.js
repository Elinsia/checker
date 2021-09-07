import { getFirebase, getFirestore } from 'react-redux-firebase';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}), logger));

export default store;