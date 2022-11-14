const { validationResult } = require('express-validator');
const RewardInfo = require('../models/RewardInfo');

// UpdateRewardInfo
exports.updateRewardInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, pool, username, stake, reward, reward_percentage } = req.body;
  const { _id } = req.params;
  try {

    await RewardInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      pool,
      username,
      stake,
      reward,
      reward_percentage
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
//Insert Reward Info
exports.insertRewardInfo = async (req, res) => {
  const { id, transaction, type, pool, username, stake, reward, reward_percentage } = req.body;
  console.log(id, transaction, type, pool, username, stake, reward, reward_percentage );
  try {
    let rewardInfo = new RewardInfo({ id, transaction, type, pool, username, stake, reward, reward_percentage });
    const result = await rewardInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getRewardInfoById = (req, res) => {
  const { _id } = req.params;
  RewardInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllRewardInfo = (req, res) => {
  RewardInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}