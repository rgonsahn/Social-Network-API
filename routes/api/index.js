const router = require('express').Router();

const routesUser = require('./routesUser');

const routesOpinion = require("./routesOpinion");

router.use('/users', routesUser);
router.use('/opinions', routesOpinion);

module.exports = router;