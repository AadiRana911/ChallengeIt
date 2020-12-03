import {REGISTER_USER, LOGIN_USER, LOGOUT} from '../actions/types';
const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
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
        isLoggedIn: true,
        token: action.user.auth,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
