const createNewValidator = (
  displayName,
  description,
  newPassword,
  confirmPassword
) => {
  const errors = {};
  if (!displayName);
  else if (displayName.match(/[!@#$%^&*(),.?":{}|<>//]/))
    errors.displayName = 'Display name must not have special characters.';
  else if (displayName.length < 5 || displayName.length > 30)
    errors.displayName = 'Display name must be between 5 and 30 characters.';
  if (!description);
  else if (description.length > 500)
    errors.description = 'Description must be less than 500 character.';

  if (!newPassword) {
    if (confirmPassword) errors.newPassword = 'Please enter new password';
  } else if (!newPassword.match(/[a-z]|[A-Z]/))
    errors.newPassword = 'Password must contain character';
  else if (!newPassword.match(/\d/))
    errors.newPassword = 'Password must contain number.';
  else if (newPassword.length < 7)
    errors.newPassword = 'Password must be at least 7 character.';

  if (!confirmPassword) {
    if (newPassword) errors.confirmPassword = 'Please enter confirm password';
  } else if (confirmPassword !== newPassword)
    errors.confirmPassword =
      'New password and confirm password does not matched';

  return errors;
};

export default createNewValidator;
