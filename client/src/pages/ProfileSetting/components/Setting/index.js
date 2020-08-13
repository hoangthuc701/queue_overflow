import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Setting = () => {
  return (
    <div className="tab-pane" role="tabpanel" id="menu4">
      <div className="row">
        <div className="col-4">
          <img
            className="avatar"
            src="https://static.vecteezy.com/system/resources/previews/000/241/070/non_2x/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg"
            alt="avatar"
          />
          <button
            type="button"
            style={{ marginLeft: '2em' }}
            className="btn btn-lg btn-primary"
          >
            Change Avatar
          </button>
        </div>
        <div className="col-8 mt-5">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                <h6>Display Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <h6>Title</h6>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <h6>Gmail</h6>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <h6>New Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <h6>Confirm Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
