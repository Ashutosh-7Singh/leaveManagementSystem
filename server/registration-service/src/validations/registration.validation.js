const validator = require('validator');

exports.validateRegistration = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!data.email || !validator.isEmail(data.email)) {
    errors.push('Invalid email');
  }
  if (!data.password || !validator.isStrongPassword(data.password, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    errors.push('Password must be strong (min 6 chars, upper/lower/numbers/symbols)');
  }
  const validRoles = ['User', 'Admin'];
  if (data.role && !validRoles.includes(data.role)) {
    errors.push('Invalid role');
  }

  if (!data.dateOfJoining || !validator.isDate(data.dateOfJoining)) {
    errors.push('Invalid or missing dateOfJoining');
  }

  return errors;
};
