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

// check if snake is bumbed to his own body
// if snake has 2 objects with same x and y values that means 2 body cells are at one location
const bumpedOnBody = (snake, head) =>
  snake.filter((each) => each.x === head.x && each.y === head.y).length >= 2;

// check if snake is bumbed on food
const bumpedOnFood = (head, food) => head.x === food.x && head.y === food.y;

// check if snake is bumbed on wall
const bumpedOnWall = (head) =>
  head.x >= CONFIG.BOARD_SIZE ||
  head.y >= CONFIG.BOARD_SIZE ||
  head.x < 0 ||
  head.y < 0;

const isHighScore = (score) => {
  score = score ? score * CONFIG.SCORE_INCREMENT_DELTA : 0;
  const highScore =
    window?.localStorage?.getItem(CONFIG.STORAGE_KEY) || undefined;
  if (!highScore) window.localStorage.setItem(CONFIG.STORAGE_KEY, score);
  else {
    if (score > highScore)
      window.localStorage.setItem(CONFIG.STORAGE_KEY, score);
  }
};

const getHighScore = () =>
  window?.localStorage?.getItem(CONFIG.STORAGE_KEY) || 0;

export {
  getBoard,
  isSnakeBody,
  generateFood,
  isValidMove,
  bumpedOnFood,
  bumpedOnBody,
  bumpedOnWall,
  isHighScore,
  getHighScore,
};
