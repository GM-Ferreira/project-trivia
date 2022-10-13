import { LOGIN, RESET_RESULTS, SEND_RANKING, UPDATE_ASSERTIONS,
  UPDATE_SCORE } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  foto: '',
  ranking: [],
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      foto: action.payload.foto,
      name: action.payload.name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case RESET_RESULTS:
    return {
      ...state,
      foto: '',
      assertions: 0,
      name: '',
      score: 0,
    };
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case SEND_RANKING:
    return {
      ...state,
      ranking: action.payload,
    };
  default:
    return state;
  }
};

export default reducerLogin;
