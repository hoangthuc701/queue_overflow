import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Question = ({ title, time, category }) => {
  return (
    <>
      <tr className="row">
        <td className="col-7">
          <Link
            to="/"
            className="question_info"
            style={{ wordWrap: 'break-word' }}
          >
            <h4 className="question">{title}</h4>
            <div style={{ color: 'black' }}>{time}</div>
          </Link>
        </td>
        <td className="col-3 d-flex justify-content-center">
          <h4>
            <Link to="/" className="badge badge-warning p-2">
              {category}
            </Link>
          </h4>
        </td>
        <td>
          <Link to="/" className="mr-4 col-1">
            <img src="https://i.ibb.co/RNWjm8H/pencil.png" alt="" />
          </Link>
          <Link to="/" className="col-1">
            <img src="https://i.ibb.co/hgYsCP1/delete.png" alt="" />
          </Link>
        </td>
      </tr>
    </>
  );
};

Question.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  category: PropTypes.string,
};

Question.defaultProps = {
  title: '',
  time: '',
  category: '',
};

export default Question;
