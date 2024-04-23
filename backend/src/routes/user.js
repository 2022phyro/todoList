const express = require('express');
const UserController = require('../controllers/user');
const { authenticateJWT } = require('../middleware/authenticate');
const router = express.Router();

router.get('', authenticateJWT, UserController.getUser);
router.delete('', authenticateJWT, UserController.deleteUser)
router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/refresh', UserController.refreshToken);
router.post('/logout', UserController.logout);


module.exports = router;