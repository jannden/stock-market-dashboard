/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";

// Firebase and Firestore
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Initial user state is null, assuming user is not logged in until Firebase verifies
const initialUserState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

// Initial loading state will be true, Since Firebase handles the local storage and setting user data and we have to wait for them to be ready
const initialLoadingState = true;

// Creating context for authentication toolkit
export const AuthContext = React.createContext();

// Context wrapping
const AuthProvider = function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(initialUserState);
  const [loading, setLoading] = React.useState(initialLoadingState);

  // When Firebase finishes verifying the auth state, we can set our user state and turn off loading phase
  // Having loading phase here in AuthProvider prevents the App to blink at the initial paint
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

  // We wrap the children in the context if the loading phase finished and provide the children with the states
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
