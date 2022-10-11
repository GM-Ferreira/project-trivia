import md5 from 'crypto-js/md5';

import {
  REQUEST_QUESTION_SUCCESS,
  REQUEST_QUESTION_PROCESS,
  REQUEST_QUESTION_FAIL,
  LOGIN, TIME_OUT, SELECTED_QUESTION, COUNT,
  STOP_TIMER, UPDATE_SCORE,
  UPDATE_ASSERTIONS } from './actions';

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
    dispatch(sendPicture(endPoint, name));
  } catch (error) {
    console.log(error);
  }
};

export const disableButtons = () => ({ type: TIME_OUT });

export const getTimeOnClick = (payload) => ({ type: SELECTED_QUESTION, payload });

export const justPassScore = (payload) => ({ type: UPDATE_SCORE, payload });

export const stopTimer = (payload) => ({ type: STOP_TIMER, payload });

export const addAssertions = () => ({ type: UPDATE_ASSERTIONS });

export const uptadeScoreBoard = (answer) => async (dispatch, getState) => {
  const { idQuestion } = getState().questionReducer;
  const { difficulty } = getState().questionReducer.questions[idQuestion];
  const getTime = getState().questionReducer.time;
  console.log(getTime);
  console.log(answer);
  console.log(difficulty);
  const magicNumber = 10;
  const hard = 3;
  if (answer === 'correct-answer') {
    if (difficulty === 'hard') {
      const scoreHard = magicNumber + (getTime * hard);
      dispatch(justPassScore(scoreHard));
      dispatch(addAssertions());
      return scoreHard;
    } if (difficulty === 'medium') {
      const scoreMedium = magicNumber + (getTime * 2);
      dispatch(justPassScore(scoreMedium));
      dispatch(addAssertions());
      return scoreMedium;
    }
    if (difficulty === 'easy') {
      const scoreEasy = magicNumber + (getTime * 1);
      dispatch(justPassScore(scoreEasy));
      dispatch(addAssertions());
      return scoreEasy;
    }
  } else dispatch(justPassScore(0));
};

export const nextQuestion = () => ({
  type: COUNT,
});
