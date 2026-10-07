const db = require("../db");


// ==================================================
// FIND USER BY EMAIL
// ==================================================

function findByEmail(email) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id,
                name,
                email,
                password
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        db.query(
            sql,
            [email],
            (error, results) => {

                if (error) {

                    console.error(
                        "FIND USER ERROR:",
                        error
                    );

                    reject(error);

                    return;
                }

                if (results.length === 0) {

                    resolve(null);

                    return;
                }

                resolve(results[0]);

            }
        );

    });

}


// ==================================================
// CREATE USER
// ==================================================

function createUser(
    name,
    email,
    password
) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO users
            (
                name,
                email,
                password
            )
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [
                name,
                email,
                password
            ],
            (error, result) => {

                if (error) {

                    console.error(
                        "CREATE USER ERROR:",
                        error
                    );

                    reject(error);

                    return;
                }


                const newUser = {

                    id: result.insertId,

                    name: name,

                    email: email,

                    password: password

                };


                resolve(newUser);

            }
        );

    });

}


// ==================================================
// EXPORT MODEL FUNCTIONS
// ==================================================

module.exports = {

    findByEmail,

    createUser

};