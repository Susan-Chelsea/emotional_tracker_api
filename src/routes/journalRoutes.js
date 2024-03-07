
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.delete('/delete/:id', journalController.deleteJournal)

router.get('/getAllJournals', journalController.getAllJournals);

router.get('/getAllJournals/:userId', journalController.getAllJournalsByUserId);

router.post('/journalOverview', journalController.overview)

router.post('/getJournal/:id', journalController.getJournalById);

router.patch('/update/:id', journalController.updateJournal);

router.post('/add', journalController.addJournal);

module.exports = router;