import {
  REQUEST_QUESTION_SUCCESS,
  REQUEST_QUESTION_PROCESS,
  REQUEST_QUESTION_FAIL } from './actions';

export const questionList = (list) => ({
  type: REQUEST_QUESTION_SUCCESS,
  list,
});

export const invalidToken = () => ({
  type: REQUEST_QUESTION_FAIL,
});

export const questionIsLoading = () => ({
  type: REQUEST_QUESTION_PROCESS,
});

export const questionRequest = (token) => async (dispatch) => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    const responseCode = response.response_code;
    if (responseCode === 0) {
      const list = response.results;
      console.log(list);
      dispatch(questionList(list));
    } else {
      localStorage.clear();
      await dispatch(invalidToken());
      throw new Error('Not Found');
    }
  } catch (e) {
    console.log(e);
  }
};

export const tokenRequest = () => async (dispatch) => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    const { token } = response;
    localStorage.setItem('token', token);
    dispatch(questionRequest(token));
    dispatch(questionIsLoading());
  } catch (e) {
    console.log(e);
  }
};
