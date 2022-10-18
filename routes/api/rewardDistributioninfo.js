const express = require('express');
const router = express.Router();
const rewardDistributionInfoController = require('../../controllers/rewardDistributionInfoController');

router.post(
    '/insertRewardDistributionInfo',
    (req, res) => { rewardDistributionInfoController.insertRewardDistributionInfo(req, res); }
);
router.get('/getRewardDistributionInfoById/:_id', (req, res) => { rewardDistributionInfoController.getRewardDistributionInfoById(req, res); });
router.get('/getAllRewardDistributionInfo', (req, res) => { rewardDistributionInfoController.getAllRewardDistributionInfo(req, res); });

module.exports = router;