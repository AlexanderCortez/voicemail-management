import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducers';

const { NODE_ENV } = process.env;

const store = NODE_ENV !== 'production'
  ? createStore(rootReducers, composeWithDevTools(applyMiddleware(ReduxThunk)))
  : createStore(rootReducers, compose(
    applyMiddleware(ReduxThunk),
  ));

export default store;
