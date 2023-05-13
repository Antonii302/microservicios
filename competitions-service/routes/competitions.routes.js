const { Router } = require('express');
const router = Router();

const { getAllCompetitions, getCompetitionsByChampionId, getCompetitionById } = require('../controllers/competitions.controller');

router.get('/', getAllCompetitions);
router.get('/some/:champion_id', getCompetitionsByChampionId);
router.get('/one/:id', getCompetitionById);

module.exports = router;