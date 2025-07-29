import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Window from "./components/Window";
import Home from "./pages/Home/Home";
import Mypage from "./pages/Mypage/Mypage";
import Signup from "./pages/Login/Signup";
import Signin from "./pages/Login/Signin";
import Readinglog from "./pages/Readinglog/Readinglog";
import ModifiedPage from "./pages/Readinglog/ModifiedPage";
import Discussion from "./pages/Discussion/Discussion";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Window />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signin />} />
            <Route path="/readinglog" element={<Readinglog />} />
            <Route path="/modifiedpage" element={<ModifiedPage />} />
            <Route path="/discussion" element={<Discussion />} />
          </Routes>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
