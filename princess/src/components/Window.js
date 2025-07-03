import React from "react";
import "../styles/Window.css";

const Window = () => {
  return (
    <div className="window-container">
      <div className="window-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/icon/window_line.svg`}
          alt={"window"}
          className="window-icon"
        />
        <img
          src={`${process.env.PUBLIC_URL}/icon/window_square.svg`}
          alt={"window"}
          className="window-icon"
        />
        <img
          src={`${process.env.PUBLIC_URL}/icon/window_x.svg`}
          alt={"window"}
          className="window-icon"
        />
      </div>
    </div>
  );
};

export default Window;
