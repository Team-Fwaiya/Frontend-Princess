import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./../../styles/Login/Signup.css";
import Title from "../../components/Title";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = () => {
    // 닉네임 글자수 확인
    if (nickname.length > 8) {
      alert("닉네임은 최대 8글자까지 입력할 수 있습니다.");
      return;
    }
    // api call
    console.log("정보:", userId, password, nickname, birthdate);
  };

  return (
    <div className="signup-container">
      <Title title_text="♥ Sign up Page ♥" />
      <div className="signup-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
          alt={"left_square"}
          className="square-column-left"
        />
        <div className="signup-contents">
          <div className="left-contents">
            <div className="question-container">
              <div className="question-wrapper">
                <div className="question-section">
                  <div className="regular-text">
                    Q. 공주님, 아이디는 어떻게 할까요?
                  </div>
                  <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                  ></input>
                </div>
                <div className="question-section">
                  <div className="regular-text">
                    Q. 공주님, 비밀번호는 어떻게 할까요?
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
              </div>

              <div className="question-wrapper">
                <div className="question-section">
                  <div className="regular-text">
                    Q. 공주님, 어떻게 불러드릴까요?
                  </div>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="최대 8글자로 부탁드립니다"
                  />
                </div>
                <div className="question-section">
                  <div className="regular-text">
                    Q. 공주님, 생년월일이 어떻게 되시나요?
                  </div>
                  <input
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    placeholder="예시) 2003년 01월 02일"
                  />
                </div>
              </div>
            </div>
            <button
              className="submit-button regular-text"
              onClick={handleSubmit}
            >
              작성 완료
            </button>
          </div>
          <div className="right-contents">
            <div className="bubble-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/img/bubble/mypage_bubble.png`}
                alt="bubble"
                className="bubble-image"
              />
              <div className="bubble-text">
                어서오세요 공주님, <br />
                오늘부터 공주님을 모시게 된 집사입니다.
                <br />
                <br />
                원활한 서비스를 위해 공주님에 대해
                <br />몇 가지만 알려주시면 감사하겠습니다.
              </div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/waiter_2.png`}
              alt="waiter"
              className="waiter-image"
            />
          </div>
        </div>
        <div className="square-column-right-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
            alt={"left_square"}
            className="square-column-right"
          />
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
              alt={"exit"}
              className="exit-icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
