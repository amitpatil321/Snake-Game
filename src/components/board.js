import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import CONFIG from "config/config";
import * as utils from "utils/utils";
import { setPlaying, setDirection } from "store/gameSlice";

import Cell from "components/cell";

const Board = () => {
  const lastTimestampRef = useRef(0);

  const { isPlaying, food, direction } = useSelector(
    ({ gameReducer }) => gameReducer,
  );
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [snake, setSnake] = useState(CONFIG.DEFAULT_SNAKE);

  // Fill 2 dimentional array with empty values
  const board = utils.getBoard();

  const handleKeypress = (event) => {
    console.log(direction);
    if (isPlaying && Object.keys(CONFIG.KEYS).includes(event.key)) {
      // check if this a valid move ?
      if (utils.isValidMove(direction, CONFIG.KEYS[event.key]))
        dispatch(setDirection(CONFIG.KEYS[event.key]));
    } else {
      if (event.keyCode === 32) {
        isPlaying ? dispatch(setPlaying(0)) : dispatch(setPlaying(1));
      }
    }
  };

  const moveSnake = () => {
    let node = null;
    const tail = snake[snake.length - 1];
    const snakeCopy = [...snake];
    snakeCopy.shift();
    // TODO : This code can be shortened
    switch (direction) {
      case "RIGHT": {
        node = { x: tail.x + 1 };
        break;
      }
      case "DOWN": {
        node = { y: tail.y + 1 };
        break;
      }
      case "LEFT": {
        node = { x: tail.x - 1 };
        break;
      }
      case "UP": {
        node = { y: tail.y - 1 };
        break;
      }
      default:
        return false;
    }
    snakeCopy.push({ ...tail, ...node });
    setSnake(snakeCopy);
  };

  const gameEngine = () => {
    if (isPlaying) {
      moveSnake();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [isPlaying, direction]);

  useEffect(() => {
    if (isPlaying) {
      let timerId;
      const requestAnimation = (timestamp) => {
        if (timestamp - lastTimestampRef.current >= CONFIG.GAME_SPEED) {
          gameEngine();
          lastTimestampRef.current = timestamp;
        }
        timerId = requestAnimationFrame(requestAnimation);
      };

      timerId = requestAnimationFrame(requestAnimation);

      return () => timerId && cancelAnimationFrame(timerId);
    }
  }, [snake, isPlaying, direction]);

  return (
    <div>
      {direction}
      <button type="button" onClick={() => moveSnake()}>
        Move
      </button>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${CONFIG.BOARD_SIZE}, ${CONFIG.CELL_SIZE}px`,
        }}>
        {board?.map((row, yIndex) =>
          row?.map((cell, xIndex) => (
            <Cell snake={snake} food={food} xIndex={xIndex} yIndex={yIndex} />
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
