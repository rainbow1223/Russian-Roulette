const { validationResult } = require('express-validator');
const SwapInfo = require('../models/SwapInfo');

// UpdateSwapInfo
exports.updateSwapInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, username, value, fee_percentage, fee, received } = req.body;
  const { _id } = req.params;
  try {

    await SwapInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      username,
      value,
      fee_percentage,
      fee,
      received
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
//Insert Swap Info
exports.insertSwapInfo = async (req, res) => {
  const { id, transaction, type, username, value, fee_percentage, fee, received } = req.body;
  console.log(id, transaction, type, username, value, fee_percentage, fee, received );
  try {
    let swapInfo = new SwapInfo({ id, transaction, type, username, value,fee_percentage, fee, received });
    const result = await swapInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getSwapInfoById = (req, res) => {
  const { _id } = req.params;
  SwapInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllSwapInfo = (req, res) => {
  SwapInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}