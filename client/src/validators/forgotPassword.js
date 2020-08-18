const ResetPasswordValidator = (email) => {
  const errors = {};
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email.';
  return errors;
};

export default ResetPasswordValidator;
