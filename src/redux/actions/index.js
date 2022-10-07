// import { LOGIN } from './actions';

export const tokenRequest = () => async () => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    const { token } = response;
    localStorage.setItem('token', token);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const ter = () => {};
