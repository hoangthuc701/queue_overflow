import authConstants from '../constants/auth';
import UserService from '../services/userService'

function signup(user){
    return dispatch => {
        dispatch(request(user));

    }

    function request(user){
        return {type: authConstants.SIGNUP_REQUEST, user}
    }

    function success(user){
        return {type: authConstants.SIGNUP_SUCCESS, user}
    }

    function failure(error){
        return {type: authConstants.SIGNUP_FAILURE, error}
    }
}

function signin(email, password){
    return dispatch =>{
        dispatch(request(email));

        UserService.signin(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Login failed');
                }
            );
    }

    function request(user) { return { type: authConstants.SIGNIN_REQUEST, user } }
    function success(user) { return { type: authConstants.SIGNIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.SIGNIN_FAILURE, error } }
}

const authActions = {
    signup,
    signin
}

export default authActions;