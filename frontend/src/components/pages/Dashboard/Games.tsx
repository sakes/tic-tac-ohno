import { useCallback, useMemo } from "react";
import SOCKET from "../../../socket/socket";
import useDashboard from "../../../state/dashboard";

const Row = ({ game }) => {
  const isJoinable = useMemo(
    () => game.player_one && !game.player_two && !game.complete,
    [game]
  );

  const gameId = useMemo(() => game.id, [game]);

  const handleJoinGame = useCallback(() => {
    SOCKET.joinGame(gameId);
  }, [gameId]);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {game.player_one}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {game.player_two || <div className="text-opacity-30">None</div>}
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        0%
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {game.winner}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
        {isJoinable && (
          <button
            type="button"
            onClick={handleJoinGame}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Join
          </button>
        )}
      </td>
    </tr>
  );
};

const Games = () => {
  const games = useDashboard((state) => state.games);
  console.log(games);
  const handleCreateGame = useCallback((e) => {
    e.preventDefault();
    SOCKET.createGame();
  }, []);

  return (
    <>
      <div className="flex mt-16">
        <h1 className="flex-auto self-center text-green-200 text-[2em] text-opacity-50 mb-5">
          Games
        </h1>
        <div className="flex-none self-center ">
          <button
            type="button"
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateGame}
          >
            New Game
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Player 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Player 2
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Winner
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {games.map((game) => (
                    <Row game={game} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
