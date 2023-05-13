const { Router } = require('express');
const router = Router();

const { getAllDogs, getCompetitionsById } = require('../controllers/dogs.controller.js');

router.get('/', getAllDogs);
router.get('/competitions/:id', getCompetitionsById);

module.exports = router;