/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticate } from '../../helper/auth';
import UserService from '../../services/userService';

const SignUpForm = (props) => {
  const [user, setUser] = useState({});

  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirm_password) {
      toast.error('Password and confirm password is not match');
      return;
    }
    UserService.signup(user.email, user.password, user.display_name).then(
      (data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          // eslint-disable-next-line react/prop-types
          props.history.push('/signin');
        }
      }
    );
  };
  if (!isAuthenticate()) {
    return (
      <div className="row">
        <div className="col-5" style={{ margin: 'auto' }}>
          <div className="myform form ">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Signup</h1>
              </div>
            </div>
            <form action="#" name="registration">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Confirm password</label>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  id="confirm_password"
                  aria-describedby="emailHelp"
                  placeholder="Enter Confirm Password"
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Display name</label>
                <input
                  type="text"
                  name="display_name"
                  id="display_name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Fullname"
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-md-12 text-center mb-3">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="col-md-12 ">
                <div className="form-group">
                  <p className="text-center">
                    <Link to="/signin" id="signin">
                      Already have an account? Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default SignUpForm;
