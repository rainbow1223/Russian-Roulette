const express = require('express');
const router = express.Router();
const swapInfoController = require('../../controllers/swapInfoController');

router.post(
    '/insertSwapInfo',
    (req, res) => { swapInfoController.insertSwapInfo(req, res); }
);
router.get('/getSwapInfoById/:_id', (req, res) => { swapInfoController.getSwapInfoById(req, res); });
router.get('/getAllSwapInfo', (req, res) => { swapInfoController.getAllSwapInfo(req, res); });

module.exports = router;