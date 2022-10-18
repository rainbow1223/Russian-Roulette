const express = require('express');
const router = express.Router();
const transactionInfoController = require('../../controllers/transactionInfoController');

router.post(
    '/insertDepositInfo',
    (req, res) => { depositInfoController.insertDepositInfo(req, res); }
);
router.get('/getDepositInfoById/:_id', (req, res) => { depositInfoController.getDepositInfoById(req, res); });
router.get('/getAllDepositInfo', (req, res) => { depositInfoController.getAllDepositInfo(req, res); });

module.exports = router;