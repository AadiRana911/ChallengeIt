import {
  ALL_INTERESTS,
  VISITING_PROFILE,
  NEAR_BY,
  NOTIFICATIONS,
  MESSAGES,
  ALL_CHALLENGES,
  SINGLE_CHALLENGE,
  PLAYLISTS_NAMES,
  GET_CATEGORIES,
  SEARCH_USER,
  HASHTAG_CHALLENGES,
  SEE_FULL_THREAD,
  SEARCH_CHALLENGE,
  ADD_SEARCH,
  GET_DETAIL_SEARCH,
  GET_CONVERSATION,
  SEND_MESSAGE,
  OPEN_NOTIF,
} from '../actions/types';
const initialState = {
  message: '',
  interests: null,
  visiting: null,
  nearby: null,
  notifications: null,
  messages: null,
  allchallenges: null,
  singleChallenge: null,
  responses: null,
  playlists: null,
  userChallenges: null,
  categories: null,
  hashtagVids: null,
  fullThread: null,
  acceptedChallenges: null,
  dp: '',
  searched: null,
  recentSearches: [{name: 'abcdef'}],
  searchDetail: null,
  searchedChallenges: null,
  searchedUsers: null,
  conversation: null,
  notifDetail: null,
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
        userChallenges: action.userChallenges,
        acceptedChallenges: action.accepted,
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
        dp: action.dp,
      };
    case SINGLE_CHALLENGE:
      return {
        ...state,
        singleChallenge: action.singleChallenge,
        responses: action.responses,
      };
    case PLAYLISTS_NAMES:
      return {
        ...state,
        singleChallenge: action.singleChallenge,
        playlists: action.playlists,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case HASHTAG_CHALLENGES:
      return {
        ...state,
        hashtagVids: action.hashtag,
      };
    case SEE_FULL_THREAD:
      return {
        ...state,
        fullThread: action.fullThread,
      };
    case SEARCH_CHALLENGE:
      return {
        ...state,
        searched: action.searched,
      };
    case ADD_SEARCH:
      return {
        ...state,
        recentSearches: action.recentSearches,
      };
    case GET_DETAIL_SEARCH:
      return {
        ...state,
        searchedUsers: action.searchedUsers,
        searchedChallenges: action.searchedChallenges,
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.conversation,
      };
    case OPEN_NOTIF:
      return {
        ...state,
        notifDetail: action.notifDetail,
      };
    default:
      return state;
  }
};
