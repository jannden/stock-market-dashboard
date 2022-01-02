import React from "react";
import { Provider } from "react-redux";

// Routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Bootstrap
import Header from "./components/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

import AuthProvider from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";
import store from "./store";

const RequireAuth = function RequireAuth() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/log-in" />;
  }
  return <Outlet />;
};

const RequireNotAuth = function RequireNotAuth() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/profile" />;
  }
  return <Outlet />;
};

const App = function App() {
  return (
    <div>
      <AuthProvider>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RequireNotAuth />}>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/log-in" element={<LogIn />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Provider>
      </AuthProvider>
    </div>
  );
};

export default App;
