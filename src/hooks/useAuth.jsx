import React from "react";

// Firebase and Firestore
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Custom initialization for Firebase and Firestore
import { auth, db } from "../firebase";

// Authentication state
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  // Here will be our authentication toolkit with all necessary tools calling Firebase
  const handleSignUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const handleSignIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const handleSignOut = () => signOut(auth);
  const handleUpdateProfile = (displayName, photoURL) =>
    updateProfile(auth.currentUser, { displayName, photoURL });
  const handleUpdateEmail = (email) => updateEmail(auth.currentUser, email);
  const handleUpdatePassword = (password) =>
    updatePassword(auth.currentUser, password);
  const handleResetPassword = (email) =>
    sendPasswordResetEmail(auth.currentUser, email);

  // Now tools for calling Firestore
  const createFirestore = async (newData) => {
    try {
      await setDoc(doc(db, "users", currentUser.uid), newData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getFirestore = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return { error: "User not found..." };
    } catch (error) {
      return { error };
    }
  };

  // We will export the toolkit
  return {
    currentUser,
    setCurrentUser,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleUpdateProfile,
    handleUpdateEmail,
    handleUpdatePassword,
    handleResetPassword,
    EmailAuthProvider,
    createFirestore,
    getFirestore,
  };
};
export default useAuth;
