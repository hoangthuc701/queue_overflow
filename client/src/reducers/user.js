import authConstants from '../constants/auth';

const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: undefined,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.SIGN_IN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case authConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
      };
    case authConstants.SIGN_OUT:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
}
