const apiAuthMiddleware = require('../middleware/api-auth');
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.delete('/delete/:id', apiAuthMiddleware.isAuthenticated,  journalController.deleteJournal)

router.get('/getAllJournals', apiAuthMiddleware.isAuthenticated, journalController.getAllJournals);

router.get('/getAllJournals/:userId', apiAuthMiddleware.isAuthenticated ,journalController.getAllJournalsByUserId);

router.post('/journalOverview', apiAuthMiddleware.isAuthenticated,  journalController.overview)

router.post('/getJournal/:id',apiAuthMiddleware.isAuthenticated,  journalController.getJournalById);

router.patch('/update/:id',apiAuthMiddleware.isAuthenticated, journalController.updateJournal);

router.post('/add', apiAuthMiddleware.isAuthenticated, journalController.addJournal);

module.exports = router;