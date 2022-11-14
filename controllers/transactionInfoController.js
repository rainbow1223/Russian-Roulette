const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const config = require('config');
const TransactionInfo = require('../models/TransactionInfo');

// UpdateTransactionInfo
exports.updateTransactionInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, username, type, address, value, received } = req.body;
  const { _id } = req.params;
  try {

    await TransactionInfo.findByIdAndUpdate(_id, {
      id,
      username,
      type,
      address,
      value,
      received
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
//Insert Transaction Info
exports.insertTransactionInfo = async (req, res) => {
  const { username, value, received, type } = req.body;
  console.log(username, value, received, type);
  try {
    let transactionInfo = new TransactionInfo({ username, value, received, type });
    const result = await transactionInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getTransactionInfoById = (req, res) => {
  console.log('# getTransactionInfo');
  const { _id } = req.params;

  TransactionInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllTransactionInfo = (req, res) => {
  TransactionInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}