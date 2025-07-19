import React, { useState } from "react";
import { Link } from "react-router-dom";

import signupStyles from "./../../styles/Login/Signup.module.css";
import signinStyles from "./../../styles/Login/Signin.module.css";
import Title from "../../components/Title";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // api call
    console.log("정보:", userId, password);
  };

  return (
    <div className={signupStyles["signup-container"]}>
      <Title title_text="♥ Sign in Page ♥" />
      <div className={signupStyles["signup-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
          alt={"left_square"}
          className={signupStyles["square-column-left"]}
        />
        <div className={signupStyles["signup-contents"]}>
          <div
            className={`${signupStyles["left-contents"]} ${signinStyles["left-contents-signin"]}`}
          >
            <div className={signupStyles["question-container"]}>
              <div className={signupStyles["question-wrapper"]}>
                <div className={signupStyles["question-section"]}>
                  <div className={signupStyles["regular-text"]}>
                    Q. 공주님, 아이디를 입력해주세요.
                  </div>
                  <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                  />
                </div>
                <div className={signupStyles["question-section"]}>
                  <div className={signupStyles["regular-text"]}>
                    Q. 공주님, 비밀번호를 입력해주세요.
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
              </div>
            </div>
            <button
              className={`${signupStyles["submit-button"]} ${signupStyles["regular-text"]}`}
              onClick={handleSubmit}
            >
              작성 완료
            </button>
            <Link
              to="/signup"
              className={signinStyles["signin-wrapper"]}
              style={{ textDecoration: "none" }}
            >
              <div className={signinStyles["signin-text"]}>
                처음 뵙는 공주님은 이쪽입니다
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/icon/right_arrow.svg`}
                alt={"right_arrow"}
                className={signinStyles["right-arrow-icon"]}
              />
            </Link>
          </div>
          <div className={signupStyles["right-contents"]}>
            <div className={signupStyles["bubble-wrapper"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/bubble/mypage_bubble.png`}
                alt="bubble"
                className={signupStyles["bubble-image"]}
              />
              <div className={signupStyles["bubble-text"]}>
                어서오세요 공주님,
                <br />
                돌아오셔서 이 집사는 매우 기쁩니다.
                <br />
                <br />
                오늘은 특별히 얼그레이 차로
                <br /> 준비해드리겠습니다. 얼른 들어오세요.
              </div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/waiter_2.png`}
              alt="waiter"
              className={signupStyles["waiter-image"]}
            />
          </div>
        </div>
        <div className={signupStyles["square-column-right-wrapper"]}>
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
            alt={"left_square"}
            className={signupStyles["square-column-right"]}
          />
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
              alt={"exit"}
              className={signupStyles["exit-icon"]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
