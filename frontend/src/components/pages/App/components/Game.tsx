import { useCallback } from "react";

import useGame from "../../../../state/game";
import SOCKET from "../../../../socket/socket";

const Game = () => {
  const game = useGame((state) => state.game);
  const handleForfit = useCallback((e) => {
    e.preventDefault();
    SOCKET.forfitGame();
  }, []);
  return (
    <>
      <div>Game {game?.id}</div>
      <td className="whitespace-nowrap text-sm font-medium">
        <button
          type="button"
          onClick={handleForfit}
          className="
            inline-flex 
            items-center 
            gap-x-2 
            text-sm 
            font-semibold 
            rounded-lg 
            border 
            border-transparent 
            text-orange-600 
            hover:text-orange-800 
            hover:border-orange-700
            disabled:opacity-50 
            disabled:pointer-events-none 
            dark:text-orange-500 
            dark:hover:text-orange-400 
            dark:hover:border-orange-300
            dark:focus:outline-none 
            dark:focus:ring-1 
            dark:focus:ring-gray-600"
        >
          quit
        </button>
      </td>
    </>
  );
};

export default Game;
