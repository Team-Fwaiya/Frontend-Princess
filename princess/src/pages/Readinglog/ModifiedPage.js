import React, { useState } from "react";
import "./../../styles/Readinglog/ModifiedPage.css";
import Title from "../../components/Title";

const ModifiedPage = () => {
  const [book, setBook] = useState({
    title: "단 한 번의 삶",
    author: "김영하",
    genre: "철학",
    rating: 4,
    tag: "#삶이테마 #후회없는선택",
    imagePath: "/img/AA1CECcz.jpeg",
    date: "2025.06.30.MON",
  });

  const initialContent = `우리는 모두 단 한 번뿐인 삶을 살고 있지만,
그 사실을 자주 잊고 살아간다는 걸 이 책이 일깨워줬다.

타인의 기대에 맞추느라 정작 스스로 원하는 삶이 무엇인지 고민해본 적이 없었다는 걸 인정하게 된다.
죽음이 가까운 사람들 옆에서야 비로소 삶이 또렷해진다는 문장에 오래 머물렀다.
이제는 누구의 시선보다도 나의 선택을 더 신중히 바라보고 싶다.
한 번뿐이라는 건, 그래서 더 자유로울 수 있다는 뜻일지도 모르겠다.`;

  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(content);
  const [tempBook, setTempBook] = useState(book);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempText(content);
    setTempBook(book);
  };

  const handleSaveClick = () => {
    setContent(tempText);
    setBook(tempBook);
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
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                className="letter-edit-box"
              />
            ) : (
              <p className="book-text">{content}</p>
            )}

            <p className="book-date">{book.date}</p>
          </div>

          <div className="book-info-box">
            <img
              src={`${process.env.PUBLIC_URL}${book.imagePath}`}
              alt="book-cover"
              className="book-cover"
            />
            <p className="book-tag">{book.tag}</p>
            {isEditing ? (
              <>
                <input
                  className="book-input"
                  value={tempBook.title}
                  onChange={(e) =>
                    setTempBook({ ...tempBook, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <input
                  className="book-input"
                  value={tempBook.author}
                  onChange={(e) =>
                    setTempBook({ ...tempBook, author: e.target.value })
                  }
                  placeholder="Author"
                />
                <input
                  className="book-input"
                  value={tempBook.genre}
                  onChange={(e) =>
                    setTempBook({ ...tempBook, genre: e.target.value })
                  }
                  placeholder="Genre"
                />
                <input
                  className="book-input"
                  value={tempBook.rating}
                  type="number"
                  min="0"
                  max="5"
                  onChange={(e) =>
                    setTempBook({
                      ...tempBook,
                      rating: Math.min(5, Math.max(0, Number(e.target.value))),
                    })
                  }
                  placeholder="Rating"
                />
              </>
            ) : (
              <>
                <p className="book-title">Title: {book.title}</p>
                <p className="book-author">Author: {book.author}</p>
                <p className="book-genre">Genre: {book.genre}</p>
                <p className="book-rating">
                  Rating: {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
                </p>
              </>
            )}

            <div className="button-group">
              {isEditing ? (
                <button className="book-btn" onClick={handleSaveClick}>
                  저장
                </button>
              ) : (
                <button className="book-btn" onClick={handleEditClick}>
                  수정
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
    </div>
  );
};

export default ModifiedPage;
