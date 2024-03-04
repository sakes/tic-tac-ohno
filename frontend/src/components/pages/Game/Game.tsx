import { useCallback } from "react";

import GameHeaderStatus from "./GameHeaderStatus";
import GameQuitActions from "./GameQuitActions";

// import useGame from "../../../state/game";
// const game = useGame((state) => state.game);

const Game = () => {
  return (
    <>
      <GameHeaderStatus />
      <GameQuitActions />
    </>
  );
};

export default Game;
