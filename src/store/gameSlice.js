import { createSlice } from "@reduxjs/toolkit";

import CONFIG from "config/config";
import * as utils from "utils/utils";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    isPlaying: 1,
    foodCount: 0,
    snake: CONFIG.DEFAULT_SNAKE,
    food: utils.generateFood(CONFIG.DEFAULT_SNAKE),
    snakeSpeed: CONFIG.GAME_SPEED,
    direction: CONFIG.DEFAULT_DIRECTION,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
  },
});

export const { setPlaying, setDirection } = gameSlice.actions;

export default gameSlice.reducer;
