const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../../controllers/authController');

router.post(
  '/signup',
  check('username', 'Username is required.').notEmpty(),
  check('email', 'Please include a vaild email').isEmail(),
  check('password', 'Please enter a password with 3 more characters.').isLength({ min: 3 }),
  (req, res) => { authController.signup(req, res); }
);
router.post(
  '/signin',
  check('username', 'Username is required').exists(),
  check('password', 'Password is required').exists(),
  (req, res) => { authController.signin(req, res); }
);

module.exports = router;
