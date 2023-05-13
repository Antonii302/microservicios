const { Router } = require('express');
const router = Router();

const { getAllDogs } = require('../controllers/dogs.controller.js');

router.get('/', getAllDogs);

module.exports = router;