const express = require('express');
const router = express.Router();
const betController = require('../../controllers/betController');

router.post(
  '/insertNew',
  (req, res) => { betController.insertBet(req, res); }
);

module.exports = router;
