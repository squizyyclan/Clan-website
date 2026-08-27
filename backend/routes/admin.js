const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Player = require('../models/Player');

const router = express.Router();

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    authorize(['admin'])(req, res, next);
  });
};

// Get all pending players
router.get('/players/pending', isAdmin, async (req, res) => {
  try {
    const players = await Player.find({ status: 'pending' })
      .populate('userId', 'username email minecraftUsername');
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Approve player
router.post('/players/:id/approve', isAdmin, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Spieler nicht gefunden' });
    }

    player.status = 'approved';
    player.approvedBy = req.user.id;
    player.approvedDate = new Date();
    await player.save();

    // Update user approval status
    await User.findByIdAndUpdate(player.userId, { isApproved: true });

    res.json({ message: 'Spieler genehmigt!', player });
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Reject player
router.post('/players/:id/reject', isAdmin, async (req, res) => {
  try {
    const { reason } = req.body;
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Spieler nicht gefunden' });
    }

    player.status = 'rejected';
    player.rejectionReason = reason || 'Keine Angabe';
    await player.save();

    res.json({ message: 'Spieler abgelehnt!', player });
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Get admin dashboard stats
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const approvedUsers = await User.countDocuments({ isApproved: true });
    const pendingPlayers = await Player.countDocuments({ status: 'pending' });
    const approvedPlayers = await Player.countDocuments({ status: 'approved' });

    res.json({
      totalUsers,
      approvedUsers,
      pendingPlayers,
      approvedPlayers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

module.exports = router;
