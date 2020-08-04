import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <div
      className="navbar navbar-dark bg-dark"
      style={{ marginBottom: '10px' }}
    >
      <div className="container justify-content-between">
        <div className="row">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn my-2  my-sm-0 rounded btn-outline-secondary "
              type="submit"
            >
              <i className="fas fa-search" />
            </button>
          </form>
          <div
            className="btn-group  btn my-2   my-sm-0 rounded ml-3"
            role="group"
          >
            <button
              id="btnGroupDrop1"
              type="button"
              style={{ color: 'white' }}
              className="btn "
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell" />
              <span className="badge badge-danger">9</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <Link className="dropdown-item" href>
                <div className="media">
                  <img
                    className="align-self-start rounded-circle mr-2 "
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    style={{ height: '40px', width: '40px' }}
                    alt=""
                  />
                  <div className="media-left">
                    <h6 className="mb-0">
                      {' '}
                      <b> Hoàng Anh Tuấn </b> commented on{' '}
                      <b>How to learn...</b>{' '}
                    </h6>
                    I totally donot wanna do it. Rimmer can do it.
                  </div>
                </div>
              </Link>
              <Link className="dropdown-item" href>
                <div className="media">
                  <img
                    className="align-self-start rounded-circle mr-2 "
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    style={{ height: '40px', width: '40px' }}
                    alt=""
                  />
                  <div className="media-left">
                    <h6 className="mb-0">
                      {' '}
                      <b> Hoàng Anh Tuấn </b> commented on{' '}
                      <b>How to learn...</b>{' '}
                    </h6>
                    I totally donot wanna do it. Rimmer can do it.
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <button
            className="btn my-2 my-sm-0 rounded ml-3"
            style={{ color: 'white' }}
            type="submit"
          >
            <i className="far fa-plus-square" />
          </button>
        </div>
        <div>
          <Link type="button" className="btn btn-success" to="/signin">
            {' '}
            Sign In{' '}
          </Link>
          <Link
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: '10px' }}
            to="/signup"
          >
            {' '}
            Sign Up{' '}
          </Link>
        </div>
      </div>
    </div>
  </>
);
export default Header;
