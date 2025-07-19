import React, { useState } from "react";
import "./../../styles/Discussion/Discussion.css";
import Title from "../../components/Title";
import { Link } from "react-router-dom";

const Discussion = () =>{
    const [comments, setComments]=useState([
        {
        id: 1,
        name: '고민은없지만깊음',
        role: '공주',
        text: '저는 별을 쏟아내듯 딱 반짝여야 한다고 생각해요. 어차피 한 번뿐이라면, 평범하게 사는 것보다 별을 뿜고 꿈을 향해 달려보고 싶어요.',
        profileImg: '/img/profile/profile1.png',
        },
        {
        id: 2,
        name: '큐티폭정',
        role: '하인',
        text: '전 선택 안 해요. 그냥 제가 가는 쪽이 정답이 돼요. 삶이 한 번뿐이면, 남 시선 보고 있을 시간 없잖아요? 누가 뭐래도 곧 내 인생은 내가 재밌게 써야죠. 나 말고 누가 써줘요, 그쵸? ^_^',
        profileImg: '/img/profile/profile2.png',
        },
    ]);
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        if (input.trim() === '') return;
        const newComment = {
        id: comments.length + 1,
        name: 'user',
        role: '하인',
        text: input.trim(),
        profileImg: '/img/profile/profile1.png',
        };
        setComments([...comments, newComment]);
        setInput('');
    };


    return (
    <div className="discussion-container">
      <Title title_text="♥ Book Discussion ♥" />
      <div className="discussion-wrapper">
        <img
            src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_l.svg`}
            alt={"left_square"}
            className="square-column-left"
        />
        <div className="discussion-content">
            <img
            src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`}
            alt={"book-cover"}
            className="book-cover"
            />
            <div className="comment-section">
                <div className="comment-scroll">
                    {comments.map((c) => (
                    <div className="comment" key={c.id}>
                        <div className="comment-header-inline">
                        <img
                            src={`${process.env.PUBLIC_URL}${c.profileImg || '/img/profile/profile1.png'}`}
                            alt="profile"
                            className="profile-image"
                        />
                        <span className="comment-name">{c.name}</span>
                        <span className="comment-dot">•</span>
                        <span className="comment-role">{c.role}</span>
                        </div>
                        <div className="comment-text">{c.text}</div>
                    </div>
                    ))}
                </div>

                <div className="comment-input">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="답글을 입력하세요."
                    />
                    <button onClick={handleSubmit}>→</button>
                </div>
            </div>
        </div>
        <img
            src={`${process.env.PUBLIC_URL}/img/square_column/readinglog_square_r.svg`}
            alt={"right_square"}
            className="square-column-right"
        />
      </div>
      <div className="princess-book">
        <img
            src={`${process.env.PUBLIC_URL}/img/princessitem/princess_book.png`}
            alt={"princess-book"}
            className="princess-book"
        />
      </div>
      <div className="princess-item">
        <img
            src={`${process.env.PUBLIC_URL}/img/princessitem/crown.png`}
            alt={"princess-crown"}
            className="princess-crown"
        />
      </div>
      <div className="discussion-exit">
        <Link to="/">
            <img
            src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
            alt="exit"
            className="dicussion-icon"
            />
        </Link>
      </div>

      
    </div>
  );
};

export default Discussion;