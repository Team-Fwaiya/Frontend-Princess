import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./../../styles/Discussion/Discussion.module.css";
import Title from "../../components/Title";

import {get, post} from "../../api";
import config from "../../config";

const Discussion = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("discussionId");

  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");

  const resolveImg = (p) => {
    if (!p) return `${process.env.PUBLIC_URL}/img/profile/profile1.png`;
    if (p.startsWith("http")) return p;
    return `${process.env.PUBLIC_URL}${p}`;
  };

  const fetchDetail = async () => {
    if (!id) return;
    try {
      const data = await get(config.DISCUSSIONS.DETAIL_GET(id));
      const result = data?.result ?? data;
      setDiscussion(result);
    } catch (e) {
      console.error("개별조회 실패:", e);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await get(config.USERS.GET);
      setUser(data.result);
    } catch (e) {
      console.error("현재 사용자 조회 실패:", e);
    }
  };

  // 댓글 불러오기

  const fetchComments = async () => {
    if (!id) return;
    try {
      const data = await get(config.DISCUSSIONS.COMMENT_GET(id));
      const list = (data.result ?? data) || [];
      const mapped = list.map((item, idx) => ({
        id: idx + 1,
        name: item.nickname,
        role: item.readingLevel,
        text: item.content,
        profileImg: item.imagePath,
      }));
      setComments(mapped);
    } catch (e) {
      console.error("댓글 조회 실패:", e);
      alert("댓글 조회에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit =  async () => {
    const content = input.trim();
    if(!content) return;
    if(!id) {
      alert("토론방 ID가 없습니다.");
      return;
    }
    if (!user) { 
      alert("사용자 정보를 불러오지 못했습니다."); 
      return; 
    }
    
    try {
      const res = await post(config.DISCUSSIONS.COMMENT_POST(id), {content});
      setComments((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: user.nickname,
          role: user.readingLevel,
          text: content,
          profileImg: user.imagePath,
        }
      ]);
      setInput(""); 
      }catch(e) {
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요");
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchComments();
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles["discussion-container"]}>
      <Title title_text="♥ Book Discussion ♥" />
      <div className={styles["discussion-wrapper"]}>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_l.svg`}
          alt={"left_square"}
          className={styles["square-column-left"]}
        />
        <div className={styles["discussion-content"]}>
          <div className={styles["discussion-book"]}
            style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/princessitem/princess_book.png)`}}
          >
            <img
              src={discussion?.bookCoverImageUrl || `${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`}
              alt="book-cover"
              className={styles["book-cover"]}
            />
            <div className={styles["princess-item"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/princessitem/crown.png`}
                alt={"princess-crown"}
                className={styles["princess-crown"]}
              />
            </div>
          </div>
          <div className={styles["comment-section"]}>
            <div className={styles["comment-scroll"]}>
              {comments.map((c) => (
                <div className={styles["comment"]} key={c.id}>
                  <div className={styles["comment-header-inline"]}>
                    <img
                      src={`${process.env.PUBLIC_URL}${
                        c.profileImg || "/img/profile/profile1.png"
                      }`}
                      alt="profile"
                      className={styles["profile-image"]}
                    />
                    <span className={styles["comment-name"]}>{c.name}</span>
                    <span className={styles["comment-dot"]}>•</span>
                    <span className={styles["comment-role"]}>{c.role}</span>
                  </div>
                  <div className={styles["comment-text"]}>{c.text}</div>
                </div>
              ))}
            </div>

            <div className={styles["comment-input"]}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="답글을 입력하세요."
              />
              <button onClick={handleSubmit}>→</button>
            </div>
          </div>
          <div className={styles["discussion-exit"]}>
            <Link to="/home">
              <img
                src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
                alt="exit"
                className={styles["dicussion-icon"]}
              />
            </Link>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_r.svg`}
          alt={"right_square"}
          className={styles["square-column-right"]}
        />
      </div>
    </div>
  );
};

export default Discussion;
