import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./../../styles/Home/Home.css";
import Title from "../../components/Title";


const Home = () => {
  const products=[
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    },
    {
      title: "『단 한 번의 삶』",
      author: "김영하",
      tag: "#삶에 대하여 #나답게살기",
      imagePath: "/img/AA1CECcz.jpeg"
    }
  ];
  const location = useLocation(); // 현재 경로 얻기
  const currentPage = location.pathname;

  return (
    <div>
      <div className="title-wrapper">
        <Link to='/mypage' className="mypage">
          <img
          src={`${process.env.PUBLIC_URL}/img/goto mypage.png`}
          alt="princess"
          className="mypage1"
          />
        </Link>
        <Link to='/signup' className="signup">
          <img
          src={`${process.env.PUBLIC_URL}/img/login.png`}
          alt="princess"
          className="signup1"
          />
        </Link>
        <Title title_text="♥ Princess' Library ♥" />
      </div>
      <div className='sentence-container'>
        <div className="title">오늘의 독서 문장</div>
        <div className="container">
          <div className="text">
            <div className="mark-left">"</div>
            <div className="sentence">삶은 종종 우리가 미처 몰랐던 질문을 던지고, 우리는 시간이 지나서야 그 의미를 깨닫는다.</div>
            <div className="mark-right">"</div>
            <div className="introduction">『단 한 번의 삶』김영하 / 에세이</div>
          </div>
          <div className="bookcover">
            <img
            src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`}
            alt={"book"}
          />
          </div>
        </div>
      </div>
      <div className="introduction-container">
        <div className="introduction-title">
          <div className="introduction-name">
            궁전에서 가장 사랑받은 책들
          </div>
          <div className="introduction-right">
            <img
            src={`${process.env.PUBLIC_URL}/img/square_column/right1.png`}
            alt={"left_square"}
            className="square-column-right"
            />
          </div>
        </div>
        <div className="introduction">
          {products.map((product, index) => (
            <div className="book-item" key={index}>
              <img src={product.imagePath} alt={product.title} />
              <p>{product.title}<br />{product.author}</p>
              <p className="tag">{product.tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="introduction-container">
        <div className="introduction-title">
          <div className="introduction-name">
            공주들의 책 수다방
          </div>
          <div className="introduction-right">
            <img
            src={`${process.env.PUBLIC_URL}/img/square_column/right1.png`}
            alt={"left_square"}
            className="square-column-right"
            />
          </div>
        </div>
        <div className="introduction">
          {products.map((product, index) => (
            <div className="book-item" key={index}>
              <img src={product.imagePath} alt={product.title} />
              <p>{product.title}<br />{product.author}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="readinglog-container">
        <div className="introduction-title">공주님의 감상 상차림</div>
        <div className="bubble-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/img/bubble/bubble-mainpage.png`}
                alt="bubble"
                className="bubble-image"
              />
              <div className="bubble-text">
                책 다 읽고 그냥 넘기시면… 집사가 울어버릴 수도 있어요… <br />
                독서록 쓰러 고고!
              </div>
        </div>
        <img
              src={`${process.env.PUBLIC_URL}/img/AA1CECcz.jpeg`}
              alt="book"
              className="bookcover"
        />
        <img
              src={`${process.env.PUBLIC_URL}/img/waiter_1.png`}
              alt="waiter"
              className="waiter-image"
        />
      </div>
    </div>
  );
};

export default Home;
