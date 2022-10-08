import { REQUEST_QUESTION_SUCCESS, REQUEST_QUESTION_PROCESS } from '../actions/actions';

const INITIAL_STATE = {
  questions: {
    0: {
      category: '',
      question: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
    },
  },
  isLoading: true,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_PROCESS:
    return {
      ...state,
      isLoading: true,
    }; case REQUEST_QUESTION_SUCCESS:
    return {
      ...state,
      questions: action.list.map((questionMap) => ({
        question: questionMap.question,
        category: questionMap.category,
        answers: { ...questionMap.incorrect_answers,
          'correct-answer': questionMap.correct_answer },
      })),
      isLoading: false,
    };
  default:
    return state;
  }
};

export default questionReducer;
