import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import CONFIG from "config/config";
// import * as utils from "utils/utils";
import { setPlaying } from "store/gameSlice";

const Board = () => {
  const lastTimestampRef = useRef(0);

  const { isPlaying } = useSelector(({ gameReducer }) => gameReducer);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const handleKeypress = (event) => {
    if (event.keyCode === 32) {
      isPlaying ? dispatch(setPlaying(0)) : dispatch(setPlaying(1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      let timerId;
      const requestAnimation = (timestamp) => {
        if (timestamp - lastTimestampRef.current >= CONFIG.GAME_SPEED) {
          // gameEngine();
          setCount((prevState) => prevState + 1);
          lastTimestampRef.current = timestamp;
        }
        timerId = requestAnimationFrame(requestAnimation);
      };

      timerId = requestAnimationFrame(requestAnimation);

      return () => timerId && cancelAnimationFrame(timerId);
    }
  }, [isPlaying]);

  return <div className="App">{count}</div>;
};

export default Board;
