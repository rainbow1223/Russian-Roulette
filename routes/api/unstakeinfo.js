const express = require('express');
const router = express.Router();
const unstakeInfoController = require('../../controllers/unstakeInfoController');

router.post(
    '/insertUnstakeInfo',
    (req, res) => { unstakeInfoController.insertUnstakeInfo(req, res); }
);
router.get('/getUnstakeInfoById/:_id', (req, res) => { unstakeInfoController.getUnstakeInfoById(req, res); });
router.get('/getAllUnstakeInfo', (req, res) => { unstakeInfoController.getAllUnstakeInfo(req, res); });

module.exports = router;