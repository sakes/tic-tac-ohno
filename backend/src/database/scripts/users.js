/**
 * READ
 */

const EXISTS = `
    SELECT EXISTS(
        SELECT id
        FROM users
        WHERE username = $1
    );
`;

const GET = `
    SELECT id, username
    FROM users
    WHERE id = $1
    LIMIT 1;
`;

const GET_BY_USERNAME = `
    SELECT id, username
    FROM users
    WHERE username = $1
    LIMIT 1;
`;

const LIST = `
    SELECT id, username, created_date
    FROM users
    ORDER BY updated_date DESC
`;

const LIST_W_LIMIT = `
    ${LIST}
    LIMIT = $1
`;

/**
 * WRITE
 */

const INSERT = `
    INSERT INTO users (username)
    VALUES ($1)
    return id;
`;

const UPDATE = `
    UPDATE users
    SET username = $2,
        updated_date = now()
    WHERE id = $1
`;

const UPDATE_BY_USERNAME = `
    UPDATE users
    SET username = $2,
        updated_date = now()
    WHERE username = $1
`;

/**
 * DELETE
 */

const DELETE = `
    DELETE FROM users
    WHERE id = $1
`;


export default {
    EXISTS,
    GET,
    GET_BY_USERNAME,
    LIST,
    LIST_W_LIMIT,
    INSERT,
    UPDATE,
    UPDATE_BY_USERNAME,
    DELETE
};
