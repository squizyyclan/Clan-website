const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  minecraftUsername: {
    type: String,
    required: [true, 'Minecraft Username ist erforderlich'],
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedDate: Date,
  rejectionReason: String,
  level: {
    type: Number,
    default: 1
  },
  kills: {
    type: Number,
    default: 0
  },
  deaths: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Player', playerSchema);
