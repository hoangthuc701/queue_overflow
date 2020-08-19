import { toast } from 'react-toastify';
import userConstants from '../constants/user';
import UserService from '../services/userService';
import { getUser, setUser } from '../helper/auth';

function request() {
  return { type: userConstants.GET_USER_INFO_REQUEST };
}
function success(userInfo) {
  return { type: userConstants.GET_USER_INFO_SUCCESS, user_info: userInfo };
}
function failure(error) {
  return { type: userConstants.GET_USER_INFO_FAILURE, error };
}

function getUserInfo(userId) {
  return async (dispatch) => {
    dispatch(request());
    const value = await UserService.getInfo(userId);
    if (!value.error) {
      dispatch(success(value.data));
      const cookieUser = getUser();
      // eslint-disable-next-line no-underscore-dangle
      if (cookieUser._id === userId) {
        setUser({ ...cookieUser, display_name: value.data.display_name });
      }
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
