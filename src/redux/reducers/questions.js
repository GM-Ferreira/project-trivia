import {
  REQUEST_QUESTION_SUCCESS,
  REQUEST_QUESTION_PROCESS,
  REQUEST_QUESTION_FAIL, TIME_OUT } from '../actions/actions';

const INITIAL_STATE = {
  questions: {
    0: {
      category: '',
      question: '',
      type: '',
      difficulty: '',
      answers: {},
      disable: false,
    },
  },
  isLoading: true,
  isValid: true,
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
  default:
    return state;
  }
};

export default questionReducer;
