import { AUTH } from "./types";
import { storageHelper } from "../../helpers";

export function login({ username, password }) {
  return function (dispatch, getState, { api }) {
    // dispatch({
    //   type: AUTH.SET_AUTH,
    // });
    // return api.login({ username, password }).then(
    //   (result) => {
    //     const { data } = result.data;
    //     storageHelper.setApiToken(data.token);
    //     dispatch({
    //       type: AUTH.SET_AUTH_SUCCESS,
    //       payload: data,
    //     });
    //     return result;
    //   },
    //   (err) => {
    //     dispatch({ type: AUTH.SET_AUTH_FAILED, error: err });
    //     throw err;
    //   }
    // );

    return new Promise(function (resolve) {
      const data = { token: "4666c07df80c241de98d9fb3161edc29fa17fb25" };
      storageHelper.setApiToken(data.token);
      dispatch({
        type: AUTH.SET_AUTH_SUCCESS,
        payload: data,
      });
      resolve(true);
    });
  };
}
