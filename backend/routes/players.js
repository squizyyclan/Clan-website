const express = require('express');
const { authenticate } = require('../middleware/auth');
const Player = require('../models/Player');
const User = require('../models/User');

const router = express.Router();

// Create player profile
router.post('/', authenticate, async (req, res) => {
  try {
    const { minecraftUsername } = req.body;

    if (!minecraftUsername) {
      return res.status(400).json({ message: 'Minecraft Username erforderlich' });
    }

    let player = await Player.findOne({ minecraftUsername });
    if (player) {
      return res.status(400).json({ message: 'Spieler existiert bereits' });
    }

    player = new Player({
      minecraftUsername,
      userId: req.user.id,
      status: 'pending'
    });

    await player.save();

    res.status(201).json({
      message: 'Spielerprofil erstellt! Warten Sie auf Admin-Genehmigung.',
      player
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler', error: error.message });
  }
});

// Get all approved players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find({ status: 'approved' })
      .populate('userId', 'username minecraftUsername');
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Get player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('userId', 'username');
    if (!player) {
      return res.status(404).json({ message: 'Spieler nicht gefunden' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

module.exports = router;
