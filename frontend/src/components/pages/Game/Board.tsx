import { useCallback, useMemo } from "react";
import { computeBorderStyle } from "./Board.util";

import SOCKET from "../../../socket/socket";

import useSession from "../../../state/session";
import useGame from "../../../state/game";

const ROWS = [0, 1, 2];
const COLS = [0, 1, 2];

/** ****************
 * CELL
 */

const Cell = ({ isMyTurn, userId, row, idx }) => {
  const borderStyle = useMemo(() => computeBorderStyle(row, idx), [row, idx]);

  const { board, owner_user_id, opponent_user_id } = useGame((state) => ({
    board: state.game?.board,
    owner_user_id: state.game?.owner_user_id,
    opponent_user_id: state.game?.opponent_user_id,
  }));

  const val = useMemo(() => {
    const _v = board[row][idx];
    return _v ? _v : "";
  }, [board, row, idx]);

  const pointerEvents = useMemo(() => {
    const isMySquare =
      !!val &&
      ((val === "X" && userId === owner_user_id) ||
        (val === "O" && userId === opponent_user_id));
    const isTheirSquare =
      !!val &&
      ((val === "X" && userId !== owner_user_id) ||
        (val === "O" && userId !== opponent_user_id));
    const bgColor = isMySquare
      ? "bg-green-300"
      : isTheirSquare
      ? "bg-gray-700 text-white text-opacity-70"
      : "";
    const pEvents = !isMyTurn || val ? "pointer-events-none" : "cursor-pointer";
    return ` ${bgColor} ${pEvents} `;
  }, [isMyTurn, val, userId, owner_user_id, opponent_user_id]);

  const move = useCallback(
    (e) => {
      e.preventDefault();
      SOCKET.gameMove(row, idx);
    },
    [row, idx]
  );

  return (
    <button
      type="button"
      onClick={move}
      className={`flex-none text-3xl w-[100px] h-[100px] flex justify-center bg-white text-black border-0 border-black hover:bg-blue-300 ${borderStyle} ${pointerEvents}`}
    >
      <div className="flex-none self-center ">{val}</div>
    </button>
  );
};

/** ****************
 * ROW
 */

const Row = ({ isMyTurn, userId, idx }) => {
  return (
    <div className="flex">
      {COLS.map((col) => (
        <Cell isMyTurn={isMyTurn} userId={userId} row={idx} idx={col} />
      ))}
    </div>
  );
};

/** ****************
 * BOARD
 */

const Board = () => {
  const userId = useSession((state) => state.user?.id);
  const nextPlayerId = useGame((state) => state.nextPlayerId);

  const { isMyTurn, currentPlayerStyle } = useMemo(() => {
    const _isMyTurn = userId && userId === nextPlayerId;
    return {
      isMyTurn: _isMyTurn,
      currentPlayerStyle: _isMyTurn ? " opacity-100 " : " opacity-30 ",
    };
  }, [userId, nextPlayerId]);

  return (
    <div className={`text-center ${currentPlayerStyle}`}>
      <div className="inline-block">
        {ROWS.map((row) => (
          <Row idx={row} isMyTurn={isMyTurn} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Board;
