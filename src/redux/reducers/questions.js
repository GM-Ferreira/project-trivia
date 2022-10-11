import {
  REQUEST_QUESTION_SUCCESS,
  REQUEST_QUESTION_PROCESS,
  REQUEST_QUESTION_FAIL, TIME_OUT, SELECTED_QUESTION,
  STOP_TIMER, COUNT } from '../actions/actions';

const INITIAL_STATE = {
  questions: [],
  disable: false,
  time: 0,
  isLoading: true,
  isValid: true,
  idQuestion: 0,
  idTimer: 0,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_PROCESS:
    return {
      ...state,
      isLoading: true,
    }; case REQUEST_QUESTION_FAIL:
    return {
      ...state,
      isValid: false,
    }; case REQUEST_QUESTION_SUCCESS:
    return {
      ...state,
      questions: action.list,
      isLoading: false,
    };
  case TIME_OUT:
    return {
      ...state,
      disable: !state.disable,
    };
  case SELECTED_QUESTION:
    return {
      ...state,
      time: action.payload,
      disable: true,
    };
  case STOP_TIMER:
    return {
      ...state,
      idTimer: action.payload,
    };
  case COUNT:
    return {
      ...state,
      disable: false,
      idQuestion: state.idQuestion + 1,
    };
  default:
    return state;
  }
};

export default questionReducer;
