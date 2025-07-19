import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Window from "./components/Window";
import Home from "./pages/Home/Home";
import Mypage from "./pages/Mypage/Mypage";
import Signup from "./pages/Login/Signup";
import Signin from "./pages/Login/Signin";
import Discussion from "./pages/Discussion/Discussion";

function App() {
  return (
    <div className="App">
      <Router>
        <Window />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/discussion" element={<Discussion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
