import { reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../firebase";

import { SET_USER, UNSET_USER } from "./types";

export const userUpdate =
  (authToolkit, formData, setFormData) => (dispatch) => {
    const credential = authToolkit.EmailAuthProvider.credential(
      authToolkit.currentUser.email,
      formData.oldPassword
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() =>
        formData.email !== authToolkit.currentUser.email
          ? authToolkit.handleUpdateEmail(formData.email)
          : true
      )
      .then(() =>
        formData.password1
          ? authToolkit.handleUpdatePassword(formData.password1.current.value)
          : true
      )
      .then(() =>
        authToolkit.handleUpdateProfile(formData.displayName, formData.photoURL)
      )
      .then(() => {
        const data = {
          uid: auth.currentUser.uid,
          email: formData.email,
          displayName: formData.displayName,
          photoURL: formData.photoURL,
        };
        dispatch({
          type: SET_USER,
          payload: data,
        });
        setFormData({
          ...formData,
          formSuccess: "Changes to your profile were saved.",
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
        }, 3000);
      });
  };

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

export const unsetUser = () => ({
  type: UNSET_USER,
});
