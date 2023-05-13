const { Router } = require('express');
const router = Router();

const { getAllBreeds, getBreed } = require('../controllers/breeds.controller');

router.get('/', getAllBreeds);
router.get('/breed/:name', getBreed);

module.exports = router;