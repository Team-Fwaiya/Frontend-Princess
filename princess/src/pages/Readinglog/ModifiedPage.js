import { useRef, useState, useEffect } from "react";
import styles from "./../../styles/Readinglog/ModifiedPage.module.css";
import Title from "../../components/Title";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  get,
  del,
  uploadImageWithJson,
  uploadImageWithJson2,
} from "./../../api";
import config from "./../../config";
import { callGeminiApi } from "./../../gemini";

const ModifiedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const readingLogId = searchParams.get("readingLogId");

  /* 신규 진입 -> 바로 편집 모드 */
  const [isEditing, setIsEditing] = useState(!readingLogId);

  const [displayDate, setDisplayDate] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [rating, setRating] = useState(5);

  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  /* 이미지 업로드/상태 */
  const fileInputRef = useRef(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const PLACEHOLDER = `${process.env.PUBLIC_URL}/icon/upload.svg`;

  /* 파일 선택창 */
  const handleCoverClick = () => fileInputRef.current?.click();

  /* 책 사진 업로드 */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // 책 사진 미리보기
    const reader = new FileReader();
    reader.onloadend = () => setCoverImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!readingLogId) {
      setDisplayDate(formatKDate(new Date()));
      return;
    }
    (async () => {
      try {
        const data = await get(config.READINGLOG.DETAIL_GET(readingLogId));
        const r = data.result;
        setTitle(r.bookTitle || "");
        setAuthor(r.bookAuthor || "");
        setGenre(r.bookGenre || "");
        setHashtag(r.bookHashtags || "");
        setCoverImageUrl(r.bookCoverImageUrl || "");

        /* 미리보기 초기화 */
        setContent(r.content || "");
        setRating(Number(r.rating ?? 5));
        setIsEditing(false);

        const raw = r.updatedAt || r.createdAt || r.date;
        setDisplayDate(formatKDate(raw ? new Date(raw) : new Date()));
      } catch (e) {
        console.error(e);
        alert("기록 불러오기 실패");
      }
    })();
  }, [readingLogId]);

  /* 날짜 */
  const formatKDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}년 ${m}월 ${d}일`;
  };

  /* 저장(등록/수정)*/
  const fetchSaveReadingLog = async (selectedFile, bookInfo, safeRating) => {
    try {
      if (readingLogId) {
        // PUT(기록 수정)
        await uploadImageWithJson2(
          config.READINGLOG.PUT(readingLogId),
          selectedFile,
          {
            book: bookInfo,
            content: content,
            rating: safeRating,
          }
        );
        alert("수정이 완료되었습니다.");
        return true;
      } else {
        // POST(기록 등록)
        const data = await uploadImageWithJson(
          config.READINGLOG.POST,
          selectedFile,
          {
            book: bookInfo,
            content: content,
            rating: safeRating,
          }
        );

        const createdId = data.result?.readingLogId;
        if (createdId) {
          navigate(`/modifiedpage?readingLogId=${createdId}`);
        } else {
          alert("등록이 완료되었습니다.");
          navigate("/readinglog");
        }
        return true;
      }
    } catch (error) {
      console.error(error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  /* 편집 → 저장 */
  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    const safeRating = Math.max(
      0,
      Math.min(5, Math.round(Number(rating) || 0))
    );

    const bookInfo = {
      title,
      author,
      genre,
      hashtags: hashtag,
    };

    const ok = await fetchSaveReadingLog(selectedFile, bookInfo, safeRating);
    if (ok) setIsEditing(false); // 성공했을 때만 보기 모드로
  };

  /* DELETE(삭제) */
  const handleDeleteClick = async () => {
    if (!readingLogId) {
      alert("삭제할 기록 ID가 없습니다.");
      return;
    }
    try {
      if (!window.confirm("정말 삭제할까요?")) return;
      await del(config.READINGLOG.DELETE(readingLogId));
      alert("기록이 삭제되었습니다.");
      navigate("/readinglog");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleAiAnalysis = async () => {
    // 분석할 독서록 내용이 없으면 실행하지 않음
    if (!content) {
      alert("분석할 독서록 내용이 없습니다.");
      return;
    }

    setIsAiLoading(true); // 로딩 시작
    setAiResponse("");    // 이전 답변 초기화

    // AI에게 보낼 프롬프트 (제목, 저자, 내용을 모두 활용)
    const prompt = `
      '${title}' (${author} 저)라는 책에 대한 나의 독서록이야.
      아래 독서록 내용을 바탕으로 따뜻하게 공감하는 메시지를 작성하고,
      이와 비슷한 분위기나 주제를 다루는 다른 책을 3권 추천해 줘.
      총 5줄로 줄여서 잘 정리해서 답변해줘. 추천도서는 저자까지 알려줘.
      말투는 공주님을 모시는 집사 말투로 부탁해.

      ---
      ${content}
      ---
    `;

    const result = await callGeminiApi(prompt);
    
    setAiResponse(result.trim());   // AI 답변을 상태에 저장
    setIsAiLoading(false); // 로딩 종료
  };

  /* 편지지 */
  const letterPaperStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/pink_letter_paper.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
              <div className={styles["letter-quote"]}>
                오늘은 어떤 나로 남았을까?
              </div>

              {isEditing ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles["letter-edit-box"]}
                  placeholder="오늘의 생각을 적어보세요..."
                />
              ) : (
                <div className={styles["letter-text"]}>{content}</div>
              )}
              <div className={styles["letter-date"]}>{displayDate}</div>
            </div>
            <div className={styles["comments"]}>
              {!isEditing && ( // 편집 모드가 아닐 때만 AI 섹션을 보여줍니다.
                <>
                  {!aiResponse && (
                    <button 
                      onClick={handleAiAnalysis} 
                      disabled={isAiLoading}
                      className={styles["ai-button"]}
                    >
                      {isAiLoading ? '집사 달려가는 중...' : '🤵 집사를 부르시겠습니까?'}
                    </button>
                  )}

                  {isAiLoading && <p>집사가 독서록을 읽고 있어요...</p>}

                  {aiResponse && (
                    <div className={styles["ai-response-box"]}>
                      <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br />') }} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles["modify-content-right"]}>
            <div className={styles["book-info"]}>
              <div className={styles["book-cover-wrapper"]}>
                <img
                  src={coverImageUrl || PLACEHOLDER}
                  alt="book-cover"
                  className={styles["book-cover"]}
                  onClick={isEditing ? handleCoverClick : undefined}
                  style={{ cursor: isEditing ? "pointer" : "default" }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                  title={isEditing ? "클릭하여 표지 선택" : undefined}
                />
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              )}

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
                      setRating(
                        Math.max(
                          0,
                          Math.min(5, Math.round(Number(e.target.value) || 0))
                        )
                      )
                    }
                    placeholder="Rating (0~5)"
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
                    Rating:{" "}
                    {"★".repeat(Math.max(0, Math.min(5, Number(rating))))}
                    {"☆".repeat(
                      Math.max(0, 5 - Math.max(0, Math.min(5, Number(rating))))
                    )}
                  </p>
                </>
              )}

              {/*필요 시 버튼 수정*/}
              <div className={styles["button-group"]}>
                {isEditing ? (
                  <button
                    className={styles["book-btn"]}
                    onClick={handleSaveClick}
                    title="저장"
                  >
                    💾
                  </button>
                ) : (
                  <button
                    className={styles["book-btn"]}
                    onClick={handleEditClick}
                    title="편집"
                  >
                    ✏️
                  </button>
                )}
                <button className={styles["book-btn"]} title="공유(준비중)">
                  📨
                </button>
                <button
                  className={styles["book-btn"]}
                  onClick={handleDeleteClick}
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className={styles["modify-exit"]}>
              <Link to="/readinglog" title="목록으로">
                <img
                  src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
                  alt="exit"
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
