import axios from 'axios';
import {BASE_URL} from '../base-url';
import {ALL_INTERESTS} from './types';

//Local Types
export const APP_LOADING = 'APP_LOADING';
export const APP_FAILED = 'APP_FAILED';

//get Interests
export const getInterests = (rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/all_interest`, {
      method: 'post',
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.message);

          dispatch({
            type: ALL_INTERESTS,
            interests: res.data.data,
          });
        } else {
          dispatch({
            type: ALL_INTERESTS,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
//get Interests
export const saveInterests = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/save_interest`, {
      method: 'post',
      data,
      headers: {
        auth: 'a1d0c6e83f027327d8461063f4ac58a6',
      },
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
