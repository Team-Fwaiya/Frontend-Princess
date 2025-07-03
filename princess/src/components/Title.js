import React from "react";
import "./../styles/Title.css";

const Title = ({ title_text }) => {
  return (
    <div className="title-container">
      <div className="title-text">{title_text}</div>
      <img
        src={`${process.env.PUBLIC_URL}/img/page_title_background.svg`}
        alt={"title_background"}
        className="title-background"
      />
    </div>
  );
};

export default Title;
