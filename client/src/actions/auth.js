import { toast } from 'react-toastify';
import history from '../helper/history';
import authConstants from '../constants/auth';
import UserService from '../services/userService';

// function signup(user) {
//   return (dispatch) => {
//     dispatch(request(user));
//   };

//   function request(user) {
//     return { type: authConstants.SIGNUP_REQUEST, user };
//   }

//   function success(user) {
//     return { type: authConstants.SIGNUP_SUCCESS, user };
//   }

//   function failure(error) {
//     return { type: authConstants.SIGNUP_FAILURE, error };
//   }
// }

function signIn(email, password) {
  function request(user) {
    return { type: authConstants.SIGN_IN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.SIGN_IN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.SIGN_IN_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request(email));

    UserService.signIn(email, password).then(
      (data) => {
        if (data.data.token) {
          dispatch(success(data.data.user));
        } else {
          toast.error(data.error);
        }

        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

const authActions = {
  // signup,
  signIn,
};

export default authActions;
