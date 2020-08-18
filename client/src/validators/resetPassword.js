const ResetPasswordValidator = (password, confirmPassword) => {
  const errors = {};
  if (password) {
    if (password.length < 7)
      errors.password = 'Password must at least 7 character.';
    else if (!/\d/.test(password))
      errors.password = 'Password must contain number.';
    else if (!/[a-z]|[A-Z]/.test(password))
      errors.password = 'Password must contain character.';
  } else {
    errors.password = 'Password is required.';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password and confirm password is not match.';
  }
  return errors;
};

export default ResetPasswordValidator;
