import { AUTH } from "../actions/types";

const initialState = {
  authenticated: null,
  error: null,
  loading: false,
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case AUTH.SET_AUTH:
      return {
        ...state,
        loading: true,
      };
    case AUTH.SET_AUTH_SUCCESS:
      const { username, user_id } = action.payload;
      return {
        ...state,
        authenticated: { username, user_id },
        loading: false,
      };
    case AUTH.SET_AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
