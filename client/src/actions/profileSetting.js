import { toast } from 'react-toastify';
import userConstants from '../constants/user';
import UserService from '../services/userService';

function request() {
  return { type: userConstants.GET_USER_INFO_REQUEST };
}
function success(user_info) {
  return { type: userConstants.GET_USER_INFO_SUCCESS, user_info };
}
function failure(error) {
  return { type: userConstants.GET_USER_INFO_FAILURE, error };
}

function getUserInfo(user_id) {
  return async (dispatch) => {
    dispatch(request());
    const value = await UserService.getInfo(user_id);
    if (!value.error) {
      dispatch(success(value.data));
      return true;
    }
    toast.error(value.error);
    dispatch(failure(value.error));
    return false;
  };
}

const userActions = {
  getUserInfo,
};

export default userActions;
