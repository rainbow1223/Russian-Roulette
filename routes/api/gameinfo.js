const express = require('express');
const router = express.Router();
const gameInfoController = require('../../controllers/gameInfoController');

router.post(
    '/insertGameInfo',
    (req, res) => { gameInfoController.insertGameInfo(req, res); }
);
router.get('/getGameInfoById/:_id', (req, res) => { gameInfoController.getGameInfoById(req, res); });
router.get('/getAllGameInfo', (req, res) => { gameInfoController.getAllGameInfo(req, res); });
router.post('/generatorRandomNumber', (req, res) => { gameInfoController.generatorRandomNumber(req, res); });

module.exports = router;
