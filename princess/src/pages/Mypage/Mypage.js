import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./../../styles/Mypage/Mypage.module.css";
import Title from "../../components/Title";
import BookmarkModal from "./BookmarkModal";

import { get, patch, del } from "./../../api";
import config from "./../../config";

const Mypage = () => {
  const navigate = useNavigate();

  // 책 추가 시 refersh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 북마크 INSERT 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사용자 정보 관리
  const [nickname, setNickname] = useState("정보없음");
  const [address, setAddress] = useState("정보없음");
  const [readingLevel, setReadingLevel] = useState("정보없음");
  const [untilNextLevel, setUntilNextLevel] = useState("정보없음");
  const [wantBookList, setWantBookList] = useState([]);

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(
    `${process.env.PUBLIC_URL}/img/profile/profile_1.png`
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택, 이미지 미리보기 설정
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
    handleProfileUpload(file);
  };

  // 사용자 프로필 업로드 api
  const handleProfileUpload = async (file) => {
    try {
      const data = await patch(config.USERS.IMAGE, file); // 실제 엔드포인트로 수정
      console.log("프로필 업로드 성공:", data);
    } catch (err) {
      console.error("프로필 업로드 실패:", err);
      alert("프로필 업로드에 실패했습니다.");
    }
  };

  // 사용자 정보 조회 api
  const fetchInfo = async () => {
    try {
      const data = await get(config.USERS.GET);
      console.log("정보 조회 성공:", data);

      setNickname(data.result.nickname);
      setAddress(data.result.address);
      setReadingLevel(data.result.readingLevel);
      setUntilNextLevel(data.result.untilNextLevel);
      setImageSrc(data.result.imagePath);
      setWantBookList(data.result.wantToReads);
    } catch (error) {
      console.error("정보 조회 실패:", error);
      alert("정보 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 회원탈퇴 api
  const fetchWithdraw = async () => {
    try {
      const data = await del(config.LOGIN.WITHDRAW);
      console.log("회원 탈퇴 성공:", data);
      navigate("/"); // 로그인 화면 이동
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [refreshTrigger]);

  const genreMap = {
    improvement: "자기계발",
    fiction: "소설",
    economics: "경제",
    humanities: "인문학",
    essay: "에세이",
    comics: "만화",
    religion: "종교",
    science: "과학",
    society: "사회",
    poetry: "시",
  };

  const getKoreanGenre = (englishGenre) => {
    return genreMap[englishGenre] || "알 수 없음";
  };

  return (
    <div className={styles["mypage-container"]}>
      <Title title_text="♥ Princess Page ♥" />
      <div className={styles["mypage-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/mypage_square.svg`}
          alt="left_square"
          className={styles["square-column-left"]}
        />
        <div className={styles["mypage-contents"]}>
          <div className={styles["user-info-container"]}>
            <div>
              <img
                src={imageSrc}
                alt="user_profile"
                className={styles["user-info-profile"]}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className={styles["user-info-text-container"]}>
              <div className={styles["user-info-section"]}>
                <div className={styles["user-info-wrapper"]}>
                  <div className={styles["regular-text"]}>
                    Q. 공주님, 어떻게 불러드릴까요?
                  </div>
                  <div className={styles["user-info-big-text"]}>{nickname}</div>
                </div>
                <div className={styles["user-info-wrapper"]}>
                  <div className={styles["regular-text"]}>
                    공주님이 현재 살고 계신 왕국은...
                  </div>
                  <div className={styles["user-info-big-text"]}>{address}</div>
                </div>
                <div className={styles["user-info-wrapper"]}>
                  <div className={styles["regular-text"]}>
                    공주님의 현재 독서 레벨은...
                  </div>
                  <div className={styles["user-level-wrapper"]}>
                    <div className={styles["user-info-big-text"]}>
                      {readingLevel}
                    </div>
                    <div className={styles["regular-text"]}>다음 레벨까지 </div>
                    <div className={styles["user-info-big-text"]}>
                      {untilNextLevel}권{" "}
                    </div>
                    <div className={styles["regular-text"]}>남았습니다.</div>
                  </div>
                </div>
                <div className={styles["user-util-section"]}>
                  <div>v.1.0.0</div>
                  <div>이용약관</div>
                  <div className={styles.underline} onClick={fetchWithdraw}>
                    회원탈퇴
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["bookmark-container"]}>
            <div className={styles["bookmark-title-wrapper"]}>
              <div className={styles["regular-text"]}>
                공주님, 다음을 기약하신 책 목록입니다.
              </div>
              <div
                className={styles["bookmark-text-wrapper"]}
                onClick={openModal}
              >
                <div className={styles["regular-text"]}>책 추가하기</div>
                <img
                  src={`${process.env.PUBLIC_URL}/icon/pencil.svg`}
                  alt="pencil"
                  className={styles["pencil-icon"]}
                />
              </div>
            </div>
            {isModalOpen && (
              <BookmarkModal
                onClose={closeModal}
                setRefreshTrigger={setRefreshTrigger}
              />
            )}
            <div className={styles["bookmark-table-wrapper"]}>
              <table className={styles["bookmark-table"]}>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>제목</th>
                    <th>저자</th>
                    <th>장르</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {wantBookList.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>
                      <td>{book.bookTitle}</td>
                      <td>{book.author}</td>
                      <td>{getKoreanGenre(book.genre)}</td>
                      <td>삭제</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles["square-column-right-wrapper"]}>
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/mypage_square.svg`}
            alt="left_square"
            className={styles["square-column-right"]}
          />
          <Link to="/home">
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

export default Mypage;
