import React, { useState, useEffect } from "react";
import styles from "./../../styles/Readinglog/ModifiedPage.module.css";
import Title from "../../components/Title";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { get, post, put, del } from "./../../api";
import config from "./../../config";

const ModifiedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams =new URLSearchParams(location.search);
  const readingLogId = searchParams.get("readingLogId");

  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(()=> {
    const fetchReadingLogDetail = async () => {
      try{
        const data = await get(config.READINGLOG.DETAIL_GET(readingLogId));
        const result = data.result;

        setTitle(result.bookTitle);
        setAuthor(result.bookAuthor);
        setGenre(result.bookGenre);
        setHashtag(result.bookHashtags);
        setCoverImageUrl(result.bookCoverImageUrl);
        setContent(result.content);
        setRating(result.rating);
      } catch (error){
        alert("기록 불러오기 실패");
        }
    };

      fetchReadingLogDetail();
  }, [readingLogId]);

  const fetchSaveReadingLog = async (bookInfo) => {
    try {
      if (readingLogId) {
      /*PUT(기록 수정)*/
      const data = await put(config.READINGLOG.PUT(readingLogId), {
        book: bookInfo,
        content: content,
        rating: rating,
      });
      alert("수정이 완료되었습니다.");
    } else {
      /*POST(기록 등록)*/
      const data = await post(config.READINGLOG.POST, {
        book: bookInfo,
        oneLineReview: "",
        content: content,
        rating: rating,
      });
      const createdId = data.result?.readingLogId;
      if (createdId) {
        navigate(`/modifiedpage?readingLogId=${createdId}`);
      } else {
        alert("등록이 완료되었습니다.");
      }
    }
  } catch (error) {
    alert("저장에 실패했습니다. 다시 시도해주세요.");
  }
};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const bookInfo = {
      title,
      author,
      genre,
      hashtags: hashtag,
      coverImageUrl,
    };
    fetchSaveReadingLog(bookInfo);
    setIsEditing(false);
  };
  
  /*DELETE(기록 삭제)*/
  const handleDeleteClick = async () => {
    if(!readingLogId){
      alert("삭제할 기록 ID가 없습니다.");
      return;
    }
    try{
      await del(config.READINGLOG.DELETE(readingLogId));
      alert("기록이 삭제되었습니다.");
      navigate("/readinglog");
    } catch (error) {
      alert("삭제에 실패했습니다.")
    }
  };

  const letterPaperStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/pink_letter_paper.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "20px",
    padding: "30px",
    fontFamily: '"Nanum Myeongjo", serif',
    minHeight: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "inset 0 0 10px rgba(255, 192, 203, 0.3)",
  };

  return (
    <div className={styles["modify-container"]}>
      <Title title_text="♥ Reading Log ♥" />
      <div className={styles["modify-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_l.svg`}
          alt="left_square"
          className={styles["square-column-left"]}
        />

        <div className={styles["modify-contents"]}>
          <div className={styles["modify-content-left"]}>
            <div className={styles["letter-section"]} style={letterPaperStyle}>
              <div className={styles["letter-quote"]}>오늘은 어떤 나로 남았을까?</div>

              {isEditing ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles["letter-edit-box"]}
                />
              ) : (
                <p className={styles["letter-text"]}>{content}</p>
              )}
              {/* TODO: 오늘 날짜로 들어가도록 수정 */}
              <p className={styles["letter-date"]}>2025년 01월 02일</p>
            </div>
            <div className={styles["comments"]}>코멘트 박스</div>
          </div>
          <div className={styles["modify-content-right"]}>
            <div className={styles["book-info"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`} //src={`${process.env.PUBLIC_URL}${coverImageUrl}`} 변경
                alt="book-cover"
                className={styles["book-cover"]}
              />
              <p className={styles["book-hashtag"]}>{hashtag}</p>
              {isEditing ? (
                <>
                  <input
                    className={styles["book-input"]}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    className={styles["book-input"]}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                  />
                  <select
                    value={genre}
                    required
                    onChange={(e) => setGenre(e.target.value)}
                    className={styles["book-input"]}
                  >
                    <option value="" disabled>
                      Genre
                    </option>
                    <option value="improvement">자기계발</option>
                    <option value="fiction">소설</option>
                    <option value="economics">경제</option>
                    <option value="humanities">인문학</option>
                    <option value="essay">에세이</option>
                    <option value="comics">만화</option>
                    <option value="religion">종교</option>
                    <option value="science">과학</option>
                    <option value="society">사회</option>
                    <option value="poetry">시</option>
                  </select>
                  <input
                    className={styles["book-input"]}
                    value={rating}
                    type="number"
                    min="0"
                    max="5"
                    onChange={(e) =>
                      setRating(Math.min(5, Math.max(0, Number(e.target.value))))
                    }
                    placeholder="Rating"
                  />
                  <input
                    className={styles["book-input"]}
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                    placeholder="Tags"
                  />
                </>
              ) : (
                <>
                  <p className={styles["book-title"]}>Title: {title}</p>
                  <p className={styles["book-author"]}>Author: {author}</p>
                  <p className={styles["book-genre"]}>Genre: {genre}</p>
                  <p className={styles["book-rating"]}>
                    Rating: {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </p>
                </>
              )}

              <div className={styles["button-group"]}>
                {isEditing ? (
                  <button className={styles["book-btn"]} onClick={handleSaveClick}>
                    💾
                  </button>
                ) : (
                  <button className={styles["book-btn"]} onClick={handleEditClick}>
                    ✏️
                  </button>
                )}
                <button className={styles["book-btn"]}>📨</button>
                <button className={styles["book-btn"]} onClick={handleDeleteClick}>🗑️</button>
              </div>
            </div>
            <div className={styles["modify-exit"]}>
              <Link to="/readinglog">
                <img
                  src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
                  alt="speech"
                  className={styles["modify-icon"]}
                />
              </Link>
            </div>
          </div> 
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_r.svg`}
          alt="right_square"
          className={styles["square-column-right"]}
        />
      </div> 
    </div>
  );
};

export default ModifiedPage;
