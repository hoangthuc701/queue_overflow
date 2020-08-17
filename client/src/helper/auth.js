import Cookies from 'js-cookie';
Cookies.defaults = {
  expires: new Date().setDate(process.env.REACT_APP_EXPIRES_COOKIES),
  domain: process.env.REACT_APP_DOMAIN,
};

export const isAuthenticate = () => {
  if (Cookies.get('token')) {
    return true;
  }
  return false;
};

export const getToken = () => {
  if (Cookies.get('token')) {
    return Cookies.getJSON('token');
  }
  return '';
};
export const getUser = () => {
  if (Cookies.get('user')) {
    return Cookies.getJSON('user');
  }
  return '';
};

export const authenticate = (token, user, next) => {
  Cookies.set('token', token);
  Cookies.set('user', user);
  if (next) next();
};

export const isAuthor = (userId) => {
  const currentUser = getUser();
  // eslint-disable-next-line no-underscore-dangle
  return currentUser._id === userId;
};
export const signout = (next) => {
  Cookies.remove('token');
  Cookies.remove('user');
  next();
};
