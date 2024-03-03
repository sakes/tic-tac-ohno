/**
 * READ
 */

const EXISTS = `
    SELECT EXISTS(
        SELECT g.id
        FROM games g

        INNER JOIN users owner
        ON (g.owner_user_id = owner.id)

        LEFT OUTER JOIN users opponent
        ON (
            g.opponent_user_id IS NOT NULL 
            AND 
            g.opponent_user_id = opponent.id
        )

        WHERE
            g.completed = false
            AND g.winner_user_id IS NULL
            AND ( 
                owner.username = $1
                OR opponent.username = $1
            );
    );
`;

const GET = `
    SELECT g.id, g.owner_user_id, g.opponent_user_id, g.moves, g.winner_user_id, g.completed
    FROM games g
    WHERE g.id = $1
    LIMIT 1;
`;

const GET_MY_CURRENT_GAME = `
    SELECT g.id, g.owner_user_id, g.opponent_user_id, g.moves, g.winner_user_id, g.completed
    FROM games g

    INNER JOIN users owner
    ON (g.owner_user_id = owner.id)

    LEFT OUTER JOIN users opponent
    ON (
        g.opponent_user_id IS NOT NULL 
        AND 
        g.opponent_user_id = opponent.id
    )

    WHERE
        g.completed = false
        AND g.winner_user_id IS NULL
        AND ( 
            owner.username = $1
            OR opponent.username = $1
        );
    LIMIT 1;
`;

const LIST = `
    SELECT 
        g.id, 
        p1.username as player_one, 
        p2.username as player_two, 
        g.opponent_user_id, 
        g.moves, 
        w.username as winner, 
        g.completed

    FROM games us

    INNER JOIN users p1
    ON (g.owner_user_id = p1.id)

    LEFT OUTER JOIN users p2
    ON (
        g.opponent_user_id IS NOT NULL 
        AND 
        g.opponent_user_id = p2.id
    )

    LEFT OUTER JOIN users w
    ON (
        g.winner_user_id IS NOT NULL 
        AND 
        g.winner_user_id = w.id
    )

    ORDER BY us.created_date DESC
`;

const LIST_W_LIMIT = `
    ${LIST}
    LIMIT $1;
`;

const LIST_OPEN_GAMES = `
    SELECT 
        g.id, 
        p1.username as player_one, 
        null as player_two, 
        g.opponent_user_id, 
        g.moves, 
        null as winner, 
        g.completed

    FROM games us

    INNER JOIN users p1
    ON (g.owner_user_id = p1.id)

    WHERE g.opponent_user_id IS NULL
    AND g.winner_user_id IS NULL
    AND g.completed = false
    ORDER BY us.wins DESC
`;

const LIST_OPEN_GAMES_W_LIMIT = `
    ${LIST_OPEN_GAMES}
    LIMIT $1;
`;

/**
 * WRITE
 */

const INSERT = `
    INSERT INTO games (owner_user_id)
    VALUES ($1)
    RETURNING id;
`;

const UPDATE = `
    UPDATE games
    SET owner_user_id = $2,
        opponent_user_id = $3,
        moves = $4,
        winner_user_id = $5,
        completed = $6,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_OPPONENT = `
    UPDATE games
    SET opponent_user_id = $2,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_MOVES = `
    UPDATE games
    SET moves = $2,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_WINNER = `
    UPDATE games
    SET moves = $2,
        completed = true,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_COMPLETED = `
    UPDATE games
    SET completed = true,
        updated_date = now()
    WHERE id = $1
`;


/**
 * DELETE
 */

const DELETE = `
    DELETE FROM games
    WHERE id = $1
`;


module.exports = {
    EXISTS,
    GET,
    GET_MY_CURRENT_GAME,

    LIST,
    LIST_W_LIMIT,
    LIST_OPEN_GAMES,
    LIST_OPEN_GAMES_W_LIMIT,
    
    INSERT,
    UPDATE,
    UPDATE_OPPONENT,
    UPDATE_MOVES,
    UPDATE_WINNER,
    UPDATE_COMPLETED,

    DELETE
};
