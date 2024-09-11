const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const router = express.Router();
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, email, password: await bcrypt.hash(password, 10) });
    await user.save();

    res.json({ success: true, message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', auth, async (req, res) => {
  const { username, bio, profilePicture } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, bio, profilePicture }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
