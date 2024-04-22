 const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.delete('/account', UserController.deleteAccount);

module.exports = router;