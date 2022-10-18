const express = require('express');
const router = express.Router();
const transactionInfoController = require('../../controllers/transactionInfoController');

router.post(
    '/insertTransactionInfo',
    (req, res) => { transactionInfoController.insertTransactionInfo(req, res); }
);
router.get('/getTransactionInfoById/:_id', (req, res) => { transactionInfoController.getTransactionInfoById(req, res); });
router.get('/getAllTransactionInfo', (req, res) => { transactionInfoController.getAllTransactionInfo(req, res); });

module.exports = router;
