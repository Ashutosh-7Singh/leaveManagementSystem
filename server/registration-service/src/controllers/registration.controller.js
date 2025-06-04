const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validateRegistration } = require('../validations/registration.validation');

exports.registerUser = async (req, res) => {
  try {
    const errors = validateRegistration(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(', ') });
    }
    const { name, email, password, role = 'User', dateOfJoining } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      dateOfJoining
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
