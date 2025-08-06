const express = require('express');
const {
  createTeam,
  getAvailableTeams,
  sendJoinRequest,
  acceptRequest
} = require('../controllers/teamController');

const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createTeam);
router.get('/available', auth, getAvailableTeams);
router.post('/:teamId/request', auth, sendJoinRequest);
router.post('/:teamId/accept', auth, acceptRequest);

module.exports = router;
