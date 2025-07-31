import React, { useState } from "react";
import "./../../styles/Readinglog/ModifiedPage.css";
import Title from "../../components/Title";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { post } from "./../../api";
import config from "./../../config";

const ModifiedPage = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [rating, setRating] = useState(5);

  const fetchSaveReadingLog = async (bookInfo) => {
    try {
      const data = await post(config.READINGLOG.POST, {
        book: bookInfo,
        oneLineReview: "",
        content: content,
        rating: rating,
      });
      console.log("책 추가 성공:", data);
      navigate("/readinglog"); // 독서록 메인화면 이동
    } catch (error) {
      console.error("책 추가 실패:", error);
      alert("책 추가에 실패했습니다. 다시 시도해주세요.");
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
    <div className="modify-container">
      <Title title_text="♥ Reading Log ♥" />
      <div className="modify-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_l.svg`}
          alt="left_square"
          className="square-column-left"
        />

        <div className="modify-content">
          <div className="letter-section" style={letterPaperStyle}>
            <div className="self-quote">오늘은 어떤 나로 남았을까?</div>

            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="letter-edit-box"
              />
            ) : (
              <p className="book-text">{content}</p>
            )}
            {/* TODO: 오늘 날짜로 들어가도록 수정 */}
            <p className="book-date">2025년 01월 02일</p>
          </div>

          <div className="book-info-box">
            <img
              src={`${process.env.PUBLIC_URL}${coverImageUrl}`}
              alt="book-cover"
              className="book-cover"
            />
            <p className="hashtag">{hashtag}</p>
            {isEditing ? (
              <>
                <input
                  className="book-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  className="book-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                />
                <input
                  className="book-input"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Genre"
                />
                <input
                  className="book-input"
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
                  className="book-input"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  placeholder="Tags"
                />
              </>
            ) : (
              <>
                <p className="book-title">Title: {title}</p>
                <p className="book-author">Author: {author}</p>
                <p className="book-genre">Genre: {genre}</p>
                <p className="book-rating">
                  Rating: {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </p>
              </>
            )}

            <div className="button-group">
              {isEditing ? (
                <button className="book-btn" onClick={handleSaveClick}>
                  💾
                </button>
              ) : (
                <button className="book-btn" onClick={handleEditClick}>
                  ✏️
                </button>
              )}
              <button className="book-btn">📨</button>
              <button className="book-btn">🗑️</button>
            </div>
          </div>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_r.svg`}
          alt="right_square"
          className="square-column-right"
        />
      </div>
      <div className="modify-exit">
        <Link to="/readinglog">
          <img
            src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
            alt="speech"
            className="reading-icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default ModifiedPage;
