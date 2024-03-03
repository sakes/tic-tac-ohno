/**
 * READ
 */

const EXISTS = `
    SELECT EXISTS(
        SELECT us.id
        FROM user_summary us

        INNER JOIN user u
        ON (us.user_id = u.id)

        WHERE u.username = $1
    );
`;

const GET = `
    SELECT us.id, us.user_id, us.wins, us.losses, us.ties
    FROM user_summary us
    WHERE us.user_id = $1
    LIMIT 1;
`;

const GET_BY_USERNAME = `
    SELECT us.id, us.user_id, us.wins, us.losses, us.ties
    FROM user_summary us

    INNER JOIN user u
    ON (us.user_id = u.id)

    WHERE u.username = $1
    LIMIT 1;
`;

const LIST = `
    SELECT us.id, us.user_id, u.username, us.wins, us.losses, us.ties, us.updated_date
    FROM user_summary us

    INNER JOIN users u
    ON (us.user_id = u.id)

    ORDER BY us.wins DESC, us.created_date ASC
`;

const LIST_W_LIMIT = `
    ${LIST}
    LIMIT $1
`;

/**
 * WRITE
 */

const INSERT = `
    INSERT INTO user_summary (user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
`;

const INSERT_BY_USERNAME = `
    INSERT INTO user_summary (user_id)
    SELECT id
    FROM users
    WHERE username = $1
    RETURNING id;
`;

const UPDATE = `
    UPDATE user_summary
    SET wins = $2,
        losses = $3,
        ties = $4,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_BY_USERNAME = `
    UPDATE user_summary us
    SET wins = $2,
        losses = $3,
        ties = $4,
        updated_date = now()
    FROM user u
    WHERE us.user_id = u.id AND u.username = $1
`;

/**
 * INCREMENT
 */

const INC_WINS = `
    UPDATE user_summary us
    SET wins = wins + 1
    WHERE us.user_id = $1
`;

const INC_WINS_BY_USERNAME = `
    UPDATE user_summary us
    SET wins = wins + 1
    FROM user u
    WHERE us.user_id = u.id AND u.username = $1
`;

const INC_LOSSES = `
    UPDATE user_summary us
    SET losses = losses + 1
    WHERE us.user_id = $1
`;

const INC_LOSSES_BY_USERNAME = `
    UPDATE user_summary us
    SET losses = losses + 1
    FROM user u
    WHERE us.user_id = u.id AND u.username = $1
`;

const INC_TIES = `
    UPDATE user_summary us
    SET ties = ties + 1
    WHERE us.user_id = $1
`;

const INC_TIES_BY_USERNAME = `
    UPDATE user_summary us
    SET ties = ties + 1
    FROM user u
    WHERE us.user_id = u.id AND u.username = $1
`;

/**
 * DELETE
 */

const DELETE = `
    DELETE FROM user_summary
    WHERE id = $1
`;


module.exports = {
    EXISTS,
    GET,
    GET_BY_USERNAME,
    LIST,
    LIST_W_LIMIT,
    
    INSERT,
    INSERT_BY_USERNAME,
    UPDATE,
    UPDATE_BY_USERNAME,

    INC_WINS,
    INC_WINS_BY_USERNAME,
    INC_LOSSES,
    INC_LOSSES_BY_USERNAME,
    INC_TIES,
    INC_TIES_BY_USERNAME,

    DELETE
};
