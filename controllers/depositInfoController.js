const { validationResult } = require('express-validator');
const DepositInfo = require('../models/DepositInfo');

// UpdateDepositInfo
exports.updateDepositInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, username, value, received, recipient, txid, status } = req.body;
  const { _id } = req.params;
  try {

    await DepositInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      username,
      value,
      received,
      recipient,
      txid,
      status
    }).then(result => {
      console.log(result.data);
      return res.status(200).json(result.data);
    }).catch(error => {
      console.log(error);
    })

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
//Insert Deposit Info
exports.insertDepositInfo = async (req, res) => {
  const { id, transaction, type, username, value, received, recipient, txid, status } = req.body;
  console.log(id, transaction, type, username, value, received, recipient, txid, status);
  try {
    let depositInfo = new DepositInfo({ id, transaction, type, username, value, received, recipient, txid, status });
    const result = await depositInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getDepositInfoById = (req, res) => {
  const { _id } = req.params;
  DepositInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllDepositInfo = (req, res) => {
  DepositInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}