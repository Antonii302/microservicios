const { Router } = require('express');
const router = Router();

const { getAllCompetitions } = require('../controllers/competitions.controller');

router.get('/', getAllCompetitions);

module.exports = router;