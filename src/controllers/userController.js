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

exports.getUserByUserName = (req, res) => {
    const {userName} = req.body;
    const selectSQL = `SELECT * FROM user where user_id = ${userName}`;

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(200).json({
                success: true,
                user: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.addUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    console.log('before', req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, salt);
    console.log('after', req.body.password)

    const user = Object.values(req.body).map(value => value);

    const insertSql =
        "INSERT INTO user " +
        "(username, password, first_name, last_name)" +
        " VALUES (?, ?, ?, ?)";

    database.query(insertSql, user)
        .then(() => {
            res.status(201).json({
                success: true,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

const handleError = (error, res) => {
    res.status(500).json({
        success: false,
        message: `Error when getting users: ${error}`
    })
}