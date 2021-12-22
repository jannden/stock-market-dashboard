/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";

// Firebase
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

// Creating context for authentication toolkit
const AuthContext = React.createContext();

// Custom hook to wrap authentication context
export const AuthProvider = function AuthProvider({ children }) {
  // State for user data
  const [currentUser, setCurrentUser] = React.useState();

  // Since Firebase handles the local storage and setting user data, we have to wait for them to be ready
  // So we create a loading state to prevent undefined errors
  const [loading, setLoading] = React.useState(true);

  // When Firebase finishes verifying the auth state, we can set our user state and turn off loading phase
  // This is done on rerender only, so we wrap it up in useEffect with empty array dependency []

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  });

  // Here will be our authentication toolkit with all necessary tools calling Firebase
  const handleSignUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const handleSignIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const handleSignOut = () => signOut(auth);
  const handleUpdateEmail = (email) => updateEmail(auth, email);
  const handleUpdatePassword = (password) => updatePassword(auth, password);
  const handleResetPassword = (email) => sendPasswordResetEmail(auth, email);

  // We will export the toolkit with useMemo to prevent no-constructed-context-values AirBnB error

  const authToolkit = React.useMemo(
    () => ({
      currentUser,
      handleSignUp,
      handleSignIn,
      handleSignOut,
      handleUpdateEmail,
      handleUpdatePassword,
      handleResetPassword,
    }),
    [currentUser]
  );

  // We wrap the children in the context if the loading phase finished and provide the children with our authentication toolkit
  return (
    <AuthContext.Provider value={authToolkit}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
