import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import CONFIG from "config/config";
import * as utils from "utils/utils";
import {
  setPlaying,
  setDirection,
  setFood,
  incScore,
  resetScore,
  restartGame,
  resetSnake,
  setSnake,
  setGameOver,
} from "store/gameSlice";

import Cell from "components/cell";

const Board = () => {
  const lastTimestampRef = useRef(0);

  const { isPlaying, score, snake, food, direction, gameOver } = useSelector(
    ({ gameReducer }) => gameReducer,
  );
  const dispatch = useDispatch();

  //   const [snake, setSnake] = useState(CONFIG.DEFAULT_SNAKE);
  //   const [food, setFood] = useState(utils.generateFood(CONFIG.DEFAULT_SNAKE));
  const [inputDir, setInputDir] = useState({ x: 0, y: 0 });

  // Fill 2 dimentional array with empty values
  const board = utils.getBoard();

  const handleKeypress = (event) => {
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
        setInputDir({ x: 1, y: 0 });
        break;
      }
      case "DOWN": {
        node = { y: tail.y + 1 };
        setInputDir({ x: 0, y: 1 });
        break;
      }
      case "LEFT": {
        node = { x: tail.x - 1 };
        setInputDir({ x: -1, y: 0 });
        break;
      }
      case "UP": {
        node = { y: tail.y - 1 };
        setInputDir({ x: 0, y: -1 });
        break;
      }
      default:
        return false;
    }
    snakeCopy.push({ ...tail, ...node });
    dispatch(setSnake(snakeCopy));
  };

  const onGameOver = () => {
    dispatch(setGameOver(true));
    dispatch(setPlaying(0));
    // pause for a second and then restart
    setTimeout(() => {
      dispatch(restartGame());
    }, 1000);
  };

  const detectCollisions = () => {
    const snakeCopy = [...snake];
    const head = snakeCopy[snakeCopy.length - 1];
    // check if snake touched food ?
    if (utils.bumpedOnFood(head, food)) {
      snakeCopy.unshift({ x: head.x + inputDir.x, y: head.y + inputDir.y });
      dispatch(setSnake([...snakeCopy]));
      dispatch(setFood());
      dispatch(incScore());
    }
    // check if snake bumbed on himself
    if (utils.bumpedOnBody(snake, head)) onGameOver();
    // check if snake touched walls ?
    if (utils.bumpedOnWall(head)) onGameOver();
  };

  const gameEngine = () => {
    if (isPlaying) {
      moveSnake();
      detectCollisions();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [isPlaying, direction]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      let timerId;
      const requestAnimation = (timestamp) => {
        if (
          timestamp - lastTimestampRef.current >=
          CONFIG.GAME_SPEED - score * CONFIG.SNAKE_SPEED_DELTA
        ) {
          gameEngine();
          lastTimestampRef.current = timestamp;
        }
        timerId = requestAnimationFrame(requestAnimation);
      };

      timerId = requestAnimationFrame(requestAnimation);

      return () => cancelAnimationFrame(timerId);
    }
  }, [snake, isPlaying, direction]);

  return (
    <div>
      {console.log(snake)}
      Score: {score} &nbsp; Speed &nbsp;: {score * CONFIG.SCORE_INCREMENT_DELTA}
      {/* <button type="button" onClick={() => gameEngine()}>
        Move
      </button>
      &nbsp; {gameOver} &nbsp;
      <button type="button" onClick={() => dispatch(restartGame())}>
        End
      </button> */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${CONFIG.BOARD_SIZE}, ${CONFIG.CELL_SIZE}px`,
        }}>
        {board?.map((row, yIndex) =>
          row?.map((cell, xIndex) => (
            <Cell
              snake={snake}
              food={food}
              xIndex={xIndex}
              yIndex={yIndex}
              gameOver={gameOver}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
