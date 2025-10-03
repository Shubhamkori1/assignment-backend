const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        errors: [{ msg: 'Email already exists', path: 'email' }]
      });
    }

    const user = new User({ email, password });
    await user.save();

    const token = signToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const token = signToken(user);

    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
