import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from './ducks';

const rootReducer = (state, action) => {
  // if (action.type === LOG_OUT) state = undefined;
  return combineReducers(reducers)(state, action);
};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, devTools);

export default store;
