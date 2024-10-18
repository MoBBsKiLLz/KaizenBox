export const userQueries = {
    readUsers: `
        SELECT
            user_id AS userId, username AS username, password AS password,
            created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.users
    `,
    readUsersByUsername: `
        SELECT
            user_id AS userId, username AS username, password AS password,
            created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.users
        WHERE kaizenbox.users.username = ?
    `,
    readUsersByUsernameSearch: `
        SELECT
            user_id AS userId, username AS username, password AS password,
            created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.users
        WHERE kaizenbox.users.username LIKE ?
    `,
    readUsersByUserId: `
        SELECT
            user_id AS userId, username AS username, password AS password,
            created_at AS created_at, updated_at AS updated_at
        FROM kaizenbox.users
        WHERE kaizenbox.users.user_id LIKE ?
    `,
    createUser: `
        INSERT INTO users(username, password) VALUES(?,?)
    `,
    updateUser: `
        UPDATE kaizenbox.users
        SET username = ?, password = ?
        WHERE user_id = ?
    `,
    deleteUser: `
        DELETE FROM kaizenbox.users
        WHERE user_id = ?
    `,
    assignFacilityToUser: `
        INSERT INTO user_facilities (user_id, facility_id) VALUES (?, ?)
    `
}