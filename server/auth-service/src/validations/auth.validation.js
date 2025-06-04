const validator = require('validator');

exports.validateLogin = ({ email, password }) => {
  const errors = [];
  if (!email || !validator.isEmail(email)) {
    errors.push('Invalid email');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  return errors;
};

exports.validatePasswordUpdate = ({ currentPassword, newPassword }) => {
  const errors = [];
  if (!currentPassword || currentPassword.length < 6) {
    errors.push('Current password is required');
  }
  if (!newPassword || !validator.isStrongPassword(newPassword)) {
    errors.push('New password must be strong');
  }
  return errors;
};
