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
  const [bookRanking, setBookRanking] = useState([]);
  const [quotes, setQuotes] = useState({ message: "", author: "" });
  const [libraries, setLibraries] = useState([]);
  const [bookstores, setBookstores] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [userimage, setUserImage] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);


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

  const RankingBooks = async () => {
    try {
      const data = await get(config.BOOKS.RANKING.GET);
      console.log("랭킹 조회 성공:", data);
      setBookRanking(data.result);
    } catch (error) {
      console.error("랭킹 조회 실패:", error);
      alert("랭킹 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchQuotes = async () => {
    try {
      const data = await get(config.QUOTES.GET);
      console.log("명언 조회 성공:", data);
      setQuotes(data.result);
    } catch (error) {
      console.error("명언 조회 실패:", error);
      alert("명언 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchLibraries = async (location) => {
    try {
      const data = await get(config.LIBRARIES.NEARBY.GET(location));
      console.log("도서관 조회 성공:", data);
      setLibraries(data.result);
    } catch (error) {
      console.error("도서관 조회 실패:", error);
      alert("도서관 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchBookstores = async (location) => {
    try {
      const data = await get(config.BOOKSTORES.NEARBY.GET(location));
      console.log("서점 조회 성공:", data);
      setBookstores(data.result);
    } catch (error) {
      console.error("서점 조회 실패:", error);
      alert("서점 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchUserImage = async () => {
    try {
      const data = await get(config.USERS.GET);
      console.log("프로필 조회 성공:", data);
      console.log("userAddress", data.result.address);
      setUserImage(data.result);
      setUserAddress(data.result.address);
    } catch (error) {
      console.error("프로필 조회 실패:", error);
      alert("프로필 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    removeCookie("accessToken", { path: "/" });
    navigate("/");
  };

  useEffect(() => {
    fetchDiscussions();
    fetchQuotes();
    RankingBooks();
    fetchUserImage();
  }, []);

  useEffect(() => {
    if (userAddress) {
      console.log("userAddress changed:", userAddress)
      fetchLibraries(userAddress);
      fetchBookstores(userAddress);
    }
  }, [userAddress]);

  return (
    <div className={styles["home-container"]}>
      <div className={styles["title-wrapper"]}>
        <Link to="/mypage" className={styles.mypage}>
          <img
            src={userimage.imagePath}
            alt="princess"
            className={styles.mypage1}
          />
        </Link>
        <div className={styles.signup} onClick={handleLogout}>
          <img
            src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
            alt="princess"
            className={styles.signup1}
          />
        </div>
        <Title title_text="♥ Princess' Diary ♥" />
      </div>

      <div className={styles["sentence-container"]}>
        <div className={styles["sentence-wrapper"]}>
          <div className={styles.title}>오늘의 명언</div>
          <div className={styles["sentence-text-wrapper"]}>
            <div className={styles["mark-left"]}>"</div>
            <div className={styles.sentence}>
              {quotes.message}
            </div>
            <div className={styles["mark-right"]}>"</div>
            <div className={styles.source}>
              {quotes.author}
            </div>
          </div>
        </div>
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
          {bookRanking.map((product, index) => (
              <div className={styles["book-item"]} key={index}>
                <img src={product.coverImageUrl} alt={product.title} />
                <p>
                  {product.title}
                  <br />
                  {product.author}
                  <br />
                  {product.hashtags}
                </p>
              </div>
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
              className={styles["bubble-image2"]}
            />
            <div className={styles["bubble-text2"]}>
              공주님께서 찾으시는 도서관은 <br />
                {libraries.map((lib, index) => (
                  <div className={styles["libraries"]} key={index}>
                    {lib.libraryName}: {lib.address}
                  </div>
                ))}
              <br /> 공주님께서 찾으시는 서점은 <br />
                {bookstores.map((boo, index) => (
                  <div className={styles["libraries"]} key={index}>
                    {boo.poiNm}: {boo.ctprvNm} {boo.signguNm} {boo.rdnmadrNm}
                  </div>
                ))}
                  <br /> 언제든지 공주님만 불러주시면 총총총~ 뛰어가서 안내해드릴게요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
