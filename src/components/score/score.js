import React from "react";

import { useSelector } from "react-redux";
import * as utils from "utils/utils";
import CONFIG from "config/config";

import "./score.css";

const Score = () => {
  const { score } = useSelector(({ gameReducer }) => gameReducer);
  // console.log(utils.getHighScore().then((Response) => Response));
  const highScore = utils.getHighScore();
  return (
    <div style={{ textAlign: "center" }}>
      {/* Hish Score: {utils.getHighScore()} &nbsp;Score: {score} &nbsp; Speed
      &nbsp;: {score * CONFIG.SCORE_INCREMENT_DELTA} */}
      <div className="score-container">
        <div>High Score : {highScore}</div>
        <div>Score : {score * CONFIG.SCORE_INCREMENT_DELTA}</div>
        <div>Speed : {score * CONFIG.SNAKE_SPEED_DELTA}</div>
      </div>
    </div>
  );
};

export default Score;
