export const isAuthenticate = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const getToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  }
  return '';
};
export const authenticate = (token, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(token));
    next();
  }
};
