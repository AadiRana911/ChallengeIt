import {
  AUTH_LOADING,
  AUTH_FAILED,
  EVENTS_FAILED,
  EVENTS_LOADING,
} from '../actions/auth';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_EVENTS,
  ALREADY_USED,
  EVENT_REGSITERED,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  token: '',
  userId: '',
  message: '',
  userData: null,
  events: null,
  status: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errMsg: null,
  firstTime: true,
  eventReg: '',
  username: '',
  dp: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALREADY_USED:
      return {
        ...state,
        firstTime: action.payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errMsg: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errMsg: action.payload,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errMsg: null,
      };
    case EVENT_REGSITERED:
      return {
        ...state,

        eventReg: action.payload.data.message,

        isLoading: false,
        isError: false,
        isSuccess: true,
        errMsg: null,
      };
    case LOGIN_USER:
      return {
        ...state,
        userId: action.payload.data.user_id,
        token: action.payload.data.token,
        message: action.payload.data.message,

        userData: action.payload.data.data,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case REGISTER_USER:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: action.payload.data.message,
        errMsg: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userId: '',
        token: '',
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    default:
      return state;
  }
};
