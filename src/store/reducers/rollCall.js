import { ROLLCALL } from "../actions/types";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case ROLLCALL.GET_VERIFY:
      return {
        ...state,
        loading: true,
      };
    case ROLLCALL.GET_VERIFY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ROLLCALL.GET_VERIFY_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
