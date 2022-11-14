const { validationResult } = require('express-validator');
const UnstakeInfo = require('../models/UnstakeInfo');

// UpdateUnstakeInfo
exports.updateUnstakeInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, pool, username, value } = req.body;
  const { _id } = req.params;
  try {

    await SwapInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      pool,
      username,
      value
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
//Insert Unstake Info
exports.insertUnstakeInfo = async (req, res) => {
  const { id, transaction, type, pool, username, value } = req.body;
  console.log(id, transaction, type, pool, username, value );
  try {
    let unstakeInfo = new UnstakeInfo({ id, transaction, type, pool, username, value });
    const result = await unstakeInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getUnstakeInfoById = (req, res) => {
  const { _id } = req.params;
  UnstakeInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllUnstakeInfo = (req, res) => {
  UnstakeInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}