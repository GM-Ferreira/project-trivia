import md5 from 'crypto-js/md5';

import {
  REQUEST_QUESTION_SUCCESS,
  REQUEST_QUESTION_PROCESS,
  REQUEST_QUESTION_FAIL,
  LOGIN } from './actions';

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

export const sendPicture = (foto, name) => ({ type: LOGIN, payload: { foto, name } });

export const getEmail = (email, name) => async (dispatch) => {
  try {
    const endPoint = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const request = await fetch(endPoint);
    dispatch(sendPicture(endPoint, name));
    console.log(request);
  } catch (error) {
    console.log(error);
  }
};

// da nada
