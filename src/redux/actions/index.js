import md5 from 'crypto-js/md5';
import { LOGIN } from './actions';

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
