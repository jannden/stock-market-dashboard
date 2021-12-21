import React from "react";

// Routing
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// Bootstrap
import Header from "./components/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

import { AuthProvider, useAuth } from "./auth/AuthContext";

const RequireAuth = function RequireAuth() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/log-in" state={{ from: location }} />;
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />{" "}
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
