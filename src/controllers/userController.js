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

    const insertSql =
        "INSERT INTO user " +
        "(username, password, first_name, last_name)" +
        " VALUES (?, ?, ?, ?)";

    database.query(insertSql, newUserValues)
        .then(async () => {
            res.status(201).json({
                message: 'User created!',
                success: true,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

const getUserByUserName = async (userName) => {
    const selectSQL = `SELECT * FROM user where user_id = ${userName}`;
    let user;

    try {
        const [rows, _fieldData] = await database.query(selectSQL);
        user = rows[0];
    } catch (error) {
        throw error;
    }

    return user;
}

const handleError = (error, res) => {
    res.status(500).json({
        success: false,
        message: `Error when getting users: ${error}`
    })
}