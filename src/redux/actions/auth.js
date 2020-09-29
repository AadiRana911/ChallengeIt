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
//check if email already exists
export const checkEmail = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/checkemail`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
//check if username already exists
export const checkUsername = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/checkusername`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};

//register user
export const registerUser = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/signpup`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.message);
          dispatch({
            type: REGISTER_USER,
            user: res.data.data,
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
//register user
export const login = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/login`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.message);
          dispatch({
            type: LOGIN_USER,
            user: res.data.data,
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
