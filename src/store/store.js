import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
// import scoreReducer from "./scoreSlice";

export default configureStore({
  reducer: {
    gameReducer,
  },
});
