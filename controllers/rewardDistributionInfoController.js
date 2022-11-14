const { validationResult } = require('express-validator');
const RewardDistributionInfo = require('../models/RewardDistributionInfo');

// UpdateRewardDistributionInfo
exports.updateRewardDistributionInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, transaction, type, pool, staked, reward, reward_percentage } = req.body;
  const { _id } = req.params;
  try {

    await RewardDistributionInfo.findByIdAndUpdate(_id, {
      id,
      transaction,
      type,
      pool,
      staked,
      reward,
      reward_percentage,
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
//Insert RewardDistribution Info
exports.insertRewardDistributionInfo = async (req, res) => {
  const { id, transaction, type, pool, staked, reward, reward_percentage } = req.body;
  console.log(id, transaction, type, pool, staked, reward, reward_percentage );
  try {
    let rewardDistributionInfo = new RewardDistributionInfo({ id, transaction, type, pool, staked, reward, reward_percentage });
    const result = await rewardDistributionInfo.save();
    return res.status(200).json(result);
  }  catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error'); 
  }
};
//
exports.getRewardDistributionInfoById = (req, res) => {
  const { _id } = req.params;
  RewardDistributionInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })

}

exports.getAllRewardDistributionInfo = (req, res) => {
  RewardDistributionInfo.find()
    .then(results => {
      console.log(results);
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}