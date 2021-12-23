/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";

// Firebase
import {
  onAuthStateChanged,
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
import { auth, db } from "./firebase";

// Creating context for authentication toolkit
const AuthContext = React.createContext();

// Custom hook to wrap authentication context
export const AuthProvider = function AuthProvider({ children }) {
  // State for user data
  const [currentUser, setCurrentUser] = React.useState({
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
  });

  // Since Firebase handles the local storage and setting user data, we have to wait for them to be ready
  // So we create a loading state to prevent undefined errors
  const [loading, setLoading] = React.useState(true);

  // When Firebase finishes verifying the auth state, we can set our user state and turn off loading phase
  // This is done on rerender only, so we wrap it up in useEffect with empty array dependency []
  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const data = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }),
    []
  );

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
  const authToolkit = {
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

  // We wrap the children in the context if the loading phase finished and provide the children with our authentication toolkit
  return (
    <AuthContext.Provider value={authToolkit}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
