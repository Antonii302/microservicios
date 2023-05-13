const { Router } = require('express');
const router = Router();

const { getAllCompetitions, getCompetitionsByChampionId, getChampiosByTopFive, getCompetitionById } = require('../controllers/competitions.controller');

router.get('/', getAllCompetitions);
router.get('/dogs/:champion_id', getCompetitionsByChampionId);
router.get('/one/:id', getCompetitionById);
router.get('/top_winners/', getChampiosByTopFive);

module.exports = router;