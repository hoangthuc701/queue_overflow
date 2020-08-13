import userConstants from '../constants/user';

const initialState = {
  getting: false,
  getted: false,
  user_info: {},
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USER_INFO_REQUEST:
      return {
        ...state,
        getting: true,
      };
    case userConstants.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getting: false,
        getted: true,
        user_info: action.user_info,
      };

    case userConstants.GET_USER_INFO_FAILURE:
      return {
        ...state,
        getting: false,
        getted: false,
      };
    default:
      return state;
  }
}
