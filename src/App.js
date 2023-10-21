import React from "react";

import Board from "components/board/board";
import Score from "components/score/score";

import "./App.css";

const App = () => (
  <div className="row">
    <div className="column left" />
    <div className="column middle">
      <Score />
      <Board />
    </div>
    <div className="column right" />
  </div>
);

export default App;
