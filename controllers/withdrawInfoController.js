const { validationResult } = require('express-validator');
const WithdrawInfo = require('../models/WithdrawInfo');

// UpdateDepositInfo
exports.updateWithdrawInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, username, value, fee_percentage, fee, received, recipient, txid, status } = req.body;
  const { _id } = req.params;
  try {

    await WithdrawInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      username,
      value,
      fee_percentage,
      fee,
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
//Insert Withdraw Info
exports.insertWithdrawInfo = async (req, res) => {
  const { id, transaction, type, username, value, fee_percentage, fee, received, recipient, txid, status } = req.body;
  console.log(id, transaction, type, username, value, fee_percentage, fee, received, recipient, txid, status );
  try {
    let withdrawInfo = new WithdrawInfo({ id, transaction, type, username, value,fee_percentage, fee, received, recipient, txid, status });
    const result = await withdrawInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getWithdrawInfoById = (req, res) => {
  const { _id } = req.params;
  WithdrawInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllWithdrawInfo = (req, res) => {
  WithdrawInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}