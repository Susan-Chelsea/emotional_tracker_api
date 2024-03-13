const database = require('../utils/dbconn');
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req, res) => {
    const selectSQL = 'SELECT * FROM user';

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(201).json({
                success: true,
                users: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.getUserById = (req, res) => {
    const {id} = req.params
    const selectSQL = `SELECT * FROM user where user_id = ${id}`;

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(201).json({
                success: true,
                users: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.addUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUserValues = Object.values(req.body).map(value => value);

    const insertUserSql =
        "INSERT INTO user " +
        "(username, password, first_name, last_name)" +
        " VALUES (?, ?, ?, ?)";

    database.query(insertUserSql, newUserValues)
        .then(async () => {
            const newUser = await getUserByUserName(newUserValues[0])
            setApiKeyForUser(newUser);

            res.status(201).json({
                message: 'User created!',
                success: true,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

const getUserByUserName = async (userName) => {
    let user;
    const selectSQL = `SELECT * FROM user where username = "${userName}"`;

    try {
        const [rows, _fieldData] = await database.query(selectSQL);
        user = rows[0];
    } catch (error) {
        throw error
    }

    return user;
}

const setApiKeyForUser = (newUser) => {
    const insertApiKeySql =
        "INSERT INTO api_key " +
        "(user_id, api_key)" +
        " VALUES (?, ?)";

    const userId = newUser['user_id'];

    const apiKeyValues = [userId, genAPIKey()]

    database.query(insertApiKeySql, apiKeyValues)
        .then(async () => {
            console.log('Successfully added apikey for user:', userId);
        }).catch(error => {
        throw error;
    });
}

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: `Error when getting users: ${error}`
    })
}

const genAPIKey = () => {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};