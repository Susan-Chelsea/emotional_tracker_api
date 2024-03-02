const database = require('../utils/dbconn');

exports.getAllJournals = (req, res) => {
    const selectSQL = 'SELECT * FROM journal';

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(200).json({
                success: true,
                journals: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.getAllJournalsByUserId = (req, res) => {
    const { userId } = req.params;
    const selectSQL = `SELECT * FROM journal where user_id = ${userId}`;

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(200).json({
                success: true,
                journals: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.getJournalById = (req, res) => {
    const {id} = req.params

    const selectSQL = `SELECT * FROM journal where journal_id = ${id}`;

    database.query(selectSQL)
        .then(([rows, _fieldData]) => {
            res.status(200).json({
                success: true,
                journal: rows,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.addJournal = (req, res) => {
    const journal = Object.values(req.body).map(value => value);

    const insertSql =
        "INSERT INTO journal " +
        "(user_id, title, anger, contempt, disgust, enjoyment, fear, sadness, surprise, trigger_reason, datetime, notes)" +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    database.query(insertSql, journal)
        .then(() => {
            res.status(201).json({
                success: true,
            });
        }).catch(error => {
        handleError(error, res);
    });
}

exports.updateJournal = (req, res) => {
    const {id} = req.params;
    const journal = Object.values(req.body).map(value => value.trim());
    journal.push(id);

    const sql = "UPDATE journal SET title = ?, anger = ?, contempt = ?, disgust = ?, enjoyment = ?, fear = ?, sadness = ?, surprise = ?, trigger_reason = ?, datetime = ?, notes = ? WHERE journal_id = ?"

    database.query(insertSql)
        .then(([rows, fieldData]) => res.status(200))
        .catch(error => {
            handleError(error, res);
        });
}

exports.deleteJournal = (req, res) => {
    const id = req.body.journalId;

    const sql = `DELETE FROM journal WHERE journal_id = ${id}`;

    database.query(insertSql)
        .then(([rows, fieldData]) => res.status(200))
        .catch(error => {
            handleError(error, res);
        });
}

const handleError = (error, res) => {
    res.status(500).json({
        success: false,
        message: `Error in journal controller: ${error}`
    })
}