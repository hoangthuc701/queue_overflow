import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import NotificationBox from '../Notification';
import { isAuthenticate, getUser, signout } from '../../helper/auth';

class Header extends Component {
  renderNotify = () => {
    return (
      <div className="btn-group  btn my-2   my-sm-0 rounded ml-3" role="group">
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
          <NotificationBox
            action="comment on"
            actor="Hoàng Anh Tuấn"
            content="I totally donot wanna do it. Rimmer can do it."
            question="How to learn..."
          />
          <NotificationBox
            action="comment on"
            actor="Hoàng Anh Tuấn"
            content="I totally donot wanna do it. Rimmer can do it."
            question="How to learn..."
          />
        </div>
      </div>
    );
  };

  renderAddButton = () => (
    <button
      className="btn my-2 my-sm-0 rounded ml-3"
      style={{ color: 'white' }}
      type="submit"
    >
      <i className="far fa-plus-square" />
    </button>
  );

  renderSignInSignUpButton = () => (
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

  renderProfile = (history) => (
    <div>
      <b style={{ color: 'white', marginRight: '10px' }}>
        {getUser().display_name}{' '}
      </b>
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
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
          <div className="dropdown-divider" />
          <button
            type="button"
            className="dropdown-item"
            onClick={() =>
              signout(() => {
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

  renderSearchBar = () => (
    <>
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
    </>
  );

  renderLogo = () => (
    <img
      width="200px"
      height="50px"
      src={Logo}
      alt="logo"
      style={{ marginRight: '10px' }}
    />
  );

  render() {
    const { history } = this.props;
    return (
      <>
        <div
          className="navbar navbar-dark bg-dark"
          style={{ marginBottom: '10px' }}
        >
          <div className="container justify-content-between">
            <div className="row">
              <form className="form-inline">
                {' '}
                {this.renderLogo()} {this.renderSearchBar()}
              </form>
              {isAuthenticate() && this.renderNotify()}
              {isAuthenticate() && this.renderAddButton()}
            </div>
            {!isAuthenticate() && this.renderSignInSignUpButton()}
            {isAuthenticate() && this.renderProfile(history)}
          </div>
        </div>
      </>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(Header);
