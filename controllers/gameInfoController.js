const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const GameInfo = require('../models/GameInfo');
const byteGenerator = require("../utils/byteGenerator");
const { createHmac } = require('crypto');

// InsertGameInfo
exports.insertGameInfo = async (req, res) => {
  const { wagered, payout, username, game, type } = req.body;
  try {
    const randomNumber = []
    for (i = 0; i < 20; i++) {
      const result = Number((Math.random() * (100 - 1 + 1) + 1).toFixed(2));
      randomNumber.push(result);
    }
    // const newIndex = Math.floor(Math.random() * randomNumber.length);
    const newIndex = 3;
    const result = randomNumber[newIndex];
    let gameInfo = new GameInfo({ username, wagered, payout, result, game, type });
    await gameInfo.save();
    return res.status(200).json({ randomNumber, result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

exports.getGameInfoById = (req, res) => {
  const { _id } = req.params;
  GameInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}

exports.getAllGameInfo = (req, res) => {
  GameInfo.find()
    .then(results => {
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}

exports.updatedGameInfo = async () => {
  const { game_id, game, type, players, wagered, result, payout, username } = req.body;
  const { _id } = req.params;
  try {
    await GameInfo.findByIdAndUpdate(_id, {
      game_id,
      players,
      wagered,
      result,
      type,
      game,
      payout,
      username
    }).then(result => {
      console.log(result.data);
    }).catch(error => {
      console.log(error);
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
}

exports.generatorRandomNumber = async (req, res) => {
  const { wagered, payout, username, game, type, clientSeed, nonce } = req.body;
  const iter = byteGenerator({
    serverSeed:
      "20e743b4dbec24efd5112f951145d1e415e2b040bf3c3816df67cfcac6b45e1d",
    clientSeed:
      clientSeed,
    nonce: nonce,
  });

  const nextValue = () => {
    return (
      Math.floor(iter.next().value * 100 / 256) + Math.floor((iter.next().value * 100) / 256) / 100
    );
  }

  const randomNumber = []

  for (let i = 0; i < 20; i++) {
    randomNumber.push(nextValue());
  }
  const newIndex = 3;
  const result = randomNumber[newIndex];
  let gameInfo = new GameInfo({ username, wagered, payout, result, game, type });
  await gameInfo.save();
  return res.status(200).json({ randomNumber, result });
}