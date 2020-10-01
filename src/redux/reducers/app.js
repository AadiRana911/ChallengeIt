import {ALL_INTERESTS, VISITING_PROFILE} from '../actions/types';
const initialState = {
  message: '',
  interests: null,
  visiting: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_INTERESTS:
      return {
        ...state,
        interests: action.interests,
      };
    case VISITING_PROFILE:
      return {
        ...state,
        visiting: action.visiting,
      };

    default:
      return state;
  }
};
