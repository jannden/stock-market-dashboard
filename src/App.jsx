import React from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Bootstrap
import Header from "./components/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

// Custom hooks

const App = function App() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = React.useState(getToken());
  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/log-in"
          element={<LogIn token={token} setToken={saveToken} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
