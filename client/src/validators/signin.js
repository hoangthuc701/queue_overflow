const SignInValidator = (email, password) => {
  const errors = {};
  if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email.';
  if (!password) {
    errors.password = 'Password is required.';
  }
  return errors;
};

export default SignInValidator;
