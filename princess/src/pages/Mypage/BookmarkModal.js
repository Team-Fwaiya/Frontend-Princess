import React, { useState } from "react";

import Modal from "./../../components/Modal";
import styles from "./../../styles/Mypage/BookmarkModal.module.css";

import { post } from "./../../api";
import config from "./../../config";

const BookmarkModal = ({ onClose, setRefreshTrigger }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const fetchWantBook = async () => {
    try {
      const data = await post(config.USERS.WANT, {
        bookTitle: title,
        author: author,
        genre: genre,
      });
      console.log("책 추가 성공:", data);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("책 추가 실패:", error);
      alert("책 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = () => {
    if (title.length > 0 && author.length > 0 && genre.length > 0) {
      console.log("정보:", title, author, genre);
      fetchWantBook();
      onClose();
    } else {
      alert("모든 항목을 입력해주세요");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContents}>
        <div className={styles.questionContainer}>
          <div className={styles.questionWrapper}>
            <div className={styles.regularText}>
              Q. 공주님, 책 제목이 어떻게 되나요?
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="책 제목을 입력해주세요"
            />
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.regularText}>
              Q. 공주님, 저자는 어떻게 되나요?
            </div>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="저자를 입력해주세요"
            />
          </div>
          <div className={styles.questionWrapper}>
            <div className={styles.regularText}>
              Q. 공주님, 장르는 어떻게 되나요?
            </div>
            <div className={styles.selectWrapper}>
              <select
                value={genre}
                required
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="" disabled>
                  장르를 선택해주세요
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
            </div>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </Modal>
  );
};

export default BookmarkModal;
