const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const config = require('config');
const BetsInfo = require('../models/BetsInfo');

exports.insertNew = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, BetId, Value, TransactionID } = req.body;

  try {
    
    BetsInfo = await BetsInfo.findOne({ BetId });

    if (BetsInfo) {
      return res.status(400).json({ errors: [{ message: 'BetId already exists' }] });
    }

    BetsInfo = new User({ username, BetId, Value, TransactionID });

    await user.save();

    const payload = { user: { id: user.id } };

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

//  Sign in
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};