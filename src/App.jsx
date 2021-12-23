import React from "react";

// Routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Bootstrap
import Header from "./helpers/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

import { AuthProvider, useAuth } from "./helpers/AuthContext";

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
      </AuthProvider>
    </div>
  );
};

export default App;
