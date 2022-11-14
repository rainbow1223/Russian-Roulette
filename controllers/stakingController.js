const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const config = require('config');
const Staking = require('../models/Staking');

// InsertGameInfo
exports.insertStaking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, staking_amount, claimed, type } = req.body;
  const { _id } = req.params;
  try {

    await Staking.findByIdAndUpdate(_id, {
      username,
      staking_amount,
      claimed,
      type
    }).then(result => {
      console.log(result.data);
    }).catch(error => {
      console.log(error);
    })

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

exports.getStakingById = (req, res) => {
  console.log('# getStaking');
  const { _id } = req.params;

  Staking.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllStaking = (req, res) => {
  Staking.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}