import { USERS } from "../actions/types";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case USERS.GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case USERS.GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USERS.GET_USERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case USERS.SET_USERS:
      return {
        ...state,
        loading: true,
      };
    case USERS.SET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USERS.SET_USERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
