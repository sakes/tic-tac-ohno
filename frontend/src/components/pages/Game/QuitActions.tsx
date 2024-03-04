import { useCallback } from "react";

import SOCKET from "../../../socket/socket";

import useGame from "../../../state/game";

const QuitActions = () => {
  const { completed, clearGame } = useGame((state) => ({
    completed: state.game?.completed,
    clearGame: state.clear,
  }));
  const handleForfit = useCallback((e) => {
    e.preventDefault();
    SOCKET.forfitGame();
  }, []);

  const leaveGame = useCallback(() => {
    clearGame();
  }, [clearGame]);

  // const handleForceComplete = useCallback((e) => {
  //   e.preventDefault();
  //   SOCKET.forceComplete();
  // }, []);

  return (
    <>
      <div className="whitespace-nowrap text-sm font-medium text-center">
        {!completed && (
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
            FORFIT
          </button>
        )}
        {completed && (
          <button
            type="button"
            onClick={leaveGame}
            className="
            inline-flex 
            items-center 
            gap-x-2 
            text-sm 
            font-semibold 
            bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            LEAVE GAME
          </button>
        )}
      </div>
    </>
  );
};

export default QuitActions;

// <button
//         type="button"
//         onClick={handleForceComplete}
//         className="
//             hidden
//             inline-flex
//             items-center
//             gap-x-2
//             text-sm
//             font-semibold
//             rounded-lg
//             border
//             border-transparent
//             text-blue-600
//             hover:text-blue-800
//             hover:border-blue-700
//             disabled:opacity-50
//             disabled:pointer-events-none
//             dark:text-blue-500
//             dark:hover:text-blue-400
//             dark:hover:border-blue-300
//             dark:focus:outline-none
//             dark:focus:ring-1
//             dark:focus:ring-gray-600"
//       >
//         FORCE
//       </button>
