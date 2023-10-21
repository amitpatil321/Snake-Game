import CONFIG from "config/config";

// generate 2 domentional array of given size
const getBoard = () =>
  new Array(CONFIG.BOARD_SIZE)
    .fill(0)
    .map((each) => new Array(CONFIG.BOARD_SIZE).fill(0));

// Place food at random places
const generateFood = (snake) => {
  const food = {
    x: Math.floor(Math.random() * CONFIG.BOARD_SIZE),
    y: Math.floor(Math.random() * CONFIG.BOARD_SIZE),
  };
  if (isSnakeBody(snake, food)) generateFood(snake);
  return food;
};

// Check if given object is part of snake body/cordinates
const isSnakeBody = (snake, cordinates) =>
  snake?.some((each) => cordinates.x === each.x && cordinates.y === each.y);

// check if its a valid move?
const isValidMove = (currentDirection, key) => {
  const oppositeDirections = {
    LEFT: CONFIG.KEYS.ArrowRight,
    RIGHT: CONFIG.KEYS.ArrowLeft,
    UP: CONFIG.KEYS.ArrowDown,
    DOWN: CONFIG.KEYS.ArrowUp,
  };

  return oppositeDirections[currentDirection] !== key;
};

export { getBoard, isSnakeBody, generateFood, isValidMove };
