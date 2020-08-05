import { toast } from 'react-toastify';
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

function signin(email, password) {
  function request(user) {
    return { type: authConstants.SIGNIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.SIGNIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.SIGNIN_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request(email));

    UserService.signin(email, password).then(
      (data) => {
        if (data.token) {
          dispatch(success(data.user));
        } else {
          toast.error(data.message);
        }

        // history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

const authActions = {
  // signup,
  signin,
};

export default authActions;
