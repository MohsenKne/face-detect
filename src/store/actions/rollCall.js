import { ROLLCALL } from "./types";

export function getVerify({ formData }) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: ROLLCALL.GET_VERIFY,
    });
    return api.getVerify({ formData }).then(
      (result) => {
        dispatch({
          type: ROLLCALL.GET_VERIFY_SUCCESS,
          payload: result?.data,
        });
        return result;
      },
      (err) => {
        dispatch({ type: ROLLCALL.GET_VERIFY_FAILED, error: err });
        throw err;
      }
    );
  };
}
