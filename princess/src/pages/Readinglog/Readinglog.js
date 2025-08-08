import { useState, useEffect } from "react";
import styles from "./../../styles/Readinglog/Readinglog.module.css";
import Title from "../../components/Title";
import { Link } from "react-router-dom";

import { get } from "./../../api";
import config from "./../../config";

const Readinglog = () => {
  const [readingLogs, setReadingLogs] = useState([
    { bookCoverImageUrl: "/icon/add.svg" },
  ]);

  const fetchReadingLog = async () => {
    try {
      const data = await get(config.READINGLOG.GET);
      const addCard = { bookCoverImageUrl: "/icon/add.svg"};
      setReadingLogs([addCard, ...data.result]);
    } catch (error) {
      alert("정보 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchReadingLog();
  }, []);

  const products = [
    {
      imagePath: "/icon/add.svg",
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg",
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg",
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg",
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg",
    },
  ];

  return (
    <div className={styles["readinglog-container"]}>
      <Title title_text="♥ Reading Log ♥" />
      <div className={styles["readinglog-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_l.svg`}
          alt={"left_square"}
          className={styles["square-column-left"]}
        />
        <div className={styles["readinglog-contents"]}>
          <div className={styles["readinglog-booklist"]}>
            {readingLogs.map((book, index) => (
              <div key={index} className={styles["book-card"]}>
                {index === 0 ? (
                  <Link to="/modifiedpage">
                    <img
                      src={book.bookCoverImageUrl}
                      alt="Add New"
                      className={styles["book-cover"]}
                    />
                  </Link>
                ) : (
                  <Link to={`/modifiedpage?readingLogId=${book.readingLogId}`}>
                    <img
                      src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`}   //book.bookCoverImageUrl-> 이미지 설정 X의 경우로 변경
                      alt={book.title || "Book Cover"}
                      className={styles["book-cover"]}
                    />
                  </Link>
                    )}
               </div>
          ))}
        </div>
          <div className={styles["readinglog-comments"]}>
            <div className={styles["comment-bubble"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/bubble/readinglog_bubble.png`}
                alt="speech"
                className={styles["readinglog_bubble"]}
              />
              <div className={styles["bubble-text"]}>
                어서오세요 공주님,
                <br />
                오늘도 찬란한 독서 기록을 남기시겠습니까...✨
                <br />
                마음이 움직이시는 쪽으로 손을 뻗어주십시오.
              </div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/waiter_2.png`}
              alt="waiter"
              className={styles["waiter-img"]}
            />
          </div>
        </div>
        <div className={styles["right-column-wrapper"]}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
              alt="speech"
              className={styles["readinglog-icon"]}
            />
          </Link>
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_r.svg`}
            alt={"left_square"}
            className={styles["square-column-right"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Readinglog;
