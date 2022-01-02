import { USER_SIGNUP, USER_LOGIN, USER_UPDATE, USER_DATA } from "./types";

// Firebase
import { auth } from "../firebase";

export const userSignup = (userData) => ({
  type: USER_SIGNUP,
  payload: userData,
});

export const userLogin = (authToolkit, formData, setFormData) => (dispatch) => {
  authToolkit
    .handleSignIn(formData.email, formData.newPassword1)
    .then(() => auth.currentUser.reload())
    .then(() => {
      const data = {
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      };
      dispatch({
        type: USER_LOGIN,
        payload: data,
      });
    })
    .catch((firebaseError) => {
      setFormData({
        ...formData,
        formLoading: false,
        formValidated: false,
        formError: `There was an error: ${firebaseError.code}.`,
      });
      setTimeout(() => {
        setFormData({
          ...formData,
          formError: "",
        });
      }, 5000);
    });
};

export const userUpdate = ({ email, password }) => ({
  type: USER_UPDATE,
  payload: { email, password },
});

export const userData = () => ({
  type: USER_DATA,
});
