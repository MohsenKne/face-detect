import { USERS } from "./types";

export function getUsers() {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: USERS.GET_USERS,
    });
    return api.getUsers().then(
      (result) => {
        dispatch({
          type: USERS.GET_USERS_SUCCESS,
          payload: result?.data,
        });
        return result;
      },
      (err) => {
        dispatch({ type: USERS.GET_USERS_FAILED, error: err });
        throw err;
      }
    );
  };
}

export function setUser({ formData }) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: USERS.SET_USERS,
    });
    return api.setUser({ formData }).then(
      (result) => {
        dispatch({
          type: USERS.SET_USERS_SUCCESS,
        });
        return result;
      },
      (err) => {
        dispatch({ type: USERS.SET_USERS_FAILED, error: err });
        throw err;
      }
    );
  };
}
