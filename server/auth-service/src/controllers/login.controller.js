// File: auth-service/controllers/login.controller.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { validateLogin } = require('../validations/auth.validation');

exports.loginUser = async (req, res) => {
  const errors = validateLogin(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

  res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 60 * 60 * 1000 // 1 hour
});



    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        dateOfJoining:user.dateOfJoining
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// exports.loginUser = async (req, res) => {
//   const errors = validateLogin(req.body);
//   if (errors.length > 0) {
//     return res.status(400).json({ message: errors.join(', ') });
//   }

//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = generateToken(user);

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

