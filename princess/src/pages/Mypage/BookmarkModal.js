import React from "react";

import Modal from "./../../components/Modal";
import styles from "./../../styles/Mypage/BookmarkModal.module.css";

const BookmarkModal = ({ onClose }) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [genre, setGenre] = React.useState("");

  const handleSubmit = () => {
    if (title.length > 0 && author.length > 0 && genre.length > 0) {
      console.log("정보:", title, author, genre);
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
                <option value="장르 1">자기계발</option>
                <option value="장르 2">소설</option>
                <option value="장르 3">경제</option>
                <option value="장르 4">인문학</option>
                <option value="장르 5">에세이</option>
                <option value="장르 6">만화</option>
                <option value="장르 7">종교</option>
                <option value="장르 8">과학</option>
                <option value="장르 9">사회</option>
                <option value="장르 10">시</option>
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
