const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: String,
  leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxMembers: { type: Number, default: 4 },
  projectIdea: String,
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', teamSchema);
