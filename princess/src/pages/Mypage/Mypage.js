import React from "react";
import { Link } from "react-router-dom";

import "./../../styles/Mypage/Mypage.css";
import Title from "../../components/Title";

const Mypage = () => {
  // 북마크한 책 목록
  const bookList = [
    {
      id: 1000,
      title: "세상에서 가장 행복한 예쁜 공주 이야기",
      author: "정재은",
      genre: "만화",
    },
    {
      id: 1001,
      title: "용의자X의 헌신",
      author: "히가시노 게이고",
      genre: "소설",
    },
  ];

  return (
    <div className="mypage-container">
      <Title title_text="♥ Princess Page ♥" />
      <div className="mypage-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/img/square_column/mypage_square.svg`}
          alt={"left_square"}
          className="square-column-left"
        />
        <div className="mypage-contents">
          <div className="user-info-container">
            <img
              src={`${process.env.PUBLIC_URL}/img/profile/profile_1.png`}
              alt={"user_profile"}
              className="user-info-profile"
            />
            <div className="user-info-text-container">
              <div className="user-info-section">
                <div className="user-info-wrapper">
                  <div className="regular-text">
                    Q. 공주님, 어떻게 불러드릴까요?
                  </div>
                  <div className="user-info-big-text">이사장</div>
                </div>
                <div className="user-info-wrapper">
                  <div className="regular-text">
                    Q. 공주님, 생년월일이 어떻게 되시나요?
                  </div>
                  <div className="user-info-big-text">2003년 01월 02일</div>
                </div>
                <div className="user-info-wrapper">
                  <div className="regular-text">
                    공주님의 현재 독서 레벨은...
                  </div>
                  <div className="user-level-wrapper">
                    <div className="user-info-big-text">상인, </div>
                    <div className="regular-text">다음 레벨까지 </div>
                    <div className="user-info-big-text">3권 </div>
                    <div className="regular-text">남았습니다.</div>
                  </div>
                </div>
                <div className="user-util-section">
                  <div>v.1.0.0</div>
                  <div>이용약관</div>
                  <div className="underline">로그아웃</div>
                  <div className="underline">회원탈퇴</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bookmark-container">
            <div className="regular-text">
              공주님, 다음을 기약하신 책 목록입니다.
            </div>
            <div className="bookmark-table-wrapper">
              <table className="bookmark-table">
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
                  {bookList.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.genre}</td>
                      <td>삭제</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="square-column-right-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/img/square_column/mypage_square.svg`}
            alt={"left_square"}
            className="square-column-right"
          />
          <Link to="/home">
            <img
              src={`${process.env.PUBLIC_URL}/icon/exit.svg`}
              alt={"exit"}
              className="exit-icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
