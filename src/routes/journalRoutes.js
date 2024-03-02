
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.get('/getAllJournals', journalController.getAllJournals);

router.get('/getAllJournals/:userId', journalController.getAllJournalsByUserId);

router.get('/getJournal/:id', journalController.getJournalById);

router.post('/addJournal', journalController.addJournal);

router.patch('/updateJournal', journalController.updateJournal);

router.delete('/deleteJournal', journalController.deleteJournal)

module.exports = router;