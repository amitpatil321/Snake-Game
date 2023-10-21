import { createSlice } from "@reduxjs/toolkit";

import CONFIG from "config/config";
import * as utils from "utils/utils";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    isPlaying: 0,
    score: 0,
    snake: CONFIG.DEFAULT_SNAKE,
    food: utils.generateFood(CONFIG.DEFAULT_SNAKE),
    snakeSpeed: CONFIG.GAME_SPEED,
    direction: CONFIG.DEFAULT_DIRECTION,
    gameOver: false,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setFood: (state, action) => {
      state.food = utils.generateFood(action.payload);
    },
    incScore: (state) => {
      state.score += 1;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    resetSnake: (state) => {
      state.snake = [...CONFIG.DEFAULT_SNAKE];
    },
    setSnake: (state, action) => {
      state.snake = [...action.payload];
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    restartGame: (state) => {
      state.snake = [...CONFIG.DEFAULT_SNAKE];
      state.direction = CONFIG.DEFAULT_DIRECTION;
      state.food = utils.generateFood(CONFIG.DEFAULT_SNAKE);
      state.score = 0;
      state.gameOver = false;
      state.snakeSpeed = CONFIG.GAME_SPEED;
    },
  },
});

export const {
  setPlaying,
  setDirection,
  setFood,
  incScore,
  resetScore,
  restartGame,
  resetSnake,
  setSnake,
  setGameOver,
} = gameSlice.actions;

export default gameSlice.reducer;
