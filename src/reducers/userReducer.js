import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_UPDATE,
  USER_DATA,
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
    default:
      console.log("default reducer");
      return state;
  }
}
