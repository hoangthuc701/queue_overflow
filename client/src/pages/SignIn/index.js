/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SignInForm = () => (
  <>
    <div className="row">
      <div id="first " className="col-5" style={{ margin: 'auto' }}>
        <div className="myform form ">
          <div className="logo mb-3">
            <div className="col-md-12 text-center">
              <h1>Sign In</h1>
            </div>
          </div>
          <form action method="post" name="login">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1'">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <p className="text-right">
                <Link to="/forgotPassword">Forgot Password</Link>
              </p>
            </div>
            <div className="col-md-12 text-center ">
              <button
                type="submit"
                className=" btn btn-block mybtn btn-primary tx-tfm"
              >
                Submit
              </button>
            </div>
            <div className="form-check mt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Keep me logged in
              </label>
            </div>
            <div className="col-md-12 ">
              <div className="login-or">
                <hr className="hr-or" />
                <span className="span-or">Or login with</span>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-center">
                    <Link to="/" className="google btn mybtn">
                      <i className="fa fa-google-plus" /> Google
                    </Link>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-center">
                    <Link to="/" className="google btn mybtn">
                      <i className="fa fa-facebook-square" /> Facebook
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p className="text-center">
                <Link to="/signup" id="signup">
                  Do not have a login? Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
);

export default SignInForm;
