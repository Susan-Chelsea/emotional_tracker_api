const database = require('../utils/dbconn');
const bcrypt = require('bcryptjs');

exports.authenticateUser = (req, res) => {
    const {username, password} = req.body;

    const selectSQL = `SELECT user.*, api_key.api_key FROM user INNER JOIN api_key ON user.user_id = api_key.user_id WHERE user.username = '${username}'`;

    database.query(selectSQL)
        .then(async ([rows, _fieldData]) => {
            const user = rows[0];

            if (user) {
                const passwordValid = await bcrypt.compare(password, user.password);
                if (passwordValid) {
                    res.status(200).json({
                        message: 'Login successful',
                        authenticated: true,
                        profile: {
                            userId: user['user_id'],
                            userName: user['username'],
                            firstName: user['first_name'],
                            lastName: user['last_name'],
                            apiKey: user['api_key']
                        }
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid credentials',
                        authenticated: false
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Invalid credentials',
                    authenticated: false
                });
            }
        }).catch(error => {
        handleError(error, res);
    });


}

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: `Error when getting users: ${error}`
    })
}