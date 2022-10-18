const express = require('express');
const router = express.Router();
const serverSeedController = require('../../controllers/serverSeedController');

router.post(
    '/insertServerSeedInfo',
    (req, res) => { serverSeedController.insertServerSeedInfo(req, res); }
);
router.get('/getServerSeedInfoById/:_id', (req, res) => { serverSeedController.getServerSeedInfoById(req, res); });
router.get('/getAllServerSeedInfo', (req, res) => { serverSeedController.getAllServerSeedInfo(req, res); });
router.get('/generateHashChain', (req, res) => { serverSeedController.generateHashChain(req, res); });

module.exports = router;