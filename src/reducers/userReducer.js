import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_UPDATE,
  USER_DATA,
  SET_USER,
  UNSET_USER,
} from "../actions/types";

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_SIGNUP:
      return state;
    case USER_LOGIN:
      return action.payload;
    case USER_UPDATE:
      return state;
    case USER_DATA:
      return state;
    case SET_USER:
      return action.payload;
    case UNSET_USER:
      return initialState;
    default:
      console.log("default reducer");
      return state;
  }
}
