import { applyMiddleware, createStore, Store } from 'redux';
import reducers from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let store: Store;
if (typeof window === 'undefined') {
  store = createStore(reducers, applyMiddleware(logger, thunk));
} else {
  if (!window['__NEXT_REDUX_STORE__']) {
    store = createStore(reducers, applyMiddleware(logger, thunk));
    window['__NEXT_REDUX_STORE__'] = store;
  } else {
    store = window['__NEXT_REDUX_STORE__'];
  }
}

export default store;
