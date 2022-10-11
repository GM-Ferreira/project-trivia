import { combineReducers } from 'redux';
import reducerLogin from './login';
import questionReducer from './questions';

const rootReducer = combineReducers({ player: reducerLogin, questionReducer });

export default rootReducer;
