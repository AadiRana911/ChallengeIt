import {REGISTER_USER, LOGIN_USER} from '../actions/types';
const initialState = {
  loggedIn: false,
  token: null,
  user: null,
  settings: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
      };
    case 'PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'FORGOT':
      return {
        ...state,
        forgot: action.fogot,
      };
    case 'CHECK_EMAIL':
      return {
        ...state,
        checkmail: action.checkmail,
      };
    case 'GET_INTERESTS':
      return {
        ...state,
        interests: action.interests,
      };
    default:
      return state;
  }
};
