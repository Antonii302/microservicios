const { Router } = require('express');
const router = Router();

const { getAllBreeds } = require('../controllers/breeds.controller');

router.get('/', getAllBreeds);

module.exports = router;