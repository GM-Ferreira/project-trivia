import { LOGIN, UPDATE_SCORE } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  foto: '',
  nome: '',
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      foto: action.payload.foto,
      nome: action.payload.name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default reducerLogin;
