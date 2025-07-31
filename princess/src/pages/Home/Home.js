import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styles from "./../../styles/Home/Home.module.css";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

import { get } from "./../../api";
import config from "./../../config";

const Home = () => {
  const navigate = useNavigate();

  const [bookDiscussions, setBookDiscussions] = useState([]);
  const [removeCookie] = useCookies(["accessToken"]);

  const fetchDiscussions = async () => {
    try {
      const data = await get(config.DISCUSSIONS.GET);
      console.log("정보 조회 성공:", data);
      setBookDiscussions(data.result);
    } catch (error) {
      console.error("정보 조회 실패:", error);
      alert("정보 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    // 1. 쿠키 삭제
    removeCookie("accessToken", { path: "/" });
    // 2. 로그인 화면으로 이동
    navigate("/");
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <div className={styles["home-container"]}>
      <div className={styles["title-wrapper"]}>
        <Link to="/mypage" className={styles.mypage}>
          <img
            src={`${process.env.PUBLIC_URL}/img/goto mypage.png`}
            alt="princess"
            className={styles.mypage1}
          />
        </Link>
        <div className={styles.signup} onClick={handleLogout}>
          <img
            src={`${process.env.PUBLIC_URL}/img/login.png`}
            alt="princess"
            className={styles.signup1}
          />
        </div>
        <Title title_text="♥ Princess' Library ♥" />
      </div>

      <div className={styles["sentence-container"]}>
        <div className={styles["sentence-wrapper"]}>
          <div className={styles.title}>오늘의 독서 문장</div>
          <div className={styles["sentence-text-wrapper"]}>
            <div className={styles["mark-left"]}>"</div>
            <div className={styles.sentence}>
              삶은 종종 우리가 미처 몰랐던 질문을 던지고, 우리는 시간이 지나서야
              그 의미를 깨닫는다.
            </div>
            <div className={styles["mark-right"]}>"</div>
            <div className={styles.source}>
              『단 한 번의 삶』김영하 / 에세이
            </div>
          </div>
        </div>
        <img src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`} alt="book" />
      </div>

      <div className={styles["introduction-container"]}>
        <div className={styles["introduction-title"]}>
          <div className={styles["introduction-name"]}>
            궁전에서 가장 사랑받은 책들
          </div>
          <div className={styles["introduction-right"]}>
            <img
              src={`${process.env.PUBLIC_URL}/img/square_column/right1.png`}
              alt="left_square"
              className={styles["square-column-right"]}
            />
          </div>
        </div>
        <div className={styles.introduction}>
          {bookDiscussions.map((product, index) => (
            <Link to="/discussion" className={styles.discussion}>
              <div className={styles["book-item"]} key={index}>
                <img src={product.bookCoverImageUrl} alt={product.bookTitle} />
                <p>
                  {product.bookTitle}
                  <br />
                  {product.bookAuthor}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles["introduction-container"]}>
        <div className={styles["introduction-title"]}>
          <div className={styles["introduction-name"]}>공주들의 책 수다방</div>
          <div className={styles["introduction-right"]}>
            <img
              src={`${process.env.PUBLIC_URL}/img/square_column/right1.png`}
              alt="left_square"
              className={styles["square-column-right"]}
            />
          </div>
        </div>
        <div className={styles.introduction}>
          {bookDiscussions.map((product, index) => (
            <Link
              to={`/discussion?discussionId=1`}
              className={styles.discussion}
            >
              <div className={styles["book-item"]} key={index}>
                <img src={product.bookCoverImageUrl} alt={product.bookTitle} />
                <p>
                  {product.bookTitle}
                  <br />
                  {product.bookAuthor}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles["readinglog-container"]}>
        <div className={styles["introduction-title"]}>공주님의 감상 상차림</div>
        <div className={styles["reading-contents"]}>
          <div className={styles["bubble-wrapper"]}>
            <img
              src={`${process.env.PUBLIC_URL}/img/bubble/bubble-mainpage.png`}
              alt="bubble"
              className={styles["bubble-image"]}
            />
            <div className={styles["bubble-text"]}>
              책 다 읽고 그냥 넘기시면… 집사가 울어버릴 수도 있어요… <br />
              독서록 쓰러 고고!
            </div>
          </div>
          <div className={styles["waiter-section"]}>
            <Link to="/readinglog">
              <img
                src={`${process.env.PUBLIC_URL}/img/pinkbook.png`}
                alt="book"
                className={styles.bookcover}
              />
            </Link>
            <img
              src={`${process.env.PUBLIC_URL}/img/waiter_1.png`}
              alt="waiter"
              className={styles["waiter-image"]}
            />
          </div>
        </div>
      </div>
      <div className={styles["readinglog-container"]}>
        <div className={styles["introduction-title"]}>공주님의 주변 도서관</div>
        <div className={styles["reading-contents"]}>
          <div className={styles["waiter-section"]}>
            <img
              src={`${process.env.PUBLIC_URL}/img/library.png`}
              alt="library"
              className={styles.library}
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/waiter_1_flipped.png`}
              alt="waiter"
              className={styles["waiter-image"]}
            />
          </div>
          <div className={styles["bubble-wrapper"]}>
            <img
              src={`${process.env.PUBLIC_URL}/img/bubble/bubble-mainpage_flipped.png`}
              alt="bubble"
              className={styles["bubble-image"]}
            />
            <div className={styles["bubble-text"]}>
              공주님 계신 궁전은 어디쯤일까요? <br />
              집사, 길 잃지 않게 살짝만 알려주실 수 있을까요?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
