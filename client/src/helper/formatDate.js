const formatDate = (date) => {
  const today = new Date(date);

  // eslint-disable-next-line radix
  const newDate = `${today.getDate()}/${parseInt(
    today.getMonth() + 1
  )}/${today.getFullYear()}`;

  return newDate;
};
export default formatDate;
