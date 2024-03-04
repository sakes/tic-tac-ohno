const CHAINS = [
    [[0, 0], [0, 1], [0, 2]], // row 0
    [[1, 0], [1, 1], [1, 2]], // row 1
    [[2, 0], [2, 1], [2, 2]], // row 2

    [[0, 0], [1, 0], [2, 0]], // col 0
    [[0, 1], [1, 1], [2, 1]], // col 1
    [[0, 2], [1, 2], [2, 2]], // col 2

    [[0, 0], [1, 1], [2, 2]], // dia tl
    [[0, 2], [1, 1], [2, 0]], // dia tr
];

const isChainSuccess = (board, chain) => {
    const b = board;
    const c = chain;
    const success = b[c[0][0]][c[0][1]] && (
        b[c[0][0]][c[0][1]] === b[c[1][0]][c[1][1]] && b[c[1][0]][c[1][1]] === b[c[2][0]][c[2][1]]
    );
    return success ? b[c[0][0]][c[0][1]] : false;
}

const getWinner = (board) => {
    for (var i = 0; i < CHAINS.length; i++) {
        const winner = isChainSuccess(board, CHAINS[i]);
        if (winner) return winner;
    }
    return 0;
}

const countVals = (board) => {
    let cnt0 = 0;
    let cntX = 0;
    let cntO = 0;

    for (var n = 0; n < board.length; n++) {
        for (var m = 0; m < board[n].length; m++) {
            const v = board[n][m];
            switch(v) {
                case 0: 
                    cnt0++;
                    break;
                case 'X':
                    cntX++;
                    break;
                case 'O':
                    cntO++;
                    break;
                default:
                    throw new Error(`Game Logic Util countVals(): Board contains invalid value. Must be either 0, X, or O. Value passed in: ${v}`);
            }
        }
    }

    return { cnt0, cntX, cntO };
}

const computeGameStatus = (board) => {
    const { cnt0, cntX, cntO } = countVals(board);
    const winner = getWinner(board);

    if (winner) {
        return {
            nextPlayer: undefined,
            winner,
            complete: true
        }
    }

    if (!cnt0) {
        return {
            nextPlayer: undefined,
            winner: undefined,
            complete: true
        }
    }

    return {
        nextPlayer: cntX === cntO ? 'X' : 'O',
        winner: undefined,
        complete: false
    }
}

const move = (board, player, row, col) => {
    if (player !== 'X' && player !== 'O') throw new Error(`Game Logic Util move(): Invalid player character. Must be either X or O. Value passed in: ${player})`);
    if (board[row][col] !== 0) throw new Error(`Game Logic Util move(): Attempted to move to unavailable position. Row:${row} Col:${col} already contains ${board[row][col]}`);

    board[row][col] = player;
}

const computeNextPlayerId = (nextPlayerChar, ownerUserId, opponentUserId) => {
    if (!ownerUserId || !opponentUserId) {
        return undefined;
    }

    let nextPlayerId = undefined;
    if (nextPlayerChar) {
        nextPlayerId = nextPlayerChar === 'X' ? ownerUserId : opponentUserId;
    }
    return nextPlayerId
}

const computeWinnerPlayerId = (winnerPlayerChar, ownerUserId, opponentUserId) => {
    console.log('COMPUTE WINNER PLAYER ID');
    console.log(winnerPlayerChar, ownerUserId, opponentUserId);
    if (!ownerUserId || !opponentUserId) {
        return undefined;
    }

    let winnerUserId = undefined;
    if (winnerPlayerChar) {
        winnerUserId = winnerPlayerChar === 'X' ? ownerUserId : opponentUserId;
    }
    console.log(winnerUserId);
    console.log('END: COMPUTE WINNER PLAYER ID');
    return winnerUserId;
}

module.exports = {
    computeGameStatus,
    move,
    computeNextPlayerId,
    computeWinnerPlayerId
}