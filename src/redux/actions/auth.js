import axios from 'axios';
import {BASE_URL} from '../base-url';
import {LOGIN_USER, REGISTER_USER, LOGOUT_USER} from './types';

//Local Types
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_FAILED = 'AUTH_FAILED';

export const GoogleLogin = (params) => {
  console.log(params);
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BASE_URL}Api/login`, params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res && res.data.response === 'error')
        return dispatch(authFailed(res.data.message));
      dispatch(loginSuccess(res));
    } catch (err) {
      dispatch(authFailed(err));
    }
  };
};

export const registerUser = (params) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(
        'https://rora.coviknow.com/Authentication/addworld',
        params,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(registerSuccess(res));
    } catch (err) {
      dispatch(authFailed(err));
    }
  };
};

//helper Functions
const authLoading = () => ({
  type: AUTH_LOADING,
});
const authFailed = (err) => ({
  type: AUTH_FAILED,
  payload: err,
});
const loginSuccess = (res) => ({
  type: LOGIN_USER,
  payload: res,
});
const registerSuccess = (res) => ({
  type: REGISTER_USER,
  payload: res,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER,
});
const eventsLoading = () => ({
  type: EVENTS_LOADING,
});
