import { LOGIN } from '../actions/actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
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
  default:
    return state;
  }
};

export default reducerLogin;
