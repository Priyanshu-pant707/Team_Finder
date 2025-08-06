const express = require('express');
const { register, login, getAvailableUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/available', auth, getAvailableUsers);

module.exports = router;
