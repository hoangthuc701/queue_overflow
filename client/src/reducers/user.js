import authConstants from '../constants/auth';

const initialState = {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.SIGN_IN_REQUEST:
      return {
        loggingIn: true,
      };
    case authConstants.SIGN_IN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.SIGNUP_FAILURE:
      return {};
    case authConstants.SIGN_OUT:
      return {};
    default:
      return state;
  }
}
