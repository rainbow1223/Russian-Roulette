const express = require('express');
const router = express.Router();
const stakingController = require('../../controllers/stakingController');

router.put(
    '/insertStaking/:_id',
    (req, res) => { stakingController.insertStaking(req, res); }
);
router.get('/getStakingById/:_id', (req, res) => { stakingController.getStakingById(req, res); });
router.get('/getAllStaking', (req, res) => { stakingController.getAllStaking(req, res); });

module.exports = router;
