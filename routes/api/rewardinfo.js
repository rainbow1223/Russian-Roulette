const express = require('express');
const router = express.Router();
const rewardInfoController = require('../../controllers/rewardInfoController');

router.post(
    '/insertRewardInfo',
    (req, res) => { rewardInfoController.insertRewardInfo(req, res); }
);
router.get('/getRewardInfoById/:_id', (req, res) => { rewardInfoController.getRewardInfoById(req, res); });
router.get('/getAllRewardInfo', (req, res) => { rewardInfoController.getAllRewardInfo(req, res); });

module.exports = router;