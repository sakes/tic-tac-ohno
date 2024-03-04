import { useCallback } from "react";

import HeaderStatus from "./HeaderStatus";
import QuitActions from "./QuitActions";

// import useGame from "../../../state/game";
// const game = useGame((state) => state.game);

const Game = () => {
  return (
    <>
      <HeaderStatus />
      <QuitActions />
    </>
  );
};

export default Game;
