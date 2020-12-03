import axios from 'axios';
import {BASE_URL} from '../base-url';
import {
  ALL_INTERESTS,
  VISITING_PROFILE,
  NEAR_BY,
  NOTIFICATIONS,
  MESSAGES,
  POST_CHALLENGE,
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
} from './types';

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
//get profile
export const visitingProfile = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/user_profile`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          dispatch({
            type: VISITING_PROFILE,
            visiting: res.data.data[0],
            userChallenges: res.data.allchallenges,
            accepted: res.data.accepted,
          });
          rsl(res.data.message);
        } else {
          dispatch({
            type: VISITING_PROFILE,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
//add bio
export const addBio = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/add_bio`, {
      method: 'post',
      data,
      headers: {
        auth: token,
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
//add pic
export const updatePic = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/addpicture`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//update user location every one hour
export const getLocation = (data, token, rsl, rej) => {
  console.log(token);
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/update_location`, {
      method: 'post',
      data,
      headers: {
        auth: token,
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
        console.log(err);
        rej(err.message);
      });
  };
};
//follow
export const followUser = (data, token, rsl, rej) => {
  console.log(token);
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/follow_user`, {
      method: 'post',
      data,
      headers: {
        auth: token,
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
        console.log(err);
        rej(err.message);
      });
  };
};

//nearby
export const nearbyUsers = (token, rsl, rej) => {
  console.log(token);
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/near_by_user`, {
      method: 'post',
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: NEAR_BY,
            nearby: res.data.data,
          });
          rsl(res.data.message);
        } else {
          dispatch({
            type: NEAR_BY,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

//get notifications
export const getNotif = (token, rsl, rej) => {
  console.log(token);
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/all_notifications`, {
      method: 'post',
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: NOTIFICATIONS,
            notifications: res.data.data,
          });
          rsl(res.data.message);
        } else {
          dispatch({
            type: NOTIFICATIONS,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

//get Messages
export const getMsg = (token, data, rsl, rej) => {
  console.log('---->', token);
  return (dispatch) => {
    //   const res = axios('http://192.168.1.5:3000/api/chat', {
    //     method: 'post',
    //     headers: {
    //       auth: token,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.status == true) {
    //         dispatch({
    //           type: MESSAGES,
    //           messages: res.data.data,
    //         });
    //         rsl(res.data.data);
    //       } else {
    //         dispatch({
    //           type: MESSAGES,
    //         });
    //         rej(res.data.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       rej(err.message);
    //     });
    // };

    axios(`${BASE_URL}/Authentication/MyAllMsgs`, {
      method: 'post',
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: MESSAGES,
            messages: res.data.data,
          });
          rsl(res.data.data);
        } else {
          dispatch({
            type: MESSAGES,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

//Post challenge
export const postChallenge = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/addchallenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
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
        console.log(err);
        rej(err.message);
      });
  };
};
//get challenges
export const getChallenges = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}/Authentication/allchallenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          dispatch({
            type: ALL_CHALLENGES,
            allchallenges: res.data.data,
            dp: res.data.dp,
          });
          rsl(res.data.message);
        } else {
          rej(res.data.message);
          dispatch({
            type: ALL_CHALLENGES,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//get single challenge
export const getSingleChallenges = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/singlechallenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          dispatch({
            type: SINGLE_CHALLENGE,
            singleChallenge: res.data.data,
            responses: res.data.responses,
          });
          rsl(res.data.message);
        } else {
          rej(res.data.message);
          dispatch({
            type: SINGLE_CHALLENGE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

//get playlist
export const getPlayLists = (token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/my_playlist_names`, {
      method: 'post',
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          dispatch({
            type: PLAYLISTS_NAMES,
            playlists: res.data.data,
          });
          rsl(res.data.message);
        } else {
          rej(res.data.message);
          dispatch({
            type: PLAYLISTS_NAMES,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add calp
export const addClap = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/clap_challenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add download
export const addDownload = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/download_challenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add Share
export const addShare = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/share_challenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add Playlist
export const addPlaylist = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/addplaylistname`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data);
          dispatch({
            type: PLAYLISTS_NAMES,
            playlists: res.data.data,
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add Video to playlist
export const vidToPlaylist = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/add_challenge_to_playlist`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add Video to playlist
export const reportVideo = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/report_challange`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//hideVideo
export const hideVideo = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/hide_challenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//get categories
export const getCategories = (token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/category`, {
      method: 'post',

      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
          dispatch({
            type: GET_CATEGORIES,
            categories: res.data.data,
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//get users
export const getUsers = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/all_users`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        // console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.data);
        } else {
          rej(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//get hashtag
export const hastagChallenges = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/allchallenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        // console.log('res', res);
        if (res.data.status == true) {
          rsl(res.data.message);
          dispatch({
            type: HASHTAG_CHALLENGES,
            hashtag: res.data.data,
          });
        } else {
          rej(res.data.message);
          dispatch({
            type: HASHTAG_CHALLENGES,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//see full thread
export const seeFullThread = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/allchallenge`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        // console.log('res', res);
        if (res.data.status == true) {
          dispatch({
            type: SEE_FULL_THREAD,
            fullThread: res.data.data,
          });
          rsl(res.data.message);
        } else {
          dispatch({
            type: SEE_FULL_THREAD,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};

//see serached challenges
export const searchChallenge = (token, data, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/search`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: SEARCH_CHALLENGE,
            searched: res.data.data,
          });
          rsl(res.data.message);
        } else {
          dispatch({
            type: SEARCH_CHALLENGE,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//add serached item
export const addSearchItem = (data, rsl, rej) => {
  return (dispatch) => {
    try {
      dispatch({
        type: ADD_SEARCH,
        recentSearches: data,
      });
      rsl();
    } catch (err) {
      rej();
    }
  };
};
//search detail
export const getDetailedSearch = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/search_result`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: GET_DETAIL_SEARCH,
            searchedChallenges: res.data.data.challenges,
            searchedUsers: res.data.data.users,
          });
          rsl(res.data.data);
        } else {
          dispatch({
            type: GET_DETAIL_SEARCH,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//send msg
export const sendMsg = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/SendMsg`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          // dispatch({
          //   type: SEND_MESSAGE,
          //   conversation: res.data.data,
          // });
          rsl(res.data.data);
        } else {
          // dispatch({
          //   type: GET_CONVERSATION,
          // });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
//get conversation
export const getConvo = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios('http://192.168.1.5:3000/api/conversation', {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          dispatch({
            type: GET_CONVERSATION,
            conversation: res.data.data,
          });
          rsl(res.data.data);
        } else {
          dispatch({
            type: GET_CONVERSATION,
          });
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
    // axios(`${BASE_URL}Authentication/Convo`, {
    //   method: 'post',
    //   data,
    //   headers: {
    //     auth: token,
    //   },
    // })
    //   .then((res) => {
    //     if (res.data.status == true) {
    //       dispatch({
    //         type: GET_CONVERSATION,
    //         conversation: res.data.data,
    //       });
    //       rsl(res.data.data);
    //     } else {
    //       dispatch({
    //         type: GET_CONVERSATION,
    //       });
    //       rej(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     rej(err.message);
    //   });
  };
};
//open Notifications
export const openNotification = (data, token, rsl, rej) => {
  return (dispatch) => {
    axios(`${BASE_URL}Authentication/open_notification`, {
      method: 'post',
      data,
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        console.log('res', res);
        if (res.data.status == true) {
          dispatch({
            type: OPEN_NOTIF,
            notifDetail: res.data.data,
          });
          rsl(res.data.message);
        } else {
          rej(res.data.message);
          dispatch({
            type: OPEN_NOTIF,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
