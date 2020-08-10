import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Notification = ({ actor, content, question, action }) => {
  return (
    <Link className="dropdown-item" to="/">
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
            <b> {actor} </b> {action} <b> {question}</b>{' '}
          </h6>
          {content}
        </div>
      </div>
    </Link>
  );
};
Notification.propTypes = {
  actor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};
export default Notification;
