import {REGISTER_USER, LOGIN_USER} from '../actions/types';
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

    default:
      return state;
  }
};
