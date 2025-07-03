import React from "react";
import "./../../styles/Home/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>공주의 서재</h1>
      <button onClick={() => navigate("/mypage")}>마이 페이지로 이동</button>
    </div>
  );
};

export default Home;
