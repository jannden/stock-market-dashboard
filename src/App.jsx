import React from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Bootstrap
import Header from "./components/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const App = function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default App;
