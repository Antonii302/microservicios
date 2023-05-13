const { Router } = require('express');
const router = Router();

const { getAllDogs, getCompetitionsById, getByOwnerCountry, getById } = require('../controllers/dogs.controller.js');

router.get('/', getAllDogs);
router.get('/:id', getById);
router.get('/competitions/:id', getCompetitionsById);
router.get('/owner/:country', getByOwnerCountry);

module.exports = router;