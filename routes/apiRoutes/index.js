const router = require('express').Router();
const animalRoutes = require('../apiRoutes/noteRoutes');

router.use(animalRoutes);

module.exports = router;
