import authConstants from '../constants/auth';

const initialState = {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.SIGNIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authConstants.SIGNIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.SIGNUP_FAILURE:
      return {};
    case authConstants.SIGNOUT:
      return {};
    default:
      return state;
  }
}
