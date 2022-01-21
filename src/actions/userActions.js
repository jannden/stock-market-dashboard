// Firebase and Firestore
import {
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

// Custom initialization for Firebase and Firestore
import { auth } from "../firebase";

import { SET_USER, UNSET_USER } from "./types";

export const updateUser = (formData, setFormData, firestore) => (dispatch) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    formData.oldPassword
  );
  reauthenticateWithCredential(auth.currentUser, credential)
    .then(() =>
      formData.email !== auth.currentUser.email
        ? updateEmail(auth.currentUser, formData.email)
        : true
    )
    .then(() =>
      formData.password1
        ? updatePassword(auth.currentUser, formData.password1)
        : true
    )
    .then(() =>
      updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      })
    )
    .then(() => {
      setFormData({
        ...formData,
        formSuccess: "Changes to your profile were saved.",
      });
      const data = {
        uid: auth.currentUser.uid,
        email: formData.email,
        displayName: formData.displayName,
        photoURL: formData.photoURL,
        firestore,
      };
      dispatch({
        type: SET_USER,
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
