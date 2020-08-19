/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Logo from '../../assets/images/logo.png';
import { isAuthenticate, getUser, signout } from '../../helper/auth';

function Header() {
  const reload = useSelector((state) => state.header.show);
  const [userDisplay, setUserDisplay] = useState('');
  const [keyword, setKeyword] = useState('');

  const history = useHistory();
  let username;
  useEffect(() => {
    username = getUser().display_name;
    setUserDisplay(username);
  }, [reload]);

  const renderSignInSignUpButton = () => (
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
  );

  const renderProfile = () => (
    <div>
      <b style={{ color: 'white', marginRight: '10px' }}>{userDisplay} </b>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {' '}
        </button>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to={`/profile/${getUser()._id}`}>
            Profile
          </Link>
          <div className="dropdown-divider" />
          <button
            type="button"
            className="dropdown-item"
            onClick={() =>
              signout(() => {
                toast.success('Log out succeed.');
                history.push('/');
              })
            }
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    history.push(`/search/${keyword}`);
    setKeyword('');
  };

  const renderSearchBar = () => (
    <>
      <input
        className="form-control mr-sm-2"
        placeholder="Search"
        aria-label="Search"
        name="search"
        // eslint-disable-next-line react/destructuring-assignment
        value={keyword}
        onChange={handleChange}
      />
      <button
        className="btn my-2  my-sm-0 rounded btn-outline-secondary "
        type="button"
        onClick={handleSubmit}
      >
        <i className="fas fa-search" />
      </button>
    </>
  );

  const renderLogo = () => (
    <Link to="/">
      <img
        width="200px"
        height="50px"
        src={Logo}
        alt="logo"
        style={{ marginRight: '10px' }}
      />
    </Link>
  );

  return (
    <>
      <div
        className="navbar navbar-dark bg-dark"
        style={{ marginBottom: '10px' }}
      >
        <div className="container justify-content-between">
          <div className="row">
            <div className="form-inline">
              {' '}
              {renderLogo()} {renderSearchBar()}
            </div>
          </div>
          {!isAuthenticate() && renderSignInSignUpButton()}
          {isAuthenticate() && renderProfile()}
        </div>
      </div>
    </>
  );
}

export default withRouter(Header);
