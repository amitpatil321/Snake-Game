const config = {
  BOARD_SIZE: 20,
  CELL_SIZE: 20,
  GAME_SPEED: 200, // milliseconds
  DEFAULT_SNAKE: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  SCORE_INCREMENT_DELTA: 5,
  SNAKE_SPEED_DELTA: 10,
  DEFAULT_DIRECTION: "RIGHT",
  KEYS: {
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
  },
};

export default config;
