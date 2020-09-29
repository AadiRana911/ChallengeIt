import {ALL_INTERESTS} from '../actions/types';
const initialState = {
  message: '',
  interests: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_INTERESTS:
      return {
        ...state,
        interests: action.interests,
      };

    default:
      return state;
  }
};
