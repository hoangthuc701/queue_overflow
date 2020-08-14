import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ title, time, category }) => {
  return (
    <>
      <tr>
        <td>
          <Link
            to="/"
            className="question_info"
            style={{ wordWrap: 'break-word' }}
          >
            <h4 className="question">{title}</h4>
          </Link>
          {time}
        </td>
        <td>
          <h5>
            <Link to className="badge badge-warning">
              {category}
            </Link>
          </h5>
        </td>
        <td>
          <Link to="/" className="mr-2">
            <img src="https://i.ibb.co/RNWjm8H/pencil.png" alt="" />
          </Link>
          <Link to="/">
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
