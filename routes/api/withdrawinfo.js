const express = require('express');
const router = express.Router();
const withdrawInfoController = require('../../controllers/withdrawInfoController');

router.post(
    '/insertWithdrawInfo',
    (req, res) => { withdrawInfoController.insertWithdrawInfo(req, res); }
);
router.get('/getWithdrawInfoById/:_id', (req, res) => { withdrawInfoController.getWithdrawInfoById(req, res); });
router.get('/getAllWithdrawInfo', (req, res) => { withdrawInfoController.getAllWithdrawInfo(req, res); });

module.exports = router;
