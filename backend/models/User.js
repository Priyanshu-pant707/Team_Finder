const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skills: [String],
  available: { type: Boolean, default: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null }
});

module.exports = mongoose.model('User', userSchema);
