const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
  const { teamName, projectIdea } = req.body;
  const leaderId = req.user.id;

  try {
    const newTeam = new Team({
      teamName,
      leaderId,
      members: [leaderId],
      projectIdea
    });

    const team = await newTeam.save();

    await User.findByIdAndUpdate(leaderId, {
      teamId: team._id,
      available: false
    });

    res.json(team);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getAvailableTeams = async (req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  const openTeams = teams.filter(team => team.members.length < team.maxMembers);
  res.json(openTeams);
};

exports.sendJoinRequest = async (req, res) => {
  const teamId = req.params.teamId;
  const userId = req.user.id;

  const team = await Team.findById(teamId);
  if (!team.requests.includes(userId)) {
    team.requests.push(userId);
    await team.save();
  }

  res.json({ msg: 'Request sent' });
};

exports.acceptRequest = async (req, res) => {
  const teamId = req.params.teamId;
  const userId = req.body.userId;

  const team = await Team.findById(teamId);
  if (team.members.length >= team.maxMembers) {
    return res.status(400).json({ msg: 'Team is full' });
  }

  if (!team.requests.includes(userId)) {
    return res.status(400).json({ msg: 'No such request' });
  }

  team.members.push(userId);
  team.requests = team.requests.filter(id => id.toString() !== userId);
  await team.save();

  await User.findByIdAndUpdate(userId, { teamId: teamId, available: false });

  res.json({ msg: 'Request accepted' });
};
