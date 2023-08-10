import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import sty from "./Panel.module.css";

const LandingPanel = ({ refPanel, panelUp }) => {
  return (
    <div ref={refPanel} className="landing-panel-wrapper" id="landing-panel">
      <div
        className={`go-up-panel fa-bounce ${panelUp ? "" : "hide"}`}
        onClick={() =>
          document.getElementById("landing-contact").scrollIntoView()
        }
      >
        <i className="fa-solid fa-arrow-down"></i>
      </div>
      <Link to="/home">
        <button className={sty.btnStart}>Start</button>
      </Link>
    </div>
  );
};

export default LandingPanel;
