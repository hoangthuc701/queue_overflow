const SignUpValidator = (email, password, confirmPassword, displayName) => {
  const errors = {};
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email.';
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
  if (!displayName) errors.displayName = 'Full name is required.';
  else if (displayName.length < 6)
    errors.displayName = 'Full name must between 5 and 30 character.';
  else if (displayName.length > 30)
    errors.displayName = 'Full name must between 5 and 30 character.';
  return errors;
};

export default SignUpValidator;
