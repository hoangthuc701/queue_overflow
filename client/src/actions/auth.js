import { toast } from 'react-toastify';
import authConstants from '../constants/auth';
import UserService from '../services/userService';

function request(user) {
  return { type: authConstants.SIGN_IN_REQUEST, user };
}
function success(user) {
  return { type: authConstants.SIGN_IN_SUCCESS, user };
}
function failure(error) {
  return { type: authConstants.SIGN_IN_FAILURE, error };
}
function signIn(email, password) {
  return async (dispatch) => {
    dispatch(request(email));
    const value = await UserService.signIn(email, password);
    if (value.data.token) {
      toast.success(value.message);
      dispatch(success(value.data.user));
      localStorage.setItem('token', JSON.stringify(value.data.token));
      localStorage.setItem('user', JSON.stringify(value.data.user));
      return true;
    }
    toast.error(value.error);
    dispatch(failure(value.error));
    return false;
  };
}

const authActions = {
  signIn,
};

export default authActions;
