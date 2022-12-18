import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';


const rootReducer = combineReducers({
  cashReducer,
  customerReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export {store};