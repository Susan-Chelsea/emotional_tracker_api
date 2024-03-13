const database = require('../utils/dbconn');

exports.isAuthenticated = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (apiKey) {
        const selectSQL = `SELECT * FROM api_key WHERE api_key = '${apiKey}'`;

        database.query(selectSQL).then(([rows, fieldData]) => {
            if (rows[0]['api_key'] === apiKey) {
                next();
            } else {
                res.status(403).json({
                    message: 'User is unauthenticated',
                    authenticated: false
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Error when trying to validate user',
                authenticated: false
            });
        })

    } else {
        res.status(403).json({
            message: 'User is unauthenticated',
            authenticated: false
        });
    }
};