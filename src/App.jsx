import React from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Bootstrap
import Header from "./components/Header";

// Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

const App = function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
