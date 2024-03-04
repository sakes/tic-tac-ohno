import useSession from "../../../state/session";
import useGame from "../../../state/game";

const getMyChar = (userId, playerTwoUserId) => {
  if (playerTwoUserId) {
    if (userId === playerTwoUserId) {
      return "Oh";
    }
    return "X";
  }

  return "?";
};

const getMyOpponentChar = (userId, playerTwoUSerId) => {
  const myChar = getMyChar(userId, playerTwoUSerId);
  switch (myChar) {
    case "X":
      return "Oh";
    case "Oh":
      return "X";
    default:
      return "?";
  }
};

const computeHeaderTextAndStyle = ({
  userId,
  playerTwoId,
  nextPlayerId,
  refreshPending,
  winnerUserId,
  completed,
}) => {
  if (!playerTwoId) {
    return {
      text: "Waiting for player to join...",
      style: "text-purple-300",
    };
  }

  if (refreshPending) {
    return {
      text: "Moving...",
      style: "text-gray-300",
    };
  }

  if (winnerUserId) {
    return winnerUserId === userId
      ? {
          text: "YOU WIN!!!",
          style: "text-green-500",
        }
      : {
          text: "LOOSAYRrr",
          style: "text-red-500",
        };
  }

  if (completed) {
    return {
      text: "ooof Tie",
      style: "text-gray-500",
    };
  }

  if (nextPlayerId && userId === nextPlayerId) {
    return {
      text: `It is your turn player ${getMyChar(userId, playerTwoId)}`,
      style: "text-green-500",
    };
  }

  if (nextPlayerId && userId !== nextPlayerId) {
    return {
      text: `Waiting on player ${getMyOpponentChar(userId, playerTwoId)}`,
      style: "text-gray-500",
    };
  }

  return {
    style: "text-orange-500",
    text: "state missing, this should not happen",
  };
};

const HeaderStatus = () => {
  const userId = useSession((state) => state.user?.id);
  const { playerTwoId, nextPlayerId, refreshPending, winnerUserId, completed } =
    useGame((state) => {
      return {
        playerTwoId: state.game?.opponent_user_id || undefined,
        nextPlayerId: state.selectNextPlayerId() || undefined,
        refreshPending: state.game?.refreshPending || false,
        winnerUserId: state.game?.winner_user_id || undefined,
        completed: state.game?.completed || false,
      };
    });

  const { text, style } = computeHeaderTextAndStyle({
    userId,
    playerTwoId,
    nextPlayerId,
    refreshPending,
    winnerUserId,
    completed,
  });

  console.log("HEEEER");
  console.log({
    userId,
    playerTwoId,
    nextPlayerId,
    refreshPending,
    winnerUserId,
    completed,
  });

  return (
    <h1 className={`text-[2em] text-opacity-75 text-center ${style}`}>
      {text}
    </h1>
  );
};

export default HeaderStatus;
