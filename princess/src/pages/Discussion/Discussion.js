import { useEffect, useState } from "react";
import styles from "./../../styles/Discussion/Discussion.module.css";
import Title from "../../components/Title";
import { Link, useLocation } from "react-router-dom";
import {get} from "../../api";
import config from "../../config";

const Discussion = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("discussionId");

  const [discussion, setDiscussion] = useState(null);

  useEffect(() => {
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
    fetchDetail();
  }, [id]);

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "고민은없지만깊음",
      role: "공주",
      text: "저는 별을 쏟아내듯 딱 반짝여야 한다고 생각해요. 어차피 한 번뿐이라면, 평범하게 사는 것보다 별을 뿜고 꿈을 향해 달려보고 싶어요.",
      profileImg: "/img/profile/profile1.png",
    },
    {
      id: 2,
      name: "큐티폭정",
      role: "하인",
      text: "전 선택 안 해요. 그냥 제가 가는 쪽이 정답이 돼요. 삶이 한 번뿐이면, 남 시선 보고 있을 시간 없잖아요? 누가 뭐래도 곧 내 인생은 내가 재밌게 써야죠. 나 말고 누가 써줘요, 그쵸? ^_^",
      profileImg: "/img/profile/profile2.png",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    const newComment = {
      id: comments.length + 1,
      name: "user",
      role: "하인",
      text: input.trim(),
      profileImg: "/img/profile/profile1.png",
    };
    setComments([...comments, newComment]);
    setInput("");
  };

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

