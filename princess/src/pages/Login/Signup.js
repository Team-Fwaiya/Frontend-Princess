import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import styles from "./../../styles/Login/Signup.module.css";
import Title from "../../components/Title";

import { post } from "./../../api";
import config from "./../../config";

const Signup = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const [cookies] = useCookies(["accessToken"]);

  const fetchJoin = async () => {
    try {
      const data = await post(config.LOGIN.JOIN, {
        userId,
        password,
        nickname,
        address,
      });
      console.log("회원가입 성공:", data);
      navigate("/signin"); // 로그인 화면 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = (e) => {
    console.log("cookies:", cookies);

    // 닉네임 글자수 확인
    if (nickname.length > 8) {
      alert("닉네임은 최대 8글자까지 입력할 수 있습니다.");
      return;
    }
    // api call
    console.log("정보:", userId, password, nickname, address);
    e.preventDefault();
    fetchJoin();
  };

  return (
    <div className={styles["signup-container"]}>
      <Title title_text="♥ Sign up Page ♥" />
      <div className={styles["signup-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
          alt="left_square"
          className={styles["square-column-left"]}
        />
        <div className={styles["signup-contents"]}>
          <div className={styles["left-contents"]}>
            <div className={styles["question-container"]}>
              <div className={styles["question-wrapper"]}>
                <div className={styles["question-section"]}>
                  <div className={styles["regular-text"]}>
                    Q. 공주님, 아이디는 어떻게 할까요?
                  </div>
                  <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                  />
                </div>
                <div className={styles["question-section"]}>
                  <div className={styles["regular-text"]}>
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

              <div className={styles["question-wrapper"]}>
                <div className={styles["question-section"]}>
                  <div className={styles["regular-text"]}>
                    Q. 공주님, 어떻게 불러드릴까요?
                  </div>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="최대 8글자로 부탁드립니다"
                  />
                </div>
                <div className={styles["question-section"]}>
                  <div className={styles["regular-text"]}>
                    Q. 공주님, 왕국은 어디신가요?
                  </div>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="예시) 경기도 고양시 덕양구"
                  />
                </div>
              </div>
            </div>
            <button
              className={`${styles["submit-button"]} ${styles["regular-text"]}`}
              onClick={handleSubmit}
            >
              작성 완료
            </button>
          </div>

          <div className={styles["right-contents"]}>
            <div className={styles["bubble-wrapper"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/bubble/mypage_bubble.png`}
                alt="bubble"
                className={styles["bubble-image"]}
              />
              <div className={styles["bubble-text"]}>
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
              className={styles["waiter-image"]}
            />
          </div>
        </div>

        <div className={styles["square-column-right-wrapper"]}>
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/signup_square.svg`}
            alt="left_square"
            className={styles["square-column-right"]}
          />
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
              alt="exit"
              className={styles["exit-icon"]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
