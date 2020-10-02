import {
  ALL_INTERESTS,
  VISITING_PROFILE,
  NEAR_BY,
  NOTIFICATIONS,
  MESSAGES,
  ALL_CHALLENGES,
} from '../actions/types';
const initialState = {
  message: '',
  interests: null,
  visiting: null,
  nearby: null,
  notifications: null,
  messages: null,
  allchallenges: null,
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
    case NEAR_BY:
      return {
        ...state,
        nearby: action.nearby,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case ALL_CHALLENGES:
      return {
        ...state,
        allchallenges: action.allchallenges,
      };

    default:
      return state;
  }
};
