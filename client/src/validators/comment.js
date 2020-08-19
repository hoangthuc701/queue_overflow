const CreateNewValidator = (content) => {
  const errors = {};
  if (!content) errors.content = 'Content is required.';
  else if (content.length <= 20 || content.length > 10000)
    errors.content = 'Content is between 20 and 10000 character.';
  return errors;
};

export default CreateNewValidator;
