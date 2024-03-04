import { useCallback } from "react";

import HeaderStatus from "./HeaderStatus";
import QuitActions from "./QuitActions";
import Board from "./Board";

// import useGame from "../../../state/game";
// const game = useGame((state) => state.game);

const Game = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <HeaderStatus />
      <br />
      <br />
      <br />
      <Board />
      <br />
      <br />
      <br />
      <QuitActions />
    </>
  );
};

export default Game;
