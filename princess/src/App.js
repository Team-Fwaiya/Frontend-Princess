import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Window from "./components/Window";
import Home from "./pages/Home/Home";
import Mypage from "./pages/Mypage/Mypage";
import Signup from "./pages/Login/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Window />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
