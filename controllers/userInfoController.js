const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const UserInfo = require('../models/UserInfo');

//  Sign up
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role, level, balance, generatedAddress } = req.body;

  try {
    let userInfo = await UserInfo.findOne({ email });

    if (userInfo) {
      return res.status(400).json({ errors: [{ message: 'User email already exists' }] });
    }

    userInfo = await UserInfo.findOne({ username });

    if (userInfo) {
      return res.status(400).json({ errors: [{ message: 'Username already exists' }] });
    }

    userInfo = new UserInfo({ username, email, password, role, level, balance, generatedAddress });

    const salt = await bcrypt.genSalt(10);

    userInfo.password = await bcrypt.hash(password, salt);

    await userInfo.save();

    const payload = { userInfo: { id: userInfo.id } };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ currentUser: user, token });
      }
    );

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

//  Sign in
exports.signin = async (req, res) => {
  console.log('signin => ', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let userInfo = await UserInfo.findOne({ username });

    if (!userInfo) {
      return res
        .status(400)
        .json({ errors: [{ message: 'No User Info' }] });
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Password' }] });
    }

    const payload = {
      user: {
        id: userInfo._id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) {
          console.log(err);
          throw err;
        }
        return res.status(200).json({ token, currentUser: userInfo });
      }
    );

  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// InsertUserInfo
exports.updateUserInfoById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { balance } = req.body;
  const { _id } = req.params;
  await UserInfo.findByIdAndUpdate(_id, {
    balance
  }).then(result => {
    console.log(result.data);
    return res.status(200).json(result);
  }).catch(error => {
    console.log(error);
  })
};

exports.updateUserInfoOne = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { receiveUsername, balance } = req.body;
  const filter = { username: receiveUsername };
  const update = { balance: balance };
  console.log(filter, update);
  await UserInfo.findOneAndUpdate(filter, update)
    .then(result => {
      console.log(result.data);
      return res.status(200).send(result);
    }).catch(error => {
      return res.status(500).send(error);
      console.log(error);
    })
};

exports.getUserInfoById = (req, res) => {
  const { _id } = req.params;
  UserInfo.findById(_id)
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}

exports.getAllUserInfo = (req, res) => {
  UserInfo.find()
    .then(results => {
      return res.status(200).json(results);
    })
    .catch(error => {
      console.log('# error => ', error);
      return res.status(500).send('Error!');
    })
}

exports.getGeneratedAddress = async (req, res) => {
  const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'ea525738b2a0d95fd70e203013f6ee3e49c3e227'
    }
  });
  const context = {
    "context": "yourExampleString",
    "data": {
      "item": {
        "label": "yourLabelStringHere"
      }
    }
  };
  const response = await api.post(
    `https://rest.cryptoapis.io/v2/wallet-as-a-service/wallets/62b0bc02d2c7f800070289b6/bitcoin/testnet/addresses?context=yourExampleString`,
    context
  )

  console.log('# response => ', response.data);
  return res.status(200).json(response.data);
}