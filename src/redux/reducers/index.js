import { combineReducers } from 'redux';
import reducerLogin from './login';
import questionReducer from './questions';

const rootReducer = combineReducers({ reducerLogin, questionReducer });

export default rootReducer;
