import axios from 'axios';
import {BASE_URL} from '../base-url';
import {
  ALL_INTERESTS,
  VISITING_PROFILE,
  NEAR_BY,
  NOTIFICATIONS,
  MESSAGES,
  POST_CHALLENGE,
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
        if (res.data.status == true) {
          dispatch({
            type: VISITING_PROFILE,
            visiting: res.data.data[0],
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
//add bio
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
export const getMsg = (token, rsl, rej) => {
  console.log(token);
  return (dispatch) => {
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
          rsl(res.data.message);
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

//get Messages
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
