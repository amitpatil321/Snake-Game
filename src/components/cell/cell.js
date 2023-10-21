import PropTypes from "prop-types";
import React, { memo } from "react";

import * as utils from "utils/utils";

// const Cell = ({ snake, food, Xcord, Ycord, gameOver, showGrid }) => {
const Cell = ({ snake, food, xIndex, yIndex, gameOver }) => {
  const isFoodCell = xIndex === food.x && yIndex === food.y;
  const isSnakeCell = utils.isSnakeBody(snake, { x: xIndex, y: yIndex });

  return (
    <div
      className={`cell
      ${isFoodCell ? "food" : ""}
      ${isSnakeCell ? "snake" : ""}
      ${isSnakeCell && gameOver && "dead"}`}
    />
  );
};

Cell.propTypes = {
  food: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  snake: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  xIndex: PropTypes.number,
  yIndex: PropTypes.number,
  gameOver: PropTypes.bool,
};

export default memo(Cell);
